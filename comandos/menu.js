const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'menu',
  run: async (sock, msg, body, args, isOwner) => {
    const from = msg.key.remoteJid;
    const pushName = msg.pushName || 'Usuario';

    // --- Lógica de Comandos y Uptime ---
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
    const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

    // --- DISEÑO INSPIRADO EN MENÚS DINÁMICOS ---
    let menuTxt = `✨ *ミ★ 𝘕𝘈𝘙𝘜𝘛𝘖𝘉𝘖𝘛 𝘊𝘖𝘙𝘌 ★彡* ✨\n\n`;
    
    menuTxt += `  𝑯𝒐𝒍𝒂 *${pushName}*, 𝒃𝒊𝒆𝒏𝒗𝒆𝒏𝒊𝒅𝒐 𝒂 𝒍𝒂\n  𝒊𝒏𝒇𝒐𝒓𝒎𝒂𝒄𝒊ó𝒏 𝒅𝒆𝒍 𝒃𝒐𝒕, 𝒆𝒔𝒑𝒆𝒓𝒐 𝒕𝒆 𝒈𝒖𝒔𝒕𝒆. ✨\n\n`;

    menuTxt += `╭━━〔 🛸 *𝗜𝗡𝗙𝗢 𝗗𝗘𝗟 𝗦𝗜𝗦𝗧𝗘𝗠𝗔* 🛸 〕━━┈\n`;
    menuTxt += `┃ 💎 *𝖡𝗈𝗍:* Narutobot Multi\n`;
    menuTxt += `┃ 👤 *𝖣𝗎𝖾𝗇̃𝗈:* Jhxxn🏌️‍♂️\n`;
    menuTxt += `┃ ⏱️ *𝖠𝖼𝗍𝗂𝗏𝗈:* ${hrs}𝗁 ${mins}𝗆\n`;
    menuTxt += `┃ 🧬 *𝖢𝗈𝗆𝖺𝗇𝖽𝗈𝗌:* ${totalComandos}\n`;
    menuTxt += `┃ 🇻🇪 *𝖯𝖺𝗂𝗌:* Venezuela\n`;
    menuTxt += `╰━━━━━━━━━━━━━━━━━━━━┈\n\n`;

    // --- SECCIONES CON DISEÑO CARGADO ---
    
    // ADMINISTRACIÓN
    menuTxt += `╔═════ೋ ⚙️ ೋ═════╗\n`;
    menuTxt += `    *𝖠𝖣𝖬𝖨𝖲𝖳𝖱𝖠𝖢𝖨𝖮𝖭*\n`;
    menuTxt += `╚═════ೋ ⚙️ ೋ═════╝\n`;
    const adminCmds = [['admins', 'Mencionar Staff.'], ['kick', 'Remover usuario.'], ['tagall', 'Mención total.'], ['antilink', 'Seguridad link.']];
    adminCmds.forEach(([cmd, desc]) => {
      menuTxt += `🚀 */${cmd}*\n> ${desc}\n\n`;
    });

    // UTILIDADES
    menuTxt += `╔═════ೋ 🛠️ ೋ═════╗\n`;
    menuTxt += `    *𝖴𝖳𝖨𝖫𝖨𝖣𝖠𝖣𝖤𝖲*\n`;
    menuTxt += `╚═════ೋ 🛠️ ೋ═════╝\n`;
    const utilCmds = [['ping', 'Velocidad bot.'], ['ia', 'Cerebro IA.'], ['perfil', 'Mis datos.'], ['update', 'Actualizar.']];
    utilCmds.forEach(([cmd, desc]) => {
      menuTxt += `⭐ */${cmd}*\n> ${desc}\n\n`;
    });

    // MIX
    menuTxt += `╔═════ೋ 🎮 ೋ═════╗\n`;
    menuTxt += `       *𝖹𝖮𝖭𝖠 𝖬𝖨𝖿*\n`;
    menuTxt += `╚═════ೋ 🎮 ೋ═════╝\n`;
    const mixCmds = [['tiktok', 'Videos HD.'], ['doxeo', 'Fake IP Tracker.'], ['bug', 'Reportar fallo.']];
    mixCmds.forEach(([cmd, desc]) => {
      menuTxt += `🔥 */${cmd}*\n> ${desc}\n\n`;
    });

    menuTxt += `✨ *𝘗𝘰𝘸𝘦𝘳𝘦𝘥 𝘣𝘺 𝘑𝘩𝘰𝘯 𝘎𝘶𝘦𝘳𝘳𝘢* ✨\n`;
    menuTxt += `║▌│█║▌│ █║▌│█│║▌║`;

    await sock.sendMessage(from, {
      text: menuTxt,
      contextInfo: {
        externalAdReply: {
          title: "☄️ 𝘕𝘢𝘳𝘶𝘵𝘰𝘣𝘰𝘵 𝘚𝘺𝘴𝘵𝘦𝘮 ☄️",
          body: "Jhxxn🏌️‍♂️ - Official Dev",
          mediaType: 1,
          renderLargerThumbnail: true,
          thumbnailUrl: thumbUrl,
          sourceUrl: "https://github.com/jhonsystem"
        },
        mentionedJid: [msg.key.participant || from]
      }
    }, { quoted: msg });
  }
};
