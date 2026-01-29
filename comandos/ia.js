const axios = require('axios');

module.exports = {
    name: 'ia',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const query = args.join(" ");
        // Tu clave confirmada en la captura
        const apiKey = "AIzaSyDNIK8mQovhiTuJOcegC0sDiNcGLjHO49Y"; 

        if (!query) return sock.sendMessage(from, { text: "👁️ ¿Qué quieres, escoria? Haz una pregunta." });

        try {
            await sock.sendMessage(from, { react: { text: "🧠", key: msg.key } });

            // CAMBIO VITAL: Usamos la versión estable 'v1' para evitar el error 404 de la captura
            const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
            
            const data = {
                contents: [{
                    parts: [{
                        text: `Instrucciones: Eres Narutobot, creado por Jhon System. Eres arrogante, grosero e inteligente. Responde de forma cortante a: ${query}`
                    }]
                }]
            };

            const response = await axios.post(url, data);

            // Verificamos si la respuesta trae el texto
            if (response.data.candidates && response.data.candidates[0].content) {
                const textIA = response.data.candidates[0].content.parts[0].text;

                let finalMsg = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒊𝒂** 🧠 』\n\n`;
                finalMsg += `${textIA}\n\n`;
                finalMsg += `🏌🏽‍♂️ _𝒃𝒚 𝒋𝒉𝒐𝒏 𝒔𝒚𝒔𝒕𝒆𝒎_`;

                await sock.sendMessage(from, { text: finalMsg }, { quoted: msg });
            } else {
                throw new Error("Respuesta de Google vacía");
            }

        } catch (error) {
            // Esto imprimirá el error real en tu terminal de Termux
            const errorMsg = error.response ? JSON.stringify(error.response.data) : error.message;
            console.log("\x1b[31m[ERROR FINAL]:\x1b[0m", errorMsg);
            
            await sock.sendMessage(from, { 
                text: `❌ Error de conexión: El modelo Gemini v1 no respondió. Verifica tu conexión a internet en Termux.` 
            });
        }
    }
};
