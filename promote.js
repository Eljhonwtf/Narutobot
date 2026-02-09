module.exports = {
    name: 'promote',
    run: async (sock, msg, body, args, isOwner) => {
        try {
            const from = msg.key.remoteJid;
            const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";
            if (!from.endsWith('@g.us')) return;

            const metadata = await sock.groupMetadata(from);
            const participantId = msg.key.participant || msg.key.remoteJid;
            const isAdmin = metadata.participants.find(p => p.id === participantId)?.admin || isOwner;

            if (!isAdmin) return await sock.sendMessage(from, { text: "❌ Solo los administradores o mi dueño pueden usar este comando." }, { quoted: msg });

            const target = msg.message.extendedTextMessage?.contextInfo?.participant || msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
            if (!target) return await sock.sendMessage(from, { text: "⚠️ Menciona o responde al mensaje de quien deseas promover." }, { quoted: msg });

            await sock.groupParticipantsUpdate(from, [target], "promote");
            await sock.sendMessage(from, { 
                text: `✅ *ADMIN ACTUALIZADO*\n\nEl usuario ahora tiene rango de administración.\n\n_Sincronizado con Jhon-Bot System_`,
                contextInfo: {
                    externalAdReply: {
                        title: "ADMINISTRACIÓN CENTRAL",
                        body: "Rango: ADMINISTRADOR ✅",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: msg });
        } catch (e) { console.log(e) }
    }
};
