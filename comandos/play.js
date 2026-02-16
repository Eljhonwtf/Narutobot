
const yts = require('yt-search');
const axios = require('axios');

module.exports = {
    name: 'play',
    run: async (sock, msg, body, args) => {
        const from = msg.key.remoteJid;
        const text = args.join(" ");
        const owner = "584142577312"; 
        const botImg = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

        if (!text) return sock.sendMessage(from, { text: '⚔️ *Dime el nombre de la canción, Jefe.*' }, { quoted: msg });

        try {
            const search = await yts(text);
            const video = search.all[0];
            if (!video) return sock.sendMessage(from, { text: '❌ No se encontró el video.' });

            // Mensaje estético de NarutoBot con tus créditos
            await sock.sendMessage(from, {
                image: { url: video.thumbnail },
                caption: `┏━━━━━━━━━━━━━━━━━━━━━━━━┓\n┃  🏮  **NARUTO AUDIO** 🏮  ┃\n┗━━━━━━━━━━━━━━━━━━━━━━━━┛\n\n◈ **OWNER:** +${owner}\n◈ **TÍTULO:** ${video.title}\n\n🚀 *Descargando mediante Túnel Privado...*`,
                contextInfo: { 
                    externalAdReply: { 
                        title: 'NARUTO SYSTEM 2026', 
                        body: `By Jhon ✨`, 
                        mediaType: 1, 
                        thumbnailUrl: botImg,
                        sourceUrl: `https://wa.me/${owner}`
                    } 
                }
            }, { quoted: msg });

            // API de descarga de alto flujo (Bypass)
            const apiRes = await axios.get(`https://api.agatz.xyz/api/ytmp3?url=${video.url}`);
            const dlUrl = apiRes.data.data.download;

            if (!dlUrl) throw new Error();

            // Enviamos el audio directamente al chat
            await sock.sendMessage(from, { 
                audio: { url: dlUrl }, 
                mimetype: 'audio/mp4',
                fileName: `${video.title}.mp3`
            }, { quoted: msg });

        } catch (e) {
            console.error(e);
            // Intento final con servidor de respaldo sólido
            try {
                const resAlt = await axios.get(`https://api.siputzx.my.id/api/d/ytmp3?url=${video.url}`);
                await sock.sendMessage(from, { 
                    audio: { url: resAlt.data.data.dl }, 
                    mimetype: 'audio/mp4'
                }, { quoted: msg });
            } catch (err) {
                sock.sendMessage(from, { text: '⚠️ Jefe, los servidores de descarga están bajo ataque de YouTube. Intenta de nuevo en un momento.' });
            }
        }
    }
};
