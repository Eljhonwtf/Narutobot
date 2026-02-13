// Variable en memoria (se reinicia si apagas el bot)
let welcomeStatus = false; 

module.exports = {
  name: 'welcome',
  run: async (sock, msg, body, args, isOwner) => {
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    
    // 1. Verificación de Grupo
    if (!isGroup) return sock.sendMessage(from, { text: '❌ Este comando solo es para grupos.' }, { quoted: msg });

    // 2. Verificación de Permisos (Admins u Obito)
    const groupMetadata = await sock.groupMetadata(from);
    const participants = groupMetadata.participants;
    const admins = participants.filter(p => p.admin).map(p => p.id);
    const isAdmin = admins.includes(msg.key.participant || msg.participant);

    if (!isAdmin && !isOwner) {
      return sock.sendMessage(from, { text: '⚠️ Solo los *Admins* o *Obito* pueden cambiar este ajuste.' }, { quoted: msg });
    }

    const action = args[0]?.toLowerCase();

    // 3. Lógica de Activación / Desactivación
    if (action === 'on') {
      if (welcomeStatus) return sock.sendMessage(from, { text: '🔔 La bienvenida ya está *activada*.' }, { quoted: msg });
      welcomeStatus = true;
      
      let onTxt = `╔════════════════════╗\n`;
      onTxt += `     ◈  *𝐖𝐄𝐋𝐂𝐎𝐌𝐄 - 𝐎𝐍* ◈\n`;
      onTxt += `╚════════════════════╝\n\n`;
      onTxt += `✅ El sistema de bienvenida ha sido *activado* con éxito en este grupo.\n\n`;
      onTxt += `_“La voluntad de fuego recibe a los nuevos.”_`;
      
      await sock.sendMessage(from, { text: onTxt }, { quoted: msg });

    } else if (action === 'off') {
      if (!welcomeStatus) return sock.sendMessage(from, { text: '🔕 La bienvenida ya está *desactivada*.' }, { quoted: msg });
      welcomeStatus = false;

      let offTxt = `╔════════════════════╗\n`;
      offTxt += `     ◈  *𝐖𝐄𝐋𝐂𝐎𝐌𝐄 - 𝐎𝐅𝐅* ◈\n`;
      offTxt += `╚════════════════════╝\n\n`;
      offTxt += `❌ El sistema de bienvenida ha sido *desactivado*.\n\n`;
      offTxt += `_“Las puertas de la aldea se han cerrado.”_`;

      await sock.sendMessage(from, { text: offTxt }, { quoted: msg });

    } else {
      // Mensaje de ayuda si no pone on/off
      const helpTxt = `💡 *Modo de uso:*\n\n⬡ */welcome on* (Activar)\n⬡ */welcome off* (Desactivar)\n\n*Estado actual:* ${welcomeStatus ? '✅ Activo' : '❌ Inactivo'}`;
      await sock.sendMessage(from, { text: helpTxt }, { quoted: msg });
    }
  }
};
