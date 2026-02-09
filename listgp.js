module.exports = {
    name: 'listgroups',
    run: async (sock, msg, body, args, isOwner) => {
        if (!isOwner) return;
        const from = msg.key.remoteJid;
        const groups = await sock.groupFetchAllParticipating();
        const arrayGroups = Object.values(groups);
        
        let txt = `📂 *REPORTE DE INFILTRACIÓN*\n\nTotal de sectores: ${arrayGroups.length}\n\n`;
        arrayGroups.forEach((g, i) => {
            txt += `${i+1}. 🏛️ *Nombre:* ${g.subject}\n🆔 *ID:* ${g.id}\n\n`;
        });

        await sock.sendMessage(from, { 
            text: txt + `_Sincronizado con Jhon-Bot System_`,
            contextInfo: {
                externalAdReply: {
                    title: "ADMINISTRACIÓN CENTRAL",
                    body: "Listado de sectores activos ✅",
                    thumbnailUrl: "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg",
                    mediaType: 1
                }
            }
        }, { quoted: msg });
    }
};
