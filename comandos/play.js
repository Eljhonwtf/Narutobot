const yts = require('yt-search');
const axios = require('axios');

module.exports = {
    name: 'play',
    run: async (sock, msg, body, args) => {
        const from = msg.key.remoteJid;
        const text = args.join(" ");
        const owner = "584142577312";
        const botImg = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

        if (!text) return sock.sendMessage(from, { text: '⚔️ *Dime qué canción buscamos, Jefe.*' }, { quoted: msg });

        try {
            const search = await yts(text);
            const video = search.all[0];
            if (!video) return sock.sendMessage(from, { text: '❌ No encontré nada.' });

            // Mensaje de carga Naruto
            let teks = `┏━━━━━━━━━━━━━━━━━━━━━━━━┓\n`;
            teks += `┃  🏮  **NARUTO AUDIO** 🏮  ┃\n`;
            teks += `┗━━━━━━━━━━━━━━━━━━━━━━━━┛\n\n`;
            teks += `  ◈ **OWNER:** +${owner}\n`;
            teks += `  ◈ **TÍTULO:** ${video.title}\n\n`;
            teks += `🚀 *Cargando desde Servidor Maestro...*`;

            await sock.sendMessage(from, {
                image: { url: video.thumbnail },
                caption: teks,
                contextInfo: { externalAdReply: { title: 'NARUTO ELITE SYSTEM', body: `By Jhon ✨`, mediaType: 1, thumbnailUrl: botImg }}
            }, { quoted: msg });

            // USANDO API DE ÉLITE (Más estable)
            const response = await axios.get(`https://api.zenkey.my.id/api/download/ytmp3?url=${video.url}&apikey=zenkey`);
            const downloadUrl = response.data.result.download_url;

            if (!downloadUrl) throw new Error('No se obtuvo URL de descarga');

            await sock.sendMessage(from, { 
                audio: { url: downloadUrl }, 
                mimetype: 'audio/mp4',
                fileName: `${video.title}.mp3`
            }, { quoted: msg });

        } catch (e) {
            console.error(e);
            // TERCER RESPALDO DE EMERGENCIA
            try {
                const resFallback = await axios.get(`https://api.vreden.my.id/api/ytmp3?url=${video.url}`);
                await sock.sendMessage(from, { 
                    audio: { url: resFallback.data.result.download }, 
                    mimetype: 'audio/mp4',
                    fileName: `audio.mp3`
                }, { quoted: msg });
            } catch (err) {
                sock.sendMessage(from, { text: '⚠️ Sistema bajo mantenimiento masivo de YouTube. Intenta con otra canción o en unos minutos.' });
            }
        }
    }
};
