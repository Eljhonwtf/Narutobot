const yts = require('yt-search');
const axios = require('axios'); // Asegúrate de tener axios instalado: npm install axios

module.exports = {
    name: 'play',
    run: async (sock, msg, body, args) => {
        const from = msg.key.remoteJid;
        const text = args.join(" ");
        const owner = "584142577312";
        const botImg = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

        if (!text) return sock.sendMessage(from, { text: '⚔️ *Jefe, dime qué canción descargar.*' }, { quoted: msg });

        try {
            // 1. Buscar el video
            const search = await yts(text);
            const video = search.all[0];
            if (!video) return sock.sendMessage(from, { text: '❌ No encontré resultados.' });

            // 2. Mensaje de pre-carga
            let teks = `┏━━━━━━━━━━━━━━━━━━━━━━━━┓\n`;
            teks += `┃  🏮  **NARUTO AUDIO** 🏮  ┃\n`;
            teks += `┗━━━━━━━━━━━━━━━━━━━━━━━━┛\n\n`;
            teks += `  ◈ **OWNER:** +${owner}\n`;
            teks += `  ◈ **TÍTULO:** ${video.title}\n\n`;
            teks += `🚀 *Descargando audio mediante Servidor de Respaldo...*`;

            await sock.sendMessage(from, {
                image: { url: video.thumbnail },
                caption: teks,
                contextInfo: { externalAdReply: { title: 'NARUTO SYSTEM v2', body: `By Jhon ✨`, mediaType: 1, thumbnailUrl: botImg }}
            }, { quoted: msg });

            // 3. Descarga mediante API de Respaldo (Rápida y sin errores de núcleo)
            // Usamos una API pública de descarga
            const res = await axios.get(`https://api.lolhuman.xyz/api/ytplay?apikey=GataDios&query=${encodeURIComponent(video.url)}`);
            const data = res.data.result;

            // 4. Enviar el Audio
            await sock.sendMessage(from, { 
                audio: { url: data.info.link }, 
                mimetype: 'audio/mp4',
                fileName: `${video.title}.mp3`
            }, { quoted: msg });

        } catch (e) {
            console.error(e);
            // Si falla la primera API, intentamos una segunda opción automática
            try {
                const res2 = await axios.get(`https://api.botcahx.eu.org/api/dowloader/ytad?url=${video.url}&apikey=btch-portal`);
                await sock.sendMessage(from, { 
                    audio: { url: res2.data.result.mp3 }, 
                    mimetype: 'audio/mp4',
                    fileName: `audio.mp3`
                }, { quoted: msg });
            } catch (err) {
                sock.sendMessage(from, { text: '⚠️ Todas las rutas de descarga están saturadas. Intenta de nuevo en unos minutos.' });
            }
        }
    }
};
