const fs = require('fs');
const path = require('path');

// Ruta de la base de datos de bienvenidas
const databasePath = path.join(__dirname, '../database/welcome.json');

module.exports = {
  name: 'setwelcome',
  run: async (sock, msg, body, args, isOwner) => {
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    
    // 1. Verificación: Solo grupos
    if (!isGroup) return sock.sendMessage(from, { text: '❌ Este comando solo funciona en grupos.' }, { quoted: msg });

    // 2. Verificación de permisos (Admins y Owner)
    const groupMetadata = await sock.groupMetadata(from);
    const participants = groupMetadata.participants;
    const admins = participants.filter(p => p.admin).map(p => p.id);
    const isAdmin = admins.includes(msg.key.participant || msg.participant);

    if (!isAdmin && !isOwner) {
      return sock.sendMessage(from, { text: '⚠️ Acceso denegado. Solo *Admins* o *Obito* pueden configurar la bienvenida.' }, { quoted: msg });
    }

    // 3. Lógica de guardado
    const text = args.join(' ');
    if (!text) {
      return sock.sendMessage(from, { 
        text: `💡 *Configuración de Bienvenida*\n\nUso: \`/setwelcome Bienvenido @user a @group\`\n\n*Variables disponibles:*\n- @user (Menciona al nuevo)\n- @group (Nombre del grupo)\n- @desc (Descripción del grupo)` 
      }, { quoted: msg });
    }

    // Leer o crear base de datos
    let welcomeDb = {};
    if (fs.existsSync(databasePath)) {
      welcomeDb = JSON.parse(fs.readFileSync(databasePath));
    }

    // Guardar mensaje
    welcomeDb[from] = text;
    if (!fs.existsSync(path.dirname(databasePath))) {
      fs.mkdirSync(path.dirname(databasePath), { recursive: true });
    }
    fs.writeFileSync(databasePath, JSON.stringify(welcomeDb, null, 2));

    // 4. Confirmación visual estilo Anubis
    let confTxt = `╔════════════════════╗\n`;
    confTxt += `    ◈ *𝐖𝐄𝐋𝐂𝐎𝐌𝐄 - 𝐒𝐄𝐓* ◈\n`;
    confTxt += `╚════════════════════╝\n\n`;
    confTxt += `✅ *Bienvenida configurada con éxito.*\n\n`;
    confTxt += `📝 *Mensaje:* ${text}\n\n`;
    confTxt += `_“Un nuevo ninja se une a nuestra voluntad de fuego.”_`;

    await sock.sendMessage(from, { text: confTxt }, { quoted: msg });
  }
};
