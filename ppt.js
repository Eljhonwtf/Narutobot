const gtts = require('gtts');
const fs = require('fs');
const { join } = require('path');

module.exports = {
    run: async (sock, msg, body, args) => {
        const from = msg.key.remoteJid;
        const text = args.join(" ");

        // 1. Validar que hay texto
        if (!text) return await sock.sendMessage(from, { text: "🏮 *¡OI!* Escribe lo que quieres que diga.\n\nEjemplo: */voz Hola Jhon, soy Naruto*" }, { quoted: msg });

        // 2. Reacción de audio
        await sock.sendMessage(from, { react: { text: "🗣️", key: msg.key } });

        try {
            // 3. Configurar el idioma (Español)
            const speech = new gtts(text, 'es');
            const filePath = join(__dirname, `../temp_audio_${Date.now()}.mp3`);

            // 4. Guardar el audio temporalmente y enviarlo
            speech.save(filePath, async (err) => {
                if (err) throw err;

                await sock.sendMessage(from, { 
                    audio: { url: filePath }, 
                    mimetype: 'audio/mp4', 
                    ptt: true // Esto hace que aparezca como nota de voz, no como archivo
                }, { quoted: msg });

                // 5. Borrar el archivo temporal para no llenar el almacenamiento
                fs.unlinkSync(filePath);
            });

        } catch (e) {
            console.log("Error en comando voz:", e);
            await sock.sendMessage(from, { text: "❌ No pude procesar el audio, mi garganta ninja está seca." });
        }
    }
};
