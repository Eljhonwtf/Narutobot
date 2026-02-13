module.exports = {
  name: 'setmsg',
  run: async (sock, msg, body, args) => {
    const from = msg.key.remoteJid;
    const tipo = args[0]; // 'welcome' o 'bye'
    const texto = args.slice(1).join(' ');

    if (tipo === 'welcome') {
      // Guardar texto en base de datos para este 'from'
      await sock.sendMessage(from, { text: `> ✅ *Mensaje de bienvenida configurado:* \n${texto}` });
    } else if (tipo === 'bye') {
      // Guardar texto en base de datos para este 'from'
      await sock.sendMessage(from, { text: `> ✅ *Mensaje de despedida configurado:* \n${texto}` });
    } else {
      await sock.sendMessage(from, { text: '> 💡 *Uso:* /setmsg welcome [texto] o /setmsg bye [texto]' });
    }
  }
};
