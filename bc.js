module.exports = {
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        // 1. BLOQUEO CHISTOSO PARA METICHES
        if (!isOwner) {
            // Reacción automática de payaso
            await sock.sendMessage(from, { react: { text: "🤡", key: msg.key } });
            
            const frases = [
                "¿Pero tú eres tonto o barres el desierto? Solo Jhon puede usar esto. 🤡",
                "¡Alerta de intruso! 🚨 Intentaste usar un comando de Dios siendo un simple mortal.",
                "Error 404: Neuronas no encontradas. Solo mi dueño Jhon tiene permiso. 🧠❌",
                "¿Te gusta tocar lo que no es tuyo? ¡A dormir! Solo el Jefe manda aquí. 😴"
            ];
            const randomFrase = frases[Math.floor(Math.random() * frases.length)];
            
            return await sock.sendMessage(from, { text: randomFrase }, { quoted: msg });
        }

        // 2. LÓGICA DEL COMANDO (Solo para Jhon)
        const texto = args.join(" ");
        if (!texto) return sock.sendMessage(from, { text: "Jhon por favor escribe el mensaje que quieres difundir. 🚀" });

        // Reacción de rayo para confirmar que el jefe dio la orden
        await sock.sendMessage(from, { react: { text: "⚡", key: msg.key } });

        const chats = await sock.groupFetchAllParticipating(); 
        const ids = Object.keys(chats);

        await sock.sendMessage(from, { text: `🚀 Enviando mensaje masivo a ${ids.length} grupos...` });

        for (let id of ids) {
            await sock.sendMessage(id, { 
                text: `📢 *COMUNICADO OFICIAL DE JHON*\n\n${texto}`,
                contextInfo: {
                    externalAdReply: {
                        title: "† MENSAJE DEL SISTEMA †",
                        body: "Difusión Global",
                        thumbnailUrl: "https://i.postimg.cc/Bbd8Zhn0/1c2380631fcd4e45a2488437d9dc7520.jpg",
                        mediaType: 1
                    }
                }
            });
        }

        await sock.sendMessage(from, { text: "✅ Difusión completada con éxito, Jefe." });
    }
};
