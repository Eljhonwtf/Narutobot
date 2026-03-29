const axios = require('axios');

module.exports = {
    run: async (sock, msg, body, args) => {
        try {
            const from = msg.key.remoteJid;
            const url = args[0];

            if (!url || !url.includes('tiktok.com')) {
                return await sock.sendMessage(from, { 
                    text: '⚠️ *Uso incorrecto.*\n\nEscribe: */tiktok https://vm.tiktok.com/xxx*' 
                }, { quoted: msg });
            }

            await sock.sendMessage(from, { text: '⏳ *Descargando video de TikTok (Servidor 2)...*' }, { quoted: msg });

            // Usando la API de DL-PANDA (Muy estable)
            const res = await axios.get(`https://api.tiklydown.eu.org/api/download?url=${url}`).catch(() => null);
            
            // Si la primera falla, intentamos con una segunda opción
            let videoUrl;
            let title;

            if (res && res.data && res.data.video) {
                videoUrl = res.data.video.noWatermark || res.data.video.watermark;
                title = res.data.title;
            } else {
                // SEGUNDA OPCIÓN: API Alternativa
                const res2 = await axios.get(`https://www.tikwm.com/api/?url=${url}`);
                if (res2.data && res2.data.data) {
                    videoUrl = res2.data.data.play;
                    title = res2.data.data.title;
                }
            }

            if (!videoUrl) {
                return await sock.sendMessage(from, { text: '❌ No se pudo obtener el video. Es posible que el servidor de descarga esté en mantenimiento.' });
            }

            // Enviar el video
            await sock.sendMessage(from, { 
                video: { url: videoUrl }, 
                caption: `✅ *TikTok Listo*\n📝 ${title || 'Sin descripción'}\n\n*Power by Jhon 🔱*`,
                mimetype: 'video/mp4'
            }, { quoted: msg });

        } catch (e) {
            console.log("Error en TikTok:", e);
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Error de conexión con el servidor de TikTok.' });
        }
    }
};
