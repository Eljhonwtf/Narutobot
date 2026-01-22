module.exports = {
    name: 'setname',
    description: 'Cambiar el nombre del grupo citando al autor',
    run: async (sock, msg, body, args, isOwner) => {
        try {
            const from = msg.key.remoteJid;
            const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

            // Verificar si es un grupo
            if (!from.endsWith('@g.us')) return;

            // Verificar permisos (Admin o Tú)
            const metadata = await sock.groupMetadata(from);
            const isAdmin = metadata.participants.find(p => p.id === (msg.key.participant || msg.key.remoteJid))?.admin || isOwner;

            if (!isAdmin) {
                return await sock.sendMessage(from, { text: "❌ Solo auditores o mi dueño pueden usar este comando." }, { quoted: msg });
            }

            if (!args[0]) {
                return await sock.sendMessage(from, { text: "⚠️ Debes escribir el nuevo nombre del grupo." }, { quoted: msg });
            }

            const nuevoNombre = args.join(" ");
            await sock.groupUpdateSubject(from, nuevoNombre);

            // Respuesta citando el mensaje original y con diseño de auditoría
            await sock.sendMessage(from, { 
                text: `✅ *SISTEMA ACTUALIZADO*\n\n📝 *Nuevo nombre:* ${nuevoNombre}\n\n_Sincronizado con Jhon-Bot System_`,
                contextInfo: {
                    externalAdReply: {
                        title: "ADMINISTRACIÓN CENTRAL",
                        body: "Nombre del grupo modificado 🧐",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: msg }); // Aquí se cumple la función de citar el mensaje

            await sock.sendMessage(from, { react: { text: "📝", key: msg.key } });

        } catch (e) {
            console.log("Error en setname:", e);
        }
    }
};
