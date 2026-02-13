module.exports = {
  name: 'hidetag',
  run: async (sock, msg, body, args) => {
    const from = msg.key.remoteJid;
    const groupMetadata = await sock.groupMetadata(from);
    const participants = groupMetadata.participants.map(v => v.id);
    const texto = args.join(' ') || 'Atención aquí 📢';

    await sock.sendMessage(from, { 
      text: texto, 
      mentions: participants 
    });
  }
};
