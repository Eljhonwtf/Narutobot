module.exports = {
  name: 'setbye',
  run: async (sock, msg, body, args, isOwner) => {
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    
    // Verificación de permisos
    const groupMetadata = isGroup ? await sock.groupMetadata(from) : null;
    const participants = isGroup ? groupMetadata.participants : [];
    const admins = participants.filter(p => p.admin).map(p => p.id);
    const isAdmin = admins.includes(msg.key.participant || msg.participant);

    if (!isAdmin && !isOwner) {
      return sock.sendMessage(from, { text: '⚠️ Solo admins o *Obito* pueden ejecutar esto.' }, { quoted: msg });
    }

    const text = args.join(' ') || 'Adiós, te extrañaremos';
    const user = msg.key.participant || from;

    let byeTxt = `╔════════════════════╗\n`;
    byeTxt += `     ◈  *𝐁𝐘𝐄 - 𝐒𝐘𝐒𝐓𝐄𝐌* ◈\n`;
    byeTxt += `╚════════════════════╝\n\n`;
    byeTxt += `👤 *Usuario:* @${user.split('@')[0]}\n`;
    byeTxt += `📝 *Nota:* ${text}\n\n`;
    byeTxt += `_“La voluntad de fuego se apaga para alguien.”_`;

    await sock.sendMessage(from, { 
      text: byeTxt,
      mentions: [user] 
    }, { quoted: msg });
  }
};
