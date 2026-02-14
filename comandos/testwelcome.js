const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../database/welcome-system.json');

module.exports = {
  name: 'testwelcome',
  run: async (sock, msg, body, args, isOwner) => {
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');

    if (!isGroup) return sock.sendMessage(from, { text: '❌ Este comando solo funciona en grupos.' }, { quoted: msg });

    const groupMetadata = await sock.groupMetadata(from);
    const participants = groupMetadata.participants;
    const isAdmin = participants.find(p => p.id === (msg.key.participant || msg.participant))?.admin !== null;

    if (!isAdmin && !isOwner) {
      return sock.sendMessage(from, { text: '⚠️ Solo los *Admins* o *Jhon* pueden probar esto.' }, { quoted: msg });
    }

    let db = {};
    if (fs.existsSync(dbPath)) db = JSON.parse(fs.readFileSync(dbPath));
    
    const welcomeEnabled = db[from]?.status;
    const customText = db[from]?.welcomeText;

    let ppUrl;
    try {
      ppUrl = await sock.profilePictureUrl(msg.key.participant || msg.participant, 'image');
    } catch {
      ppUrl = 'https://files.catbox.moe/xr2m6u.jpg'; 
    }

    const userTag = `@${(msg.key.participant || msg.participant).split('@')[0]}`;

    // --- CONFIGURACIÓN DEL SOURCE (CRÉDITOS) ---
    const sourceInfo = {
      externalAdReply: {
        title: 'Naruto Bot MD',
        body: 'Hecho con amor por Jhon ✨',
        mediaType: 1,
        thumbnailUrl: 'https://files.catbox.moe/xr2m6u.jpg', 
        sourceUrl: 'https://github.com/JhonGuerra' // Puedes poner tu link real aquí
      }
    };

    // --- DISEÑO ---
    let wel = `❀ *TEST: Bienvenido* a *${groupMetadata.subject}*\n`;
    wel += `✰ ${userTag}\n\n`;
    wel += `${customText || '•(=^●ω●^=)• Disfruta tu estadía en el grupo!'}\n\n`;
    wel += `> ✐ Estado del sistema: ${welcomeEnabled ? '🟢 Activo' : '🔴 Desactivado'}\n`;
    wel += `> ✐ Puedes usar *#help* para ver la lista de comandos.`;

    // Enviar con contextInfo para ver los créditos
    await sock.sendMessage(from, { 
      image: { url: ppUrl }, 
      caption: wel, 
      mentions: [msg.key.participant || msg.participant],
      contextInfo: sourceInfo // <-- Esto activa el recuadro que subrayaste
    }, { quoted: msg });
  }
};
