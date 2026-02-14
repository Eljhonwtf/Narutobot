const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../database/welcome-system.json');

module.exports = {
  name: 'welcome',
  run: async (sock, msg, body, args, isOwner) => {
    const from = msg.key.remoteJid;
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Solo en grupos.' }, { quoted: msg });

    // Verificación de Admins
    const groupMetadata = await sock.groupMetadata(from);
    const isAdmin = groupMetadata.participants.find(p => p.id === (msg.key.participant || msg.participant))?.admin !== null;

    if (!isAdmin && !isOwner) return sock.sendMessage(from, { text: '⚠️ Solo Admins u Obito.' }, { quoted: msg });

    let db = JSON.parse(fs.readFileSync(dbPath));
    if (!db[from]) db[from] = { status: false, welcomeText: null };

    const action = args[0]?.toLowerCase();

    if (action === 'on') {
      db[from].status = true;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
      await sock.sendMessage(from, { text: '✅ *Bienvenida activada en este grupo.*' }, { quoted: msg });
    } else if (action === 'off') {
      db[from].status = false;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
      await sock.sendMessage(from, { text: '❌ *Bienvenida desactivada.*' }, { quoted: msg });
    } else {
      await sock.sendMessage(from, { text: `💡 Uso: *#welcome on/off*\nEstado: ${db[from].status ? 'Activado' : 'Desactivado'}` }, { quoted: msg });
    }
  }
};
