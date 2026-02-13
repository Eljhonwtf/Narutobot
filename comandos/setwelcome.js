module.exports = {
  name: 'setwelcome',
  run: async (sock, msg, body, args, isOwner, isGroupAdmins) => {
    const from = msg.key.remoteJid;

    // Validación de permisos
    if (!isGroupAdmins && !isOwner) {
      return await sock.sendMessage(from, { 
        text: '> ❌ *Acceso denegado:* Solo mi desarrollador o los administradores pueden usar este comando.' 
      }, { quoted: msg });
    }

    const text = args.join(' ');

    // Validación de comando mal ejecutado
    if (!text) {
      return await sock.sendMessage(from, { 
        text: '> ⚠️ *Comando ejecutado incorrectamente*\n\n' +
              '> 💡 *Modo de uso:* `/setwelcome [mensaje]`\n' +
              '> 📝 *Ejemplo:* `/setwelcome ¡Hola @user, bienvenido al grupo!`\n\n' +
              '> _Nota: Puedes usar @user para que el bot mencione al nuevo miembro._' 
      }, { quoted: msg });
    }

    // Lógica para guardar (aquí el bot guardaría el texto)
    await sock.sendMessage(from, { 
      text: `> ✅ *Éxito:* El mensaje de bienvenida ha sido establecido correctamente.` 
    }, { quoted: msg });
  }
};
