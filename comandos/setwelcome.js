const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../database/welcome-system.json');

module.exports = {
  name: 'setwelcome',
  run: async (sock, msg, body, args, isOwner) => {
    const from = msg.key.remoteJid;
    const txt = args.join(" ");
    if (!txt) return sock.sendMessage(from, { text: '❌ Escribe el mensaje de bienvenida.' }, { quoted: msg });

    let db = JSON.parse(fs.readFileSync(dbPath));
    if (!db[from]) db[from] = { status: false };
    
    db[from].welcomeText = txt;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    await sock.sendMessage(from, { text: '✅ *Mensaje de bienvenida guardado.*' }, { quoted: msg });
  }
};
