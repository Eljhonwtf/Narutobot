module.exports = {
    name: 'tagall',
    run: async (sock, msg, body, args, isOwner) => {
        try {
            const from = msg.key.remoteJid;
            const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";
            
            const metadata = await sock.groupMetadata(from);
            const isAdmin = metadata.participants.find(p => p.id === (msg.key.participant || msg.key.remoteJid))?.admin || isOwner;
            if (!isAdmin) return;

            const participants = metadata.participants.map(p => p.id);
            const nota = args.join(" ") || "Sin nota adjunta";
            
            let texto = `📢 *MENCIÓN DE AUDITORÍA*\n\n📝 *Nota:* ${nota}\n\n`;
            for (let mem of metadata.participants) {
                texto += `† @${mem.id.split('@')[0]}\n`;
            }

            await sock.sendMessage(from, { 
                text: texto + `\n_Sincronizado con Jhon-Bot System_`,
                mentions: participants,
                contextInfo: {
                    externalAdReply: {
                        title: "ADMINISTRACIÓN CENTRAL",
                        body: "Llamado general activado 🔔",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: msg });
        } catch (e) { console.log(e) }
    }
};
