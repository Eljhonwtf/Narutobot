const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyDNIK8mQovhiTuJOcegC0sDiNcGLjHO49Y");

module.exports = {
    name: 'ia',
    run: async (sock, msg, body, args) => {
        const from = msg.key.remoteJid;
        try {
            // Intento simple sin instrucciones complejas
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent("Hola, responde con la palabra TEST");
            const response = await result.response;
            await sock.sendMessage(from, { text: "Respuesta de IA: " + response.text() });
        } catch (e) {
            await sock.sendMessage(from, { text: "Error real: " + e.message });
            console.log(e);
        }
    }
};
