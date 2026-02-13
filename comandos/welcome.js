const fs = require('fs');
const path = require('path');

// Base de datos unificada
const dbPath = path.join(__dirname, '../database/welcome-system.json');

module.exports = {
  name: 'welcome',
  run: async (sock, msg, body, args, isOwner) => {
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    
    // Validaciones
    if (!isGroup) return sock.sendMessage(from, { text: '❌ Solo para grupos.' }, { quoted: msg });

    const groupMetadata = await sock.groupMetadata(from);
    const participants = groupMetadata.participants;
    const admins = participants.filter(p => p.admin).map(p => p.id);
    const isAdmin = admins.includes(msg.key.participant || msg.participant);

    if (!isAdmin && !isOwner) {
      return sock.sendMessage(from, { text: '⚠️ Solo Admins y el Owner pueden configurar esto.' }, { quoted: msg });
    }

    // Cargar o crear base de datos
    let db = {};
    if (fs.existsSync(dbPath)) db = JSON.parse(fs.readFileSync(dbPath));
    if (!db[from]) db[from] = { status: false, welcomeText: null, byeText: null };

    const action = args[0]?.toLowerCase();

    if (action === 'on') {
      db[from].status = true;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
      
      await sock.sendMessage(from, { 
        text: `✅ *SISTEMA DE BIENVENIDA ACTIVADO*\n\nAhora saludaré a los nuevos ninjas con el diseño predeterminado o el que hayas configurado.\n\n_Usa /setwelcome para personalizar el mensaje._` 
      }, { quoted: msg });

    } else if (action === 'off') {
      db[from].status = false;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

      await sock.sendMessage(from, { 
        text: `🔕 *SISTEMA DESACTIVADO*\n\nYa no enviaré mensajes de bienvenida ni despedida en este grupo.` 
      }, { quoted: msg });

    } else {
      await sock.sendMessage(from, { 
        text: `⚙️ *CONFIGURACIÓN WELCOME*\n\nEstado actual: ${db[from].status ? '🟢 Activado' : '🔴 Desactivado'}\n\nComandos:\n⬡ */welcome on* (Activar)\n⬡ */welcome off* (Desactivar)` 
      }, { quoted: msg });
    }
  }
};
