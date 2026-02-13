const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'menu',
  run: async (sock, msg, body, args, isOwner) => {
    const from = msg.key.remoteJid;
    const pushName = msg.pushName || 'Usuario';

    // ==========================================
    //       LISTADO DE COMANDOS (EDITA AQUÍ)
    // ==========================================

    const adminCmds = [
      { cmd: 'group open/close', desc: 'Abrir o cerrar el chat para participantes' },
      { cmd: 'antifake on/off',  desc: 'Expulsar prefijos extranjeros automáticamente' },
      { cmd: 'hidetag',          desc: 'Mencionar a todos los miembros (notificación)' },
      { cmd: 'setmsg welcome',   desc: 'Configurar mensaje de bienvenida' },
      { cmd: 'setmsg bye',       desc: 'Configurar mensaje de despedida' },
      { cmd: 'admins',           desc: 'Mencionar a los administradores' },
      { cmd: 'kick',             desc: 'Eliminar a un usuario del grupo' },
      { cmd: 'promote',          desc: 'Dar administrador a un usuario' },
      { cmd: 'demote',           desc: 'Quitar administrador a un usuario' },
      { cmd: 'tagall',           desc: 'Mención grupal visible' },
      { cmd: 'antilink',         desc: 'Seguridad de enlaces (Auto-kick)' },
      { cmd: 'infogp',           desc: 'Información detallada del grupo' },
      { cmd: 'link',             desc: 'Obtener enlace de invitación' },
      { cmd: 'resetlink',        desc: 'Restablecer enlace del grupo' },
      { cmd: 'setname',          desc: 'Cambiar nombre del grupo' },
      { cmd: 'setdesc',          desc: 'Cambiar descripción del grupo' },
      { cmd: 'out',              desc: 'Uso exclusivo del desarrollador' }
    ];

    const utilCmds = [
      { cmd: 'ping',     desc: 'Velocidad de respuesta del bot' },
      { cmd: 'info',     desc: 'Información técnica del sistema' },
      { cmd: 'perfil',   desc: 'Ver mi perfil de usuario' },
      { cmd: 'update',   desc: 'Uso exclusivo del desarrollador' },
      { cmd: 'listgp',   desc: 'Lista de grupos vinculados' },
      { cmd: 'listcm',   desc: 'Uso exclusivo del desarrollador' },
      { cmd: 'fix',      desc: 'Reparar errores de sesión' },
      { cmd: 'delete',   desc: 'Borrar mensajes (requiere admin)' },
      { cmd: 'tr',       desc: 'Traductor de mensajes' },
      { cmd: 'unreg',    desc: 'Anular registro del sistema' },
      { cmd: 'ext',      desc: 'Uso exclusivo del desarrollador' },
      { cmd: 'join',     desc: 'Unirse a un grupo vía enlace' }
    ];

    const funCmds = [
      { cmd: 'tiktok',   desc: 'Descargar videos sin marca de agua' },
      { cmd: 'ppt',      desc: 'Juego de piedra, papel o tijera' },
      { cmd: 'doxeo',    desc: 'Simulación de rastreo (Broma)' },
      { cmd: 'bc',       desc: 'Difusión de mensaje global' },
      { cmd: 'autodm',   desc: 'Acceso directo al desarrollador' },
      { cmd: 'bug',      desc: 'Reportar fallos en el sistema' }
    ];

    // ==========================================
    //           LÓGICA DEL SISTEMA
    // ==========================================

    const contarComandos = (dir) => {
      let total = 0;
      if (!fs.existsSync(dir)) return 0;
      const archivos = fs.readdirSync(dir);
      for (const archivo of archivos) {
        const ruta = path.join(dir, archivo);
        if (fs.statSync(ruta).isDirectory()) {
          total += contarComandos(ruta);
        } else if (archivo.endsWith('.js')) {
          total++;
        }
      }
      return total;
    };

    const totalComandos = contarComandos(path.join(__dirname, '../comandos'));
    const uptime = process.uptime();
    const hrs = Math.floor(uptime / 3600);
    const mins = Math.floor((uptime % 3600) / 60);
    const fecha = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
    const videoUrl = "https://files.catbox.moe/gkfjku.mp4"; 

    // ==========================================
    //           CONSTRUCCIÓN DEL MENÚ
    // ==========================================

    let menuTxt = `『 💻 *𝐍𝐀𝐑𝐔𝐓𝐎𝐁𝐎𝐓 - 𝐎𝐏𝐄𝐑𝐀𝐓𝐈𝐕𝐄 𝐒𝐘𝐒𝐓𝐄𝐌* 』\n`;
    menuTxt += ` 🛡️  ᴀᴅᴠᴀɴᴄᴇᴅ  ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ  ɪɴᴛᴇʀꜰᴀᴄᴇ\n`;
    menuTxt += `▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n`;

    menuTxt += `👋 Estimado/a *${pushName}*,\n`;
    menuTxt += `> Conexión establecida con éxito. El sistema está a su disposición.\n\n`;

    menuTxt += `┏━━━〔 📂 *𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈Ó𝐍 𝐃𝐄𝐋 𝐒𝐄𝐑𝐕𝐈𝐃𝐎𝐑* 〕━━━\n`;
    menuTxt += `┃ 👑 **Desarrollador:** Obito\n`;
    menuTxt += `┃ 📟 **Identificador:** Narutobot v4.0\n`;
    menuTxt += `┃ 🌐 **Modo:** Multi-Prefijo (Global)\n`;
    menuTxt += `┃ ⚡ **Estado:** Operativo / Online\n`;
    menuTxt += `┃ ⏳ **Uptime:** ${hrs}h ${mins}m\n`;
    menuTxt += `┃ 📊 **Módulos:** ${totalComandos} Cargados\n`;
    menuTxt += `┃ 📅 **Fecha:** ${fecha}\n`;
    menuTxt += `┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    menuTxt += `💡 *Instrucción:* Utilice los comandos listados abajo anteponiendo cualquier prefijo configurado.\n\n`;

    // Renderizar Categoría: GESTIÓN
    menuTxt += `*『 🛠️ 𝐆𝐄𝐒𝐓𝐈Ó𝐍 𝐆𝐑𝐔𝐏𝐀𝐋 』*\n`;
    adminCmds.forEach(c => {
      menuTxt += `⬡ */${c.cmd}*\n> ${c.desc}\n`;
    });

    // Renderizar Categoría: UTILIDADES
    menuTxt += `\n*『 ⚙️ 𝐔𝐓𝐈𝐋𝐈𝐃𝐀𝐃𝐄𝐒 』*\n`;
    utilCmds.forEach(c => {
      menuTxt += `⬡ */${c.cmd}*\n> ${c.desc}\n`;
    });

    // Renderizar Categoría: ENTRETENIMIENTO
    menuTxt += `\n*『 🎭 𝐄𝐍𝐓𝐑𝐄𝐓𝐄𝐍𝐈𝐌𝐈𝐄𝐍𝐓𝐎 』*\n`;
    funCmds.forEach(c => {
      menuTxt += `⬡ */${c.cmd}*\n> ${c.desc}\n`;
    });

    menuTxt += `\n_“El renacimiento de AkiraBot.”_\n`;
    menuTxt += `*© 2026 Narutobot Core*`;

    // ==========================================
    //                ENVÍO (PUSH)
    // ==========================================

    try {
      await sock.sendMessage(from, {
        video: { url: videoUrl },
        caption: menuTxt,
        gifPlayback: true,
        contextInfo: { mentionedJid: [msg.key.participant || from] }
      }, { quoted: msg });
    } catch (error) {
      console.log("❌ Error en el envío:", error);
      await sock.sendMessage(from, { text: menuTxt }, { quoted: msg });
    }
  }
};
