module.exports = {
    name: 'infogp',
    run: async (sock, msg, body, args, isOwner) => {
        try {
            const from = msg.key.remoteJid;
            const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";
            
            const metadata = await sock.groupMetadata(from);
            const participantes = metadata.participants.length;
            const creador = metadata.owner || "No disponible";
            
            let texto = `📊 *DATOS DE ADMINS*\n\n`;
            texto += `📝 *Nombre:* ${metadata.subject}\n`;
            texto += `🆔 *ID:* ${metadata.id}\n`;
            texto += `👥 *Miembros:* ${participantes}\n`;
            texto += `👑 *Creador:* @${creador.split('@')[0]}\n`;
            texto += `\n_Sincronizado con Jhon-Bot System_`;

            await sock.sendMessage(from, { 
                text: texto, 
                mentions: [creador],
                contextInfo: {
                    externalAdReply: {
                        title: "ADMINISTRACIÓN CENTRAL",
                        body: "Reporte Grupal 🚀",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: msg });
        } catch (e) { console.log(e) }
    }
};
