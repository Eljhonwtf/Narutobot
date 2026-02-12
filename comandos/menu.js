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

    // ✅ RECURSO MP4 (Anubis)
    const videoUrl = "https://files.catbox.moe/gkfjku.mp4"; 

    // --- DISEÑO DE MENÚ PROFESIONAL ---
    let menuTxt = `  ╔════════════════════╗\n`;
    menuTxt += `     ◈  *𝐀𝐍𝐔𝐁𝐈𝐒 - 𝐒𝐘𝐒𝐓𝐄𝐌* ◈\n`;
    menuTxt += `  ╚════════════════════╝\n\n`;

    menuTxt += `  👋 ¡Hola, *${pushName}*!\n`;
    menuTxt += `  Soy el guardián de tus chats.\n\n`;

    menuTxt += `┌───〔 🛡️ *𝐄𝐒𝐓𝐀𝐃𝐎 𝐃𝐄𝐋 𝐁𝐎𝐓* 〕───\n`;
    menuTxt += `│ 👤 *Owner:* Obito\n`;
    menuTxt += `│ 🤖 *Nombre:* Anubis\n`;
    menuTxt += `│ ⏱️ *Uptime:* ${hrs}h ${mins}m\n`;
    menuTxt += `│ 🧬 *Total Cmds:* ${totalComandos}\n`;
    menuTxt += `└─────────────────────────\n\n`;

    // SECCIÓN: ADMINISTRACIÓN
    menuTxt += `┏━━〔 🛠️ *𝐆𝐄𝐒𝐓𝐈Ó𝐍 𝐆𝐑𝐔𝐏𝐀𝐋* 〕━━┓\n`;
    const adminCmds = [['admins', 'Tag Staff'], ['kick', 'Eliminar'], ['tagall', 'Mencionar'], ['antilink', 'Seguridad']];
    adminCmds.forEach(([cmd, desc]) => {
      menuTxt += `┃ ⬡ /${cmd.padEnd(10)} ⮕ ${desc}\n`;
    });
    menuTxt += `┗━━━━━━━━━━━━━━━━━━━━━━┛\n\n`;

    // SECCIÓN: UTILIDADES
    menuTxt += `┏━━〔 ⚙️ *𝐇𝐄𝐑𝐑𝐀𝐌𝐈𝐄𝐍𝐓𝐀𝐒* 〕━━┓\n`;
    const utilCmds = [['ping', 'MS Latencia'], ['ia', 'Asistente AI'], ['perfil', 'Tus Datos'], ['update', 'Sincronizar']];
    utilCmds.forEach(([cmd, desc]) => {
      menuTxt += `┃ ⬡ /${cmd.padEnd(10)} ⮕ ${desc}\n`;
    });
    menuTxt += `┗━━━━━━━━━━━━━━━━━━━━━━┛\n\n`;

    menuTxt += `_“El juicio ha comenzado por orden de **Obito**.”_\n`;
    menuTxt += `*© 2026 Anubis Core System*`;

    // --- ENVÍO EXCLUSIVO DE VIDEO ---
    try {
      await sock.sendMessage(from, {
        video: { url: videoUrl },
        caption: menuTxt,
        gifPlayback: true, // Se reproduce automáticamente
        contextInfo: {
          // Se eliminó externalAdReply para quitar cualquier miniatura o link externo
          mentionedJid: [msg.key.participant || from]
        }
      }, { quoted: msg });
    } catch (error) {
      console.log("❌ Error al enviar el video:", error);
      await sock.sendMessage(from, { text: menuTxt }, { quoted: msg });
    }
  }
};
