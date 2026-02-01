module.exports = {
    name: 'resetlink',
    run: async (sock, msg, body, args, isOwner) => {
        try {
            const from = msg.key.remoteJid;
            const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";
            
            const metadata = await sock.groupMetadata(from);
            const isAdmin = metadata.participants.find(p => p.id === (msg.key.participant || from))?.admin || isOwner;
            if (!isAdmin) return;

            await sock.groupRevokeInvite(from);
            
            await sock.sendMessage(from, { 
                text: `✅ *SEGURIDAD ACTUALIZADA*\n\nEl enlace de invitación anterior ha sido revocado. Se ha generado uno nuevo automáticamente.\n\n_Sincronizado con Jhon-Bot System_`,
                contextInfo: {
                    externalAdReply: {
                        title: "ADMINISTRACIÓN CENTRAL",
                        body: "Link restablecido 🔒",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: msg });
        } catch (e) {
            await sock.sendMessage(from, { text: "❌ Error: Asegúrate de que el bot sea admin." }, { quoted: msg });
        }
    }
};
