module.exports = {
    name: 'kick',
    description: 'Elimina un usuario del grupo (Solo Admins)',
    async run(sock, msg, body, args, isOwner) {
        const from = msg.key.remoteJid;
        const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

        // 1. Verificar si es un grupo
        if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: "🤦‍♂️ ¿viste que eres tonto? este comando solo funciona en grupos. 🥹" });

        try {
            // 2. Obtener metadata del grupo y participantes
            const groupMetadata = await sock.groupMetadata(from);
            const participants = groupMetadata.participants;
            
            // 3. Verificar si el bot es admin (necesario para eliminar)
            const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
            const isBotAdmin = participants.find(p => p.id === botNumber)?.admin !== null;
            if (!isBotAdmin) return sock.sendMessage(from, { text: "⚠️ Necesito ser *Administrador* para eliminar usuarios." });

            // 4. Verificar si quien ejecuta es Admin o Jhon🏴‍☠️
            const sender = msg.key.participant || msg.key.remoteJid;
            const isAdmin = participants.find(p => p.id === sender)?.admin !== null;
            
            if (!isAdmin && !isOwner) {
                return sock.sendMessage(from, { text: "⚠️ Solo los *Administradores del grupo* o *Jhon🏴‍☠️* pueden usar este comando." });
            }

            // 5. Obtener al usuario a eliminar (mención o respuesta)
            let usuario = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || 
                          msg.message.extendedTextMessage?.contextInfo?.participant;

            if (!usuario) return sock.sendMessage(from, { text: "⚠️ Menciona al usuario que deseas eliminar o responde a su mensaje." });

            // 6. Ejecutar expulsión
            await sock.groupParticipantsUpdate(from, [usuario], "remove");

            // 7. Mensaje de confirmación con diseño de Administración Central
            await sock.sendMessage(from, { 
                text: `🚫 *USUARIO ELIMINADO*\n\nSe ha ejecutado la limpieza en el grupo.\n\n_Acción autorizada por la Administración._`,
                contextInfo: {
                    externalAdReply: {
                        title: "ADMINISTRACIÓN CENTRAL",
                        body: "Modo Dios: ACTIVADO 🫨",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: msg });

            await sock.sendMessage(from, { react: { text: "🚮", key: msg.key } });

        } catch (err) {
            console.log(err);
            await sock.sendMessage(from, { text: "❌ Error al intentar eliminar al usuario." });
        }
    }
};
