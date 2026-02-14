const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../database/welcome-system.json');

module.exports = {
  name: 'testwelcome',
  run: async (sock, msg, body, args, isOwner) => {
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');

    // 1. Validación de Grupo
    if (!isGroup) return sock.sendMessage(from, { text: '❌ Este comando solo funciona en grupos.' }, { quoted: msg });

    // 2. Validación de Permisos (Admins u Obito)
    const groupMetadata = await sock.groupMetadata(from);
    const participants = groupMetadata.participants;
    const isAdmin = participants.find(p => p.id === (msg.key.participant || msg.participant))?.admin !== null;

    if (!isAdmin && !isOwner) {
      return sock.sendMessage(from, { text: '⚠️ Solo los *Admins* o el *Owner* pueden probar la bienvenida.' }, { quoted: msg });
    }

    // 3. Cargar Base de Datos para ver qué mensaje mostrar
    let db = {};
    if (fs.existsSync(dbPath)) db = JSON.parse(fs.readFileSync(dbPath));
    
    const welcomeEnabled = db[from]?.status;
    const customText = db[from]?.welcomeText;

    // 4. Obtener foto de perfil del que ejecuta el comando (para el test)
    let ppUrl;
    try {
      ppUrl = await sock.profilePictureUrl(msg.key.participant || msg.participant, 'image');
    } catch {
      ppUrl = 'https://files.catbox.moe/xr2m6u.jpg'; // Imagen de incógnito
    }

    const userTag = `@${(msg.key.participant || msg.participant).split('@')[0]}`;

    // 5. Construir el diseño (Igual al que está en el index.js)
    let wel = `❀ *TEST: Bienvenido* a *${groupMetadata.subject}*\n`;
    wel += `✰ ${userTag}\n\n`;
    wel += `${customText || '•(=^●ω●^=)• Disfruta tu estadía en el grupo!'}\n\n`;
    wel += `> ✐ Estado del sistema: ${welcomeEnabled ? '🟢 Activo' : '🔴 Desactivado'}\n`;
    wel += `> ✐ Puedes usar *#help* para ver la lista de comandos.`;

    // 6. Enviar el mensaje de prueba con Quoted
    await sock.sendMessage(from, { 
      image: { url: ppUrl }, 
      caption: wel, 
      mentions: [msg.key.participant || msg.participant] 
    }, { quoted: msg });
  }
};
