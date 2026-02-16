const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'ytmp3',
    alias: ['audio', 'fgmp3'],
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const text = args.join(" ");

        if (!text || !text.includes('youtube.com') && !text.includes('youtu.be')) {
            return sock.sendMessage(from, { text: '🌀 *NARUTO BOT:* Por favor, envía un enlace de YouTube válido.' }, { quoted: msg });
        }

        try {
            // Reacción de procesamiento
            await sock.sendMessage(from, { react: { text: "⏳", key: msg.key } });
            
            const info = await ytdl.getInfo(text);
            const title = info.videoDetails.title.replace(/[^\w\s]/gi, ''); // Limpiar título
            const fileName = path.join(__dirname, `../temp_${Date.now()}.mp3`);

            await sock.sendMessage(from, { text: `📥 *DESCARGANDO:* ${title}\n> _Esto puede tardar unos segundos..._` }, { quoted: msg });

            // Descarga el audio con la mejor calidad disponible
            const stream = ytdl(text, { filter: 'audioonly', quality: 'highestaudio' });
            
            stream.pipe(fs.createWriteStream(fileName)).on('finish', async () => {
                // Envía el archivo de audio
                await sock.sendMessage(from, { 
                    audio: { url: fileName }, 
                    mimetype: 'audio/mp4', 
                    fileName: `${title}.mp3` 
                }, { quoted: msg });

                // Borra el archivo temporal para no llenar el almacenamiento de Termux
                fs.unlinkSync(fileName);
                await sock.sendMessage(from, { react: { text: "✅", key: msg.key } });
            });

        } catch (e) {
            console.error(e);
            await sock.sendMessage(from, { text: `❌ *ERROR:* No pude procesar ese video.` }, { quoted: msg });
        }
    }
};
