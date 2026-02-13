const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../database/welcome-system.json');

module.exports = {
  name: 'setwelcome',
  run: async (sock, msg, body, args, isOwner) => {
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    
    if (!isGroup) return sock.sendMessage(from, { text: '❌ Solo para grupos.' }, { quoted: msg });

    const groupMetadata = await sock.groupMetadata(from);
    const admins = groupMetadata.participants.filter(p => p.admin).map(p => p.id);
    const isAdmin = admins.includes(msg.key.participant || msg.participant);

    if (!isAdmin && !isOwner) return sock.sendMessage(from, { text: '⚠️ Acceso denegado.' }, { quoted: msg });

    const text = args.join(' ');
    if (!text) return sock.sendMessage(from, { text: '⚠️ Debes escribir el mensaje.\n\nEjemplo: */setwelcome Hola @user bienvenido a @group lee las reglas.*' }, { quoted: msg });

    // Guardar en DB
    let db = {};
    if (fs.existsSync(dbPath)) db = JSON.parse(fs.readFileSync(dbPath));
    if (!db[from]) db[from] = { status: false, welcomeText: null, byeText: null };

    db[from].welcomeText = text;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    // --- VISTA PREVIA (SIMULACIÓN) ---
    const sender = msg.key.participant || msg.participant;
    let ppUrl;
    try {
      ppUrl = await sock.profilePictureUrl(sender, 'image');
    } catch {
      ppUrl = 'https://files.catbox.moe/t089d8.jpg'; // Imagen de incógnito (Naruto style)
    }

    let finalMsg = text
      .replace('@user', `@${sender.split('@')[0]}`)
      .replace('@group', groupMetadata.subject)
      .replace('@desc', groupMetadata.desc || 'Sin descripción');

    let caption = `╔════════════════════╗\n`;
    caption += `  ◈ *𝐍𝐄𝐖 𝐌𝐄𝐌𝐁𝐄𝐑* ◈\n`;
    caption += `╚════════════════════╝\n\n`;
    caption += `${finalMsg}\n\n`;
    caption += `> _Este es el mensaje que verán los nuevos usuarios._`;

    await sock.sendMessage(from, { 
      image: { url: ppUrl }, 
      caption: caption,
      mentions: [sender]
    }, { quoted: msg });
  }
};
