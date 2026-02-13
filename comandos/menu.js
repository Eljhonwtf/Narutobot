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

    // --- DISEÑO DE MENÚ ESTILO PROFESIONAL ---
    let menuTxt = `╔════════════════════╗\n`;
    menuTxt += `     ◈  *𝐀𝐍𝐔𝐁𝐈𝐒 - 𝐒𝐘𝐒𝐓𝐄𝐌* ◈\n`;
    menuTxt += `╚════════════════════╝\n\n`;

    menuTxt += `👋 ¡Hola, *${pushName}*!\n\n`;

    menuTxt += `┌───〔 🛡️ *𝐄𝐒𝐓𝐀𝐃𝐎* 〕───\n`;
    menuTxt += `│ 👤 *Owner:* Obito\n`;
    menuTxt += `│ ⏱️ *Activo:* ${hrs}h ${mins}m\n`;
    menuTxt += `│ 🧬 *Cmds:* ${totalComandos}\n`;
    menuTxt += `└─────────────────────────\n\n`;

    // SECCIÓN: GESTIÓN GRUPAL
    menuTxt += `*『 🛠️ 𝐆𝐄𝐒𝐓𝐈Ó𝐍 𝐆𝐑𝐔𝐏𝐀𝐋 』*\n`;
    const adminCmds = [
      ['admins' '> Mencionar staff'], ['kick', 'Remover usuario'], 
      ['promote', 'Dar admin'], ['demote', 'Quitar admin'],
      ['tagall', 'Mención total'], ['antilink', 'Seguridad link'],
      ['infogp', 'Info del grupo'], ['link', 'Enlace del grupo'],
      ['resetlink', 'Revocar enlace'], ['setname', 'Cambiar nombre'],
      ['setdesc', 'Cambiar descripción'], ['out', 'Bot sale del grupo']
    ];
    adminCmds.forEach(([cmd, desc]) => {
      menuTxt += `⬡ */${cmd}*\n│ ${desc}\n`;
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
    utilCmds.forEach(([cmd, desc]) => {
      menuTxt += `⬡ */${cmd}*\n│ ${desc}\n`;
    });

    // SECCIÓN: ENTRETENIMIENTO Y OTROS
    menuTxt += `\n*『 🎭 𝐄𝐍𝐓𝐑𝐄𝐓𝐄𝐍𝐈𝐌𝐈𝐄𝐍𝐓𝐎 』*\n`;
    const funCmds = [
      ['tiktok', 'Descargar videos'], ['ppt', 'Piedra, papel o tijera'],
      ['doxeo', 'Simular doxeo'], ['bc', 'Difusión (Broadcast)'],
      ['autodm', 'Mensaje directo auto'], ['bug', 'Reportar errores']
    ];
    funCmds.forEach(([cmd, desc]) => {
      menuTxt += `⬡ */${cmd}*\n│ ${desc}\n`;
    });

    menuTxt += `\n_“El juicio ha comenzado por orden de **Obito**.”_\n`;
    menuTxt += `*© 2026 Anubis Core*`;

    // --- ENVÍO PURAMENTE VIDEO ---
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
