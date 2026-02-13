const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../database/welcome-system.json');

module.exports = {
  name: 'setbye',
  run: async (sock, msg, body, args, isOwner) => {
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    
    if (!isGroup) return sock.sendMessage(from, { text: '❌ Solo para grupos.' }, { quoted: msg });

    const groupMetadata = await sock.groupMetadata(from);
    const admins = groupMetadata.participants.filter(p => p.admin).map(p => p.id);
    const isAdmin = admins.includes(msg.key.participant || msg.participant);

    if (!isAdmin && !isOwner) return sock.sendMessage(from, { text: '⚠️ Acceso denegado.' }, { quoted: msg });

    const text = args.join(' ');
    if (!text) return sock.sendMessage(from, { text: '⚠️ Escribe el mensaje de despedida.\n\nEjemplo: */setbye Adios @user, te extrañaremos.*' }, { quoted: msg });

    // Guardar en DB
    let db = {};
    if (fs.existsSync(dbPath)) db = JSON.parse(fs.readFileSync(dbPath));
    if (!db[from]) db[from] = { status: false, welcomeText: null, byeText: null };

    db[from].byeText = text;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    // --- VISTA PREVIA ---
    const sender = msg.key.participant || msg.participant;
    let ppUrl;
    try {
        ppUrl = await sock.profilePictureUrl(sender, 'image');
    } catch {
        ppUrl = 'https://files.catbox.moe/t089d8.jpg'; // Imagen de incógnito
    }

    let finalMsg = text
      .replace('@user', `@${sender.split('@')[0]}`)
      .replace('@group', groupMetadata.subject);

    let caption = `╔════════════════════╗\n`;
    caption += `    ◈ *𝐆𝐎𝐎𝐃 𝐁𝐘𝐄* ◈\n`;
    caption += `╚════════════════════╝\n\n`;
    caption += `${finalMsg}\n\n`;
    caption += `> _Así se despedirá el bot._`;

    await sock.sendMessage(from, { 
      image: { url: ppUrl }, 
      caption: caption,
      mentions: [sender]
    }, { quoted: msg });
  }
};
