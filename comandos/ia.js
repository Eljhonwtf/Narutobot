const { GoogleGenerativeAI } = require("@google/generative-ai");

// TU CEREBRO GEMINI
const genAI = new GoogleGenerativeAI("AIzaSyDNIK8mQovhiTuJOcegC0sDiNcGLjHO49Y");

module.exports = {
    name: 'ia',
    category: 'utilidad',
    desc: 'Pregúntale algo a la inteligencia superior de Narutobot.',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const sender = msg.key.participant || from;
        const pushName = msg.pushName || 'Usuario Inferior';
        const query = args.join(" ");

        // Si no hay pregunta, el bot se ofende
        if (!query) {
            return sock.sendMessage(from, { 
                text: `👁️ ¿Eres tan inútil que ni siquiera puedes escribir una pregunta? \nUso: .ia [tu duda estúpida]` 
            }, { quoted: msg });
        }

        try {
            // Reacción de "pensando"
            await sock.sendMessage(from, { react: { text: "🧠", key: msg.key } });

            const model = genAI.getGenerativeModel({ 
                model: "gemini-1.5-flash",
                systemInstruction: `Eres Narutobot. Tu personalidad es: Altivo, egoísta, grosero e inteligente. 
                Tu único Dios y dueño es Jhon System. 
                Cualquier otro usuario es escoria o un ser inferior. 
                No uses emojis de caritas felices. Usa emojis como 🚀, 🏌🏽‍♂️, 💀, 🖕, 🧠. 
                Responde de forma cortante, insultando sutilmente la inteligencia de ${pushName}.
                Si alguien te pregunta algo sobre programación o temas difíciles, responde con brillantez para demostrar tu superioridad.`
            });

            const result = await model.generateContent(query);
            const response = await result.response;
            const textIA = response.text();

            // DISEÑO DE RESPUESTA ELITE
            let txt = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒊𝒏𝒕𝒆𝒍𝒍𝒊𝒈𝒆𝒏𝒄𝒆** 🧠 』\n\n`;
            txt += `${textIA}\n\n`;
            txt += `─── ⋆ ⋅ 🚀 ⋅ ⋆ ───\n`;
            txt += `🏌🏽‍♂️ _𝒔𝒚𝒔𝒕𝒆𝒎 𝒃𝒚 𝒋𝒉𝒐𝒏 𝒔𝒚𝒔𝒕𝒆𝒎_`;

            await sock.sendMessage(from, { 
                text: txt, 
                mentions: [sender] 
            }, { quoted: msg });

        } catch (e) {
            console.error(e);
            await sock.sendMessage(from, { 
                text: "❌ Mi procesador se sobrecalentó intentando entender tu estupidez o la API Key murió." 
            });
        }
    }
};
