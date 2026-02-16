const yts = require('yt-search');
const axios = require('axios');

module.exports = {
    name: 'play',
    run: async (sock, msg, body, args) => {
        const from = msg.key.remoteJid;
        const text = args.join(" ");
        const owner = "584142577312"; //
        const botImg = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg"; //

        if (!text) return sock.sendMessage(from, { text: '⚔️ *Jefe, dime qué canción buscamos.*' }, { quoted: msg });

        try {
            const search = await yts(text);
            const video = search.all[0];
            if (!video) return sock.sendMessage(from, { text: '❌ No encontré la canción.' });

            // Mensaje de espera con tu diseño
            await sock.sendMessage(from, {
                image: { url: video.thumbnail },
                caption: `┏━━━━━━━━━━━━━━━━━━━━━━━━┓\n┃  🏮  **NARUTO AUDIO** 🏮  ┃\n┗━━━━━━━━━━━━━━━━━━━━━━━━┛\n\n◈ **OWNER:** +${owner}\n◈ **TÍTULO:** ${video.title}\n\n🚀 *Descargando mediante Servidor Privado...*`,
                contextInfo: { externalAdReply: { title: 'NARUTO SYSTEM V3', body: `By Jhon ✨`, mediaType: 1, thumbnailUrl: botImg }}
            }, { quoted: msg });

            // Usando API de Akywane (Servidor estable)
            const apiRes = await axios.get(`https://api.akywane.my.id/api/downloader/ytmp3?url=${video.url}`);
            const dlUrl = apiRes.data.result.downloadUrl;

            if (!dlUrl) throw new Error();

            // Enviamos el audio directamente
            await sock.sendMessage(from, { 
                audio: { url: dlUrl }, 
                mimetype: 'audio/mp4',
                fileName: `${video.title}.mp3`
            }, { quoted: msg });

        } catch (e) {
            // Último recurso: Descarga Directa Alternativa
            try {
                const resAlt = await axios.get(`https://api.siputzx.my.id/api/d/ytmp3?url=${args[0] || video.url}`);
                await sock.sendMessage(from, { 
                    audio: { url: resAlt.data.data.dl }, 
                    mimetype: 'audio/mp4'
                }, { quoted: msg });
            } catch (err) {
                sock.sendMessage(from, { text: '⚠️ Jefe, los servidores de YouTube están caídos a nivel global para bots. Intenta de nuevo en unos minutos.' });
            }
        }
    }
};
