module.exports = {
    run: async (sock, msg, body, args) => {
        const from = msg.key.remoteJid;

        // Reaccionar al mensaje
        await sock.sendMessage(from, { 
            react: { text: "🏓", key: msg.key } 
        });

        // Enviar respuesta citada
        await sock.sendMessage(from, { 
            text: "¡Pong! El bot está activo y respondiendo. 🚀" 
        }, { quoted: msg });
    }
};
