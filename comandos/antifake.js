module.exports = {
  name: 'antifake',
  run: async (sock, msg, body, args) => {
    const from = msg.key.remoteJid;
    if (args[0] === 'on') {
      // Aquí guardarías en tu DB: antifake[from] = true
      await sock.sendMessage(from, { text: '> 🛡️ *Protocolo Antifake activado. Números extranjeros serán expulsados.*' });
    } else if (args[0] === 'off') {
      await sock.sendMessage(from, { text: '> 🔓 *Protocolo Antifake desactivado.*' });
    }
  }
};
