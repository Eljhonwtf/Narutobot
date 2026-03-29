module.exports = {
    name: 'setdesc',
    run: async (sock, msg, body, args, isOwner) => {
        try {
            const from = msg.key.remoteJid;
            const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";
            
            const metadata = await sock.groupMetadata(from);
            const isAdmin = metadata.participants.find(p => p.id === (msg.key.participant || msg.key.remoteJid))?.admin || isOwner;
            if (!isAdmin) return;

            if (!args[0]) return await sock.sendMessage(from, { text: "⚠️ Escribe la nueva descripción." }, { quoted: msg });

            await sock.groupUpdateDescription(from, args.join(" "));
            await sock.sendMessage(from, { 
                text: `✅ *INFO ACTUALIZADA*\n\nLa descripción del grupo ha sido modificada.\n\n_Sincronizado con Jhon-Bot System_`,
                contextInfo: {
                    externalAdReply: {
                        title: "ADMINISTRACIÓN CENTRAL",
                        body: "Descripción editada ✅",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: msg });
        } catch (e) { console.log(e) }
    }
};
