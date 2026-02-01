module.exports = {
    name: 'autodm',
    description: 'Dar admin al dueño automáticamente',
    run: async (sock, msg, body, args, isOwner) => {
        try {
            // DEFINICIÓN DE VARIABLE 'from' (Lo que faltaba)
            const from = msg.key.remoteJid; 
            const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";
            
            if (!isOwner) return; // Solo tú puedes usarlo

            if (!from.endsWith('@g.us')) return await sock.sendMessage(from, { text: "❌ Este comando solo funciona en grupos." }, { quoted: msg });

            const participantId = msg.key.participant || msg.key.remoteJid;

            await sock.groupParticipantsUpdate(from, [participantId], "promote");
            
            await sock.sendMessage(from, { 
                text: `👑 *SISTEMA DE SEGURIDAD*\n\nAdmin restaurado para el Owner.\n\n_Sincronizado con Jhon-Bot System_`,
                contextInfo: {
                    externalAdReply: {
                        title: "ADMINISTRACIÓN CENTRAL",
                        body: "Modo Dios: REESTABLECIDO 🚀",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: msg });

            await sock.sendMessage(from, { react: { text: "👑", key: msg.key } });

        } catch (e) {
            console.log("Error en autodm:", e);
            // Si el bot no es admin, enviará este mensaje
            const from = msg.key.remoteJid;
            await sock.sendMessage(from, { text: "❌ Error: No puedo darte admin si yo no soy administrador primero." }, { quoted: msg });
        }
    }
};
