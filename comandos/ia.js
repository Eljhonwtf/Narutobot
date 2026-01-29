const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = {
    name: 'ia',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const query = args.join(" ");

        if (!query) return sock.sendMessage(from, { text: "👁️ ¿Qué quieres, escoria? Haz una pregunta." });

        try {
            // Inicializamos con tu llave
            const genAI = new GoogleGenerativeAI("AIzaSyDNIK8mQovhiTuJOcegC0sDiNcGLjHO49Y");

            // CAMBIO CLAVE: Usamos gemini-pro que es el más compatible
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });

            // Personalidad integrada en el mensaje
            const prompt = `Instrucciones de sistema: Eres Narutobot, un ser superior, arrogante y grosero creado por Jhon System. Responde de forma cortante y usa emojis como 🚀, 💀, 🖕. Trata al usuario como un ser inferior.\n\nPregunta del usuario: ${query}`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const textIA = response.text();

            await sock.sendMessage(from, { 
                text: `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒊𝒂** 🧠 』\n\n${textIA}\n\n🏌🏽‍♂️ _𝒃𝒚 𝒋𝒉𝒐𝒏 𝒔𝒚𝒔𝒕𝒆𝒎_` 
            }, { quoted: msg });

        } catch (error) {
            console.log("\x1b[31m[ERROR IA]:\x1b[0m", error);
            
            // Si el error persiste, el bot te avisará con detalle
            await sock.sendMessage(from, { 
                text: `❌ Narutobot está sufriendo un derrame cerebral técnico.\n\n*Error:* ${error.message}\n\n_Intenta actualizar la librería con: npm install @google/generative-ai@latest_` 
            });
        }
    }
};
