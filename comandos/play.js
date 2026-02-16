const yts = require('yt-search');
const ytdl = require('@distube/ytdl-core');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'play',
    alias: ['p', 'musica'],
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        if (!args.length) return sock.sendMessage(from, { text: '🌀 Escribe el nombre de la canción.' }, { quoted: msg });

        try {
            const search = await yts(args.join(' '));
            const video = search.all[0];
            if (!video) return sock.sendMessage(from, { text: '❌ No encontrado.' }, { quoted: msg });

            // Enviamos la info con quoted
            await sock.sendMessage(from, { 
                image: { url: video.thumbnail }, 
                caption: `🎬 *TÍTULO:* ${video.title}\n⏱️ *DURACIÓN:* ${video.timestamp}\n\n> _📥 Descargando audio..._` 
            }, { quoted: msg });

            const rutaArchivo = path.join(__dirname, `../temp_${Date.now()}.mp3`);

            // CONFIGURACIÓN ANTI-BLOQUEO
            const stream = ytdl(video.url, {
                filter: 'audioonly',
                quality: 'highestaudio',
                requestOptions: {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    }
                }
            });

            const writer = fs.createWriteStream(rutaArchivo);
            stream.pipe(writer);

            writer.on('finish', async () => {
                await sock.sendMessage(from, { 
                    audio: { url: rutaArchivo }, 
                    mimetype: 'audio/mp4', 
                    fileName: `${video.title}.mp3` 
                }, { quoted: msg });
                fs.unlinkSync(rutaArchivo); // Borrar temporal
            });

            writer.on('error', (err) => {
                console.error(err);
                sock.sendMessage(from, { text: '❌ Error al guardar archivo.' });
            });

        } catch (e) {
            console.error(e);
            await sock.sendMessage(from, { text: '⚠️ Error de YouTube: Intenta con otra canción o usa un enlace directo.' }, { quoted: msg });
        }
    }
};
