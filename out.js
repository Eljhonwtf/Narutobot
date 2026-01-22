module.exports = {
    name: 'out',
    description: 'Ordena al bot salir del grupo',
    async run(sock, msg, body, args, isOwner) {
        const from = msg.key.remoteJid;
        const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

        // --- SEGURIDAD: SOLO JHON ---
        if (!isOwner) {
            return await sock.sendMessage(from, { 
                text: "⚠️ *ACCESO DENEGADO*\nSolo el dueño del bot puede retirar el sistema." 
            }, { quoted: msg });
        }

        // Verificar si el comando se usa en un grupo
        if (!from.endsWith('@g.us')) {
            return await sock.sendMessage(from, { text: "⚠️ Este comando solo puede usarse en grupos, Jhon🏴‍☠️." });
        }

        try {
            // Mensaje de despedida con diseño de Administración Central
            await sock.sendMessage(from, { 
                text: "👋 *RETIRADA DEL SISTEMA*\n\nPor orden de *Jhon🏴‍☠️*, el bot abandonará este grupo. ¡Hasta la próxima!",
                contextInfo: {
                    externalAdReply: {
                        title: "ADMINISTRACIÓN CENTRAL",
                        body: "Modo Dios: ACTIVADO ✅",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            });

            // Reacción de despedida
            await sock.sendMessage(from, { react: { text: "🫡", key: msg.key } });

            // El bot abandona el grupo
            await sock.groupLeave(from);

            console.log(`\x1b[33m[SISTEMA]:\x1b[0m Bot salió del grupo ${from} por orden de Jhon🏴‍☠️.`);

        } catch (err) {
            console.log(err);
            await sock.sendMessage(from, { text: "❌ Error al intentar salir del grupo." });
        }
    }
};
