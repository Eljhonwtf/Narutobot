const yts = require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');

module.exports = {
    name: 'play',
    aliases: ['p'],
    run: async (sock, msg, body, args) => {
        const from = msg.key.remoteJid;
        const text = args.join(" ");
        const owner = "584142577312"; // Tu número verificado
        const botImg = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

        if (!text) return sock.sendMessage(from, { text: '⚔️ *Jefe, dime el nombre de la canción para enviártela.*' }, { quoted: msg });

        try {
            // 1. Buscar la canción
            const search = await yts(text);
            const video = search.all[0]; // Tomamos el primer resultado (el más preciso)

            if (!video) return sock.sendMessage(from, { text: '❌ No encontré esa canción.' }, { quoted: msg });

            // 2. Enviar mensaje de información con tu diseño
            let infoTeks = `┏━━━━━━━━━━━━━━━━━━━━━━━━┓\n`;
            infoTeks += `┃  🏮  **NARUTO AUDIO** 🏮  ┃\n`;
            infoTeks += `┗━━━━━━━━━━━━━━━━━━━━━━━━┛\n\n`;
            infoTeks += `  ◈ **OWNER:** +${owner}\n`;
            infoTeks += `  ◈ **TÍTULO:** ${video.title}\n`;
            infoTeks += `  ◈ **DURACIÓN:** ${video.timestamp}\n\n`;
            infoTeks += `🚀 *Enviando audio de forma automática...*\n\n`;
            infoTeks += `© **NarutoBot 2026** | **Jhon** ✨`;

            await sock.sendMessage(from, {
                image: { url: video.thumbnail || botImg },
                caption: infoTeks,
                contextInfo: {
                    externalAdReply: {
                        title: 'AUTO-DOWNLOAD SYSTEM',
                        body: `Admin: +${owner}`,
                        mediaType: 1,
                        thumbnailUrl: video.thumbnail,
                        sourceUrl: video.url
                    }
                }
            }, { quoted: msg });

            // 3. Descargar y enviar el Audio automáticamente
            const info = await ytdl.getInfo(video.url);
            const title = video.title.replace(/[^\w\s]/gi, '');
            const filePath = `./${title}.mp3`;

            const stream = ytdl(video.url, { filter: 'audioonly', quality: 'highestaudio' })
                .pipe(fs.createWriteStream(filePath));

            stream.on('finish', async () => {
                await sock.sendMessage(from, { 
                    audio: { url: filePath }, 
                    mimetype: 'audio/mp4',
                    fileName: `${title}.mp3`
                }, { quoted: msg });

                fs.unlinkSync(filePath); // Limpiar memoria de Termux
            });

        } catch (e) {
            console.error(e);
            sock.sendMessage(from, { text: '⚠️ El núcleo falló al descargar.' }, { quoted: msg });
        }
    }
};
