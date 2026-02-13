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
      { cmd: 'admins',    desc: 'Mencionar al staff' },
      { cmd: 'kick',      desc: 'Remover usuario' },
      { cmd: 'promote',   desc: 'Dar administrador' },
      { cmd: 'demote',    desc: 'Quitar administrador' },
      { cmd: 'tagall',    desc: 'Mención total' },
      { cmd: 'antilink',  desc: 'Seguridad de enlaces' },
      { cmd: 'infogp',    desc: 'Información del grupo' },
      { cmd: 'link',      desc: 'Enlace del grupo' },
      { cmd: 'resetlink', desc: 'Revocar enlace' },
      { cmd: 'setname',   desc: 'Cambiar nombre' },
      { cmd: 'setdesc',   desc: 'Cambiar descripción' },
      { cmd: 'out',       desc: 'Bot abandona el grupo' }
    ];

    const utilCmds = [
      { cmd: 'ping',     desc: 'Velocidad del bot' },
      { cmd: 'info',     desc: 'Información del sistema' },
      { cmd: 'perfil',   desc: 'Mis datos personales' },
      { cmd: 'update',   desc: 'Actualizar sistema' },
      { cmd: 'listgp',   desc: 'Lista de grupos' },
      { cmd: 'listcm',   desc: 'Lista de comandos' },
      { cmd: 'fix',      desc: 'Reparar errores' },
      { cmd: 'delete',   desc: 'Borrar mensajes' },
      { cmd: 'tr',       desc: 'Traductor de texto' },
      { cmd: 'unreg',    desc: 'Anular registro' },
      { cmd: 'ext',      desc: 'Extraer datos' },
      { cmd: 'join',     desc: 'Unirse vía enlace' }
    ];

    const funCmds = [
      { cmd: 'tiktok',   desc: 'Descargar videos' },
      { cmd: 'ppt',      desc: 'Piedra, papel o tijera' },
      { cmd: 'doxeo',    desc: 'Simular rastreo' },
      { cmd: 'bc',       desc: 'Difusión global' },
      { cmd: 'autodm',   desc: 'Mensaje directo automático' },
      { cmd: 'bug',      desc: 'Reportar fallos' }
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

    menuTxt += `\n_“El sistema ha sido verificado por **Obito**.”_\n`;
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
