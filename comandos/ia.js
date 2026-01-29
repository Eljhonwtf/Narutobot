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

            // CAMBIO DEFINITIVO: Usamos 'gemini-pro' que es el modelo más aceptado en v1
            const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;
            
            const data = {
                contents: [{
                    parts: [{
                        text: `Instrucciones: Eres Narutobot, creado por Jhon System. Eres arrogante, grosero e inteligente. Responde de forma cortante a: ${query}`
                    }]
                }]
            };

            const response = await axios.post(url, data);

            if (response.data.candidates && response.data.candidates[0].content) {
                const textIA = response.data.candidates[0].content.parts[0].text;
                let finalMsg = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒊𝒂** 🧠 』\n\n${textIA}\n\n🏌🏽‍♂️ _𝒃𝒚 𝒋𝒉𝒐𝒏 𝒔𝒚𝒔𝒕𝒆𝒎_`;
                await sock.sendMessage(from, { text: finalMsg }, { quoted: msg });
            }

        } catch (error) {
            const errorData = error.response ? error.response.data : error.message;
            console.log("\x1b[31m[DEBUG FINAL]:\x1b[0m", JSON.stringify(errorData));
            
            await sock.sendMessage(from, { 
                text: `❌ Google sigue bloqueando el modelo. Intentando con Gemini-Pro...` 
            });
        }
    }
};
