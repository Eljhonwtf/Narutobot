const fs = require('fs');
const path = require('path');

// Ruta donde se guardarán las despedidas por grupo
const databasePath = path.join(__dirname, '../database/bye.json');

module.exports = {
  name: 'setbye',
  run: async (sock, msg, body, args, isOwner) => {
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    
    // 1. Verificación: Solo grupos
    if (!isGroup) return sock.sendMessage(from, { text: '❌ Este comando solo puede usarse en grupos.' }, { quoted: msg });

    // 2. Verificación de permisos (Admins y Owner)
    const groupMetadata = await sock.groupMetadata(from);
    const participants = groupMetadata.participants;
    const admins = participants.filter(p => p.admin).map(p => p.id);
    const isAdmin = admins.includes(msg.key.participant || msg.participant);

    if (!isAdmin && !isOwner) {
      return sock.sendMessage(from, { text: '⚠️ Solo los *Admins* o mi creador *Obito* pueden usar este comando.' }, { quoted: msg });
    }

    // 3. Lógica para guardar el mensaje
    const text = args.join(' ');
    if (!text) {
      return sock.sendMessage(from, { 
        text: `💡 *Uso correcto:*\n/setbye Adiós @user, esperamos que no vuelvas.\n\n_Puedes usar @user para mencionar al que sale._` 
      }, { quoted: msg });
    }

    // Leer o crear base de datos
    let byeDb = {};
    if (fs.existsSync(databasePath)) {
      byeDb = JSON.parse(fs.readFileSync(databasePath));
    }

    // Guardar mensaje
    byeDb[from] = text;
    if (!fs.existsSync(path.dirname(databasePath))) {
      fs.mkdirSync(path.dirname(databasePath), { recursive: true });
    }
    fs.writeFileSync(databasePath, JSON.stringify(byeDb, null, 2));

    // 4. Confirmación visual
    let confTxt = `╔════════════════════╗\n`;
    confTxt += `     ◈  *𝐁𝐘𝐄 - 𝐂𝐎𝐍𝐅𝐈𝐆* ◈\n`;
    confTxt += `╚════════════════════╝\n\n`;
    confTxt += `✅ *Mensaje establecido correctamente.*\n\n`;
    confTxt += `📝 *Texto:* ${text}\n\n`;
    confTxt += `_“La voluntad de fuego se apaga para un miembro.”_`;

    await sock.sendMessage(from, { text: confTxt }, { quoted: msg });
  }
};
