module.exports = {
  name: 'group',
  run: async (sock, msg, body, args, isOwner) => {
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    if (!isGroup) return;

    if (args[0] === 'open') {
      await sock.groupSettingUpdate(from, 'not_announcement');
      await sock.sendMessage(from, { text: '> ✅ *El grupo ha sido abierto. Todos pueden enviar mensajes.*' });
    } else if (args[0] === 'close') {
      await sock.groupSettingUpdate(from, 'announcement');
      await sock.sendMessage(from, { text: '> 🔒 *El grupo ha sido cerrado. Solo administradores pueden enviar mensajes.*' });
    } else {
      await sock.sendMessage(from, { text: '> 💡 *Uso correcto:* /group open | /group close' });
    }
  }
};
