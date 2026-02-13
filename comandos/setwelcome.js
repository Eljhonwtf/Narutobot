module.exports = {
  name: 'setwelcome',
  run: async (sock, msg, body, args, isOwner) => {
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    const groupMetadata = isGroup ? await sock.groupMetadata(from) : null;
    
    // Verificación de permisos
    const participants = isGroup ? groupMetadata.participants : [];
    const admins = participants.filter(p => p.admin).map(p => p.id);
    const isAdmin = admins.includes(msg.key.participant || msg.participant);

    if (!isAdmin && !isOwner) {
      return sock.sendMessage(from, { text: '⚠️ Solo admins o *Obito* pueden ejecutar esto.' }, { quoted: msg });
    }

    const text = args.join(' ') || 'Bienvenido al grupo';
    const user = msg.key.participant || from;

    let welcomeTxt = `╔════════════════════╗\n`;
    welcomeTxt += `    ◈ *𝐖𝐄𝐋𝐂𝐎𝐌𝐄 - 𝐒𝐘𝐒𝐓𝐄𝐌* ◈\n`;
    welcomeTxt += `╚════════════════════╝\n\n`;
    welcomeTxt += `👋 ¡Hola @${user.split('@')[0]}!\n\n`;
    welcomeTxt += `📝 *Mensaje:* ${text}\n`;
    welcomeTxt += `🏛️ *Grupo:* ${isGroup ? groupMetadata.subject : 'Narutobot'}\n\n`;
    welcomeTxt += `_“Un nuevo ninja se une a la aldea.”_`;

    await sock.sendMessage(from, { 
      text: welcomeTxt,
      mentions: [user] 
    }, { quoted: msg });
  }
};
