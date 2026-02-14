const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'database', 'welcome-system.json');

async function groupUpdateHandler(sock, update) {
    const { id, participants, action } = update;

    // Si el archivo no existe o está vacío, no hacemos nada
    if (!fs.existsSync(dbPath)) return;
    const db = JSON.parse(fs.readFileSync(dbPath));
    if (!db[id] || !db[id].status) return;

    const groupMetadata = await sock.groupMetadata(id);

    for (const participant of participants) {
        let ppUrl;
        try { 
            ppUrl = await sock.profilePictureUrl(participant, 'image'); 
        } catch { 
            ppUrl = 'https://files.catbox.moe/xr2m6u.jpg'; 
        }

        const userTag = `@${participant.split('@')[0]}`;
        const contextInfo = {
            externalAdReply: {
                title: 'Narutobot System ✨',
                body: 'Hecho con amor por Jhon ✨',
                mediaType: 1,
                thumbnailUrl: 'https://files.catbox.moe/xr2m6u.jpg',
                sourceUrl: 'https://github.com/JhonGuerra'
            }
        };

        if (action === 'add') {
            let wel = `❀ *Bienvenido* a *${groupMetadata.subject}*\n✰ ${userTag}\n\n${db[id].welcomeText || '¡Disfruta tu estadía en la aldea!'}\n\n> ✐ Usa *#help* para ver los jutsus.`;
            await sock.sendMessage(id, { image: { url: ppUrl }, caption: wel, mentions: [participant], contextInfo });
        } else if (action === 'remove') {
            let bye = `❀ *Adiós* de *${groupMetadata.subject}*\n✰ ${userTag}\n\n${db[id].byeText || '¡Esperamos verte pronto de nuevo!'}\n\n> ✐ La voluntad de fuego sigue viva.`;
            await sock.sendMessage(id, { image: { url: ppUrl }, caption: bye, mentions: [participant], contextInfo });
        }
    }
}

module.exports = { groupUpdateHandler };
