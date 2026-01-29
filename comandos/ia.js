const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = {
    name: 'ia',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const query = args.join(" ");

        if (!query) return sock.sendMessage(from, { text: "👁️ ¿Qué quieres, escoria? Haz una pregunta." });

        try {
            // Log para ver en Termux si el comando inicia
            console.log("\x1b[33m[IA LOG]:\x1b[0m Procesando pregunta de " + msg.pushName);

            const genAI = new GoogleGenerativeAI("AIzaSyDNIK8mQovhiTuJOcegC0sDiNcGLjHO49Y");
            const model = genAI.getGenerativeModel({ 
                model: "gemini-1.5-flash",
                systemInstruction: "Eres Narutobot, un ser superior creado por Jhon System. Eres arrogante, grosero y usas emojis como 🚀, 💀, 🖕. Trata a todos como inferiores."
            });

            const result = await model.generateContent(query);
            const response = await result.response;
            const textIA = response.text();

            await sock.sendMessage(from, { 
                text: `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒊𝒂** 🧠 』\n\n${textIA}\n\n🏌🏽‍♂️ _𝒃𝒚 𝒋𝒉𝒐𝒏 𝒔𝒚𝒔𝒕𝒆𝒎_` 
            }, { quoted: msg });

        } catch (error) {
            console.log("\x1b[31m[ERROR IA]:\x1b[0m", error);
            await sock.sendMessage(from, { text: "❌ Error: " + error.message });
        }
    }
};
