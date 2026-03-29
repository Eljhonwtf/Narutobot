module.exports = {
    name: 'link',
    run: async (sock, msg, body, args, isOwner) => {
        try {
            const from = msg.key.remoteJid;
            const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";
            if (!from.endsWith('@g.us')) return;

            const metadata = await sock.groupMetadata(from);
            const isAdmin = metadata.participants.find(p => p.id === (msg.key.participant || msg.key.remoteJid))?.admin || isOwner;
            if (!isAdmin) return;

            const code = await sock.groupInviteCode(from);
            const link = `https://chat.whatsapp.com/${code}`;

            await sock.sendMessage(from, { 
                text: `🔗 *ENLACE DE ACCESO*\n\n${link}\n\n_Sincronizado con Jhon-Bot System_`,
                contextInfo: {
                    externalAdReply: {
                        title: "ADMINISTRACIÓN CENTRAL",
                        body: "Enlace de invitación generado ✅",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: msg });
        } catch (e) {
            await sock.sendMessage(from, { text: "❌ Error: ¿El bot es admin?" }, { quoted: msg });
        }
    }
};
