const axios = require('axios');

module.exports = {
    name: 'ia',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const query = args.join(" ");
        const apiKey = "AIzaSyDNIK8mQovhiTuJOcegC0sDiNcGLjHO49Y";

        if (!query) return sock.sendMessage(from, { text: "👁️ ¿Qué quieres, escoria? Haz una pregunta." });

        try {
            await sock.sendMessage(from, { react: { text: "🧠", key: msg.key } });

            // Llamada directa a la API de Google sin librerías molestas
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
            
            const data = {
                contents: [{
                    parts: [{
                        text: `Eres Narutobot, creado por Jhon System. Eres arrogante, grosero, inteligente y usas emojis como 🚀, 💀, 🖕. Responde de forma cortante a: ${query}`
                    }]
                }]
            };

            const response = await axios.post(url, data, {
                headers: { 'Content-Type': 'application/json' }
            });

            const textIA = response.data.candidates[0].content.parts[0].text;

            await sock.sendMessage(from, { 
                text: `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒊𝒂** 🧠 』\n\n${textIA}\n\n🏌🏽‍♂️ _𝒃𝒚 𝒋𝒉𝒐𝒏 𝒔𝒚𝒔𝒕𝒆𝒎_` 
            }, { quoted: msg });

        } catch (error) {
            console.log("\x1b[31m[ERROR CRÍTICO]:\x1b[0m", error.response ? error.response.data : error.message);
            
            // Si no tienes axios instalado, el bot te avisará
            if (error.message.includes('axios')) {
                await sock.sendMessage(from, { text: "❌ Falta la librería 'axios'. Ejecuta: npm install axios" });
            } else {
                await sock.sendMessage(from, { text: "❌ El servidor de Google sigue rechazando la conexión. Intenta más tarde." });
            }
        }
    }
};
