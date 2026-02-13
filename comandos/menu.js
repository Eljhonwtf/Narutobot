const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'menu',
  run: async (sock, msg, body, args, isOwner) => {
    const from = msg.key.remoteJid;
    const pushName = msg.pushName || 'Usuario';

    // --- Lógica del Sistema ---
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

    // ✅ RECURSO MP4
    const videoUrl = "https://files.catbox.moe/gkfjku.mp4"; 

        // --- DISEÑO DE MENÚ: ELITE SYSTEM 2026 ---
    
    const fecha = new Date().toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });

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

    menuTxt += `💡 *Instrucción:* Utilice los comandos listados abajo anteponiendo cualquier prefijo configurado.\n`;




    // SECCIÓN: GESTIÓN GRUPAL

    menuTxt += `*『 🛠️ 𝐆𝐄𝐒𝐓𝐈Ó𝐍 𝐆𝐑𝐔𝐏𝐀𝐋 』*\n`;
    const adminCmds = [
      ['admins', ' Mencionar staff'], ['kick', 'Remover usuario'], 
      ['promote', 'Dar admin'], ['demote', 'Quitar admin'],
      ['tagall', 'Mención total'], ['antilink', 'Seguridad link'],
      ['infogp', 'Info del grupo'], ['link', 'Enlace del grupo'],
      ['resetlink', 'Revocar enlace'], ['setname', 'Cambiar nombre'],
      ['setdesc', 'Cambiar descripción'], ['out', 'Bot sale del grupo']
    ];
    
    // 👇 AQUÍ ESTÁ EL CAMBIO
    adminCmds.forEach(([cmd, desc]) => {
      menuTxt += `⬡ */${cmd}*\n> ${desc}\n`; // Se agregó el ">" antes de la descripción
    });

    // SECCIÓN: UTILIDADES Y CONFIGURACIÓN
    menuTxt += `\n*『 ⚙️ 𝐔𝐓𝐈𝐋𝐈𝐃𝐀𝐃𝐄𝐒 』*\n`;
    const utilCmds = [
      ['ping', 'Velocidad del bot'], ['info', 'Info del sistema'],
      ['perfil', 'Mis datos'], ['update', 'Actualizar bot'],
      ['listgp', 'Lista de grupos'], ['listcm', 'Lista comandos'],
      ['fix', 'Reparar errores'], ['delete', 'Borrar mensajes'],
      ['tr', 'Traductor de texto'], ['unreg', 'Anular registro'],
      ['ext', 'Extraer datos'], ['join', 'Unirse vía link']
    ];
    
    // 👇 AQUÍ TAMBIÉN
    utilCmds.forEach(([cmd, desc]) => {
      menuTxt += `⬡ */${cmd}*\n> ${desc}\n`; 
    });

    // SECCIÓN: ENTRETENIMIENTO Y OTROS
    menuTxt += `\n*『 🎭 𝐄𝐍𝐓𝐑𝐄𝐓𝐄𝐍𝐈𝐌𝐈𝐄𝐍𝐓𝐎 』*\n`;
    const funCmds = [
      ['tiktok', 'Descargar videos'], ['ppt', 'Piedra, papel o tijera'],
      ['doxeo', 'Simular doxeo'], ['bc', 'Difusión (Broadcast)'],
      ['autodm', 'Mensaje directo auto'], ['bug', 'Reportar errores']
    ];
    
    // 👇 Y AQUÍ
    funCmds.forEach(([cmd, desc]) => {
      menuTxt += `⬡ */${cmd}*\n> ${desc}\n`; 
    });

    menuTxt += `\n_“El juicio ha comenzado por orden de **Obito**.”_\n`;
    menuTxt += `*© 2026 Anubis Core*`;

    // --- ENVÍO ---
    try {
      await sock.sendMessage(from, {
        video: { url: videoUrl },
        caption: menuTxt,
        gifPlayback: true,
        contextInfo: {
          mentionedJid: [msg.key.participant || from]
        }
      }, { quoted: msg });
    } catch (error) {
      console.log("❌ Error en el envío:", error);
      await sock.sendMessage(from, { text: menuTxt }, { quoted: msg });
    }
  }
};
