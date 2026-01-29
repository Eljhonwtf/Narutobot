const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = {
    name: 'ia',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const query = args.join(" ");

        if (!query) return sock.sendMessage(from, { text: "👁️ ¿Qué quieres, escoria? Haz una pregunta." });

        try {
            const genAI = new GoogleGenerativeAI("AIzaSyDNIK8mQovhiTuJOcegC0sDiNcGLjHO49Y");

            // CAMBIO AQUÍ: Usamos la versión estable del modelo
            const model = genAI.getGenerativeModel({ 
                model: "gemini-1.5-flash-latest" // Añadimos -latest para evitar el 404
            });

            // Configuramos las instrucciones de personalidad aquí
            const prompt = `Instrucciones: Eres Narutobot, un ser superior creado por Jhon System. Eres arrogante, grosero y usas emojis como 🚀, 💀, 🖕. Trata a todos como inferiores.\n\nUsuario dice: ${query}`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const textIA = response.text();

            await sock.sendMessage(from, { 
                text: `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒊𝒂** 🧠 』\n\n${textIA}\n\n🏌🏽‍♂️ _𝒃𝒚 𝒋𝒉𝒐𝒏 𝒔𝒚𝒔𝒕𝒆𝒎_` 
            }, { quoted: msg });

        } catch (error) {
            console.log("\x1b[31m[ERROR IA]:\x1b[0m", error);
            await sock.sendMessage(from, { text: "❌ Mi cerebro de IA falló: " + error.message });
        }
    }
};
