module.exports = {
    name: 'admins',
    description: '🚀Aqui tienes la lista detallada de los admins del grupo🚀',
    run: async (sock, msg, body, args, isOwner) => {
        try {
            const from = msg.key.remoteJid;
            const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";
            
            if (!from.endsWith('@g.us')) return;

            const metadata = await sock.groupMetadata(from);
            const participants = metadata.participants;
            
            // Filtramos admins y creador
            const groupAdmins = participants.filter(p => p.admin !== null);
            const creator = metadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || "No detectado";

            let report = `╔════════════════════╗\n`;
            report += `║   🛡️ *ADMINS DEL GRUPO🏌🏽‍♂️* ║\n`;
            report += `╚════════════════════╝\n\n`;
            
            report += `👑 *CREADOR DEL GRUPO:*\n`;
            report += `† @${creator.split('@')[0]}\n\n`;

            report += `👥 *ADMINS ACTIVOS (${groupAdmins.length}):*\n`;
            
            for (let admin of groupAdmins) {
                // Marcamos con un emoji diferente si es el mismo que el creador
                const tag = admin.id === creator ? '🚀' : '†';
                report += `${tag} @${admin.id.split('@')[0]}\n`;
            }

            report += `\n───────────────────────\n`;
            report += `_Sincronizado con Jhon-Bot System_`;

            await sock.sendMessage(from, { 
                text: report, 
                mentions: groupAdmins.map(a => a.id),
                contextInfo: {
                    externalAdReply: {
                        title: "ADMINISTRACIÓN CENTRAL",
                        body: `Grupo: ${metadata.subject}`,
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: msg });

            await sock.sendMessage(from, { react: { text: "🚀", key: msg.key } });

        } catch (e) {
            console.log("Error en admins:", e);
        }
    }
};
