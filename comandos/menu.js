const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'menu',
  run: async (sock, msg, body, args, isOwner) => {
    const from = msg.key.remoteJid;
    const pushName = msg.pushName || 'Usuario';

    // ==========================================
    // 1. LÓGICA DEL SISTEMA (Stats & Uptime)
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

    // ==========================================
    // 2. CONFIGURACIÓN MULTIMEDIA
    // ==========================================
    const gifUrl = "https://files.catbox.moe/gkfjku.mp4"; // Tu video MP4
    const thumbUrl = "https://w0.peakpx.com/wallpaper/211/68/HD-wallpaper-naruto-kyuubi-mode-naruto-anime-artist-artwork-digital-art.jpg"; // Tu imagen JPG

    // ==========================================
    // 3. DISEÑO DEL MENÚ (Texto & Comandos)
    // ==========================================
    
    // Encabezado
    let menuTxt = `✨ *ミ★ 𝘕𝘈𝘙𝘜𝘛𝘖𝘉𝘖𝘛 𝘊𝘖𝘙𝘌 ★彡* ✨\n`;
    menuTxt += `  ╭───────────────┈\n`;
    menuTxt += `  │ 𝑯𝒐𝒍𝒂 *${pushName}* 👋\n`;
    menuTxt += `  ╰───────────────┈\n\n`;

    // Stats del Sistema
    menuTxt += `┌──『 📊 *𝒔𝒕𝒂𝒕𝒔* 』\n`;
    menuTxt += `│ 📂 Total: ${totalComandos} archivos\n`;
    menuTxt += `│ ⏱️ Activo: ${hrs}h ${mins}m\n`;
    menuTxt += `│ ⚡ Estado: Online\n`;
    menuTxt += `└─────────────────────────\n\n`;

    // Inventario de Comandos (Tus 32 comandos)
    const listaComandos = [
      "IA", "admins", "antilink", "autodm", "bc", "bug", "delete", "demote",
      "doxeo", "ext", "fix", "info", "infogp", "join", "kick", "link",
      "listcm", "listgp", "menu", "out", "perfil", "ping", "ppt", "promote",
      "resetlink", "setdesc", "setname", "tagall", "tiktok", "tr", "unreg", "update"
    ];

    menuTxt += `┌──『 🛠️ *𝒊𝒏𝒗𝒆𝒏𝒕𝒂𝒓𝒊𝒐* 』\n`;
    listaComandos.forEach((cmd, index) => {
      menuTxt += `│ ${index + 1}. /${cmd}\n`;
    });
    menuTxt += `└─────────────────────────\n\n`;

    // Pie de página
    menuTxt += `🚀 *𝒔𝒚𝒔𝒕𝒆𝒎:* Escaneo completado.\n`;
    menuTxt += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

    // ==========================================
    // 4. EJECUCIÓN DEL ENVÍO (WhatsApp)
    // ==========================================
    try {
      await sock.sendMessage(from, {
        video: { url: gifUrl },
        caption: menuTxt,
        gifPlayback: true,
        contextInfo: {
          externalAdReply: {
            title: "☄️ 𝘕𝘢𝘳𝘶𝘵𝘰𝘣𝘰𝘵 𝘚𝘺𝘴𝘵𝘦𝘮 ☄️",
            body: "Jhxxn🏌️‍♂️ - Edition Limited",
            mediaType: 1,
            renderLargerThumbnail: true,
            thumbnailUrl: thumbUrl,
            sourceUrl: "https://github.com/Eljhonwtf/Narutobot"
          },
          mentionedJid: [msg.key.participant || from]
        }
      }, { quoted: msg });

    } catch (error) {
      console.log("❌ Error enviando menú:", error);
      // Plan de respaldo si falla el video
      await sock.sendMessage(from, { text: menuTxt }, { quoted: msg });
    }
  }
};
