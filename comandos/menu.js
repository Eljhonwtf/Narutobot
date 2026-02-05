const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'menu',
  run: async (sock, msg, body, args, isOwner) => {
    const from = msg.key.remoteJid;
    const pushName = msg.pushName || 'Usuario';

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

    // --- DISEÑO ESTILO GATA-LIKE (NARUTOBOT) ---
    let menuTxt = `┏━━━━━━━━━━━━━━━━━━━━━┓\n`;
    menuTxt += `┃  ✨ *ミ★ 𝘕𝘈𝘙𝘜𝘛𝘖𝘉𝘖𝘛 𝘔𝘋 ★彡* ✨\n`;
    menuTxt += `┗━━━━━━━━━━━━━━━━━━━━━┛\n\n`;

    menuTxt += `╭───〔 🍥 *𝑼𝑺𝑼𝑨𝑹𝑰𝑶* 🍥 〕───┈\n`;
    menuTxt += `┋ 👤 *𝖧𝗈𝗅𝖺:* ${pushName}\n`;
    menuTxt += `┋ 🌀 *𝖤𝗌𝗍𝖺𝖽𝗈:* 𝖮𝗇𝗅𝗂𝗇𝖾\n`;
    menuTxt += `┋ 📜 *𝖫𝖾𝗀𝖺𝖽𝗈:* 𝖵𝗈𝗅𝗎𝗇𝗍𝖺𝖽 𝖽𝖾 𝖥𝗎𝖾𝗀𝗈\n`;
    menuTxt += `╰─────────────────────┈\n\n`;

    menuTxt += `╭───〔 🛸 *𝖨𝖭𝖥𝖮 𝖲𝖨𝖲𝖳𝖤𝖬𝖠* 〕───┈\n`;
    menuTxt += `┋ 💎 *𝖡𝗈𝗍:* Narutobot Multi\n`;
    menuTxt += `┋ 👤 *𝖣𝗎𝖾𝗇̃𝗈:* Jhxxn🏌️‍♂️\n`;
    menuTxt += `┋ ⏱️ *𝖠𝖼𝗍𝗂𝗏𝗈:* ${hrs}𝗁 ${mins}𝗆\n`;
    menuTxt += `┋ 🧬 *𝖢𝗈𝗆𝖺𝗇𝖽𝗈𝗌:* ${totalComandos}\n`;
    menuTxt += `┋ 🇻🇪 *𝖯𝖺𝗂𝗌:* Venezuela\n`;
    menuTxt += `╰━━━━━━━━━━━━━━━━━━━━━┈\n\n`;

    // --- SECCIÓN: ADMINISTRACIÓN ---
    menuTxt += `╭━━〔 🛡️ *𝖠𝖣𝖬𝖨𝖲𝖳𝖱𝖠𝖢𝖨𝖮𝖭* 〕━━┈\n`;
    const adminCmds = [
      ['admins', 'Mencionar staff'],
      ['kick', 'Remover usuario'],
      ['tagall', 'Mención total'],
      ['antilink', 'Seguridad link']
    ];
    adminCmds.forEach(([cmd, desc]) => {
      menuTxt += `┋ ❒ */${cmd}*\n┋ ↳ _${desc}_\n`;
    });
    menuTxt += `╰━━━━━━━━━━━━━━━━━━━━━┈\n\n`;

    // --- SECCIÓN: UTILIDADES ---
    menuTxt += `╭━━〔 ⚙️ *𝖴𝖳𝖨𝖫𝖨𝖣𝖠𝖣𝖤𝖲* 〕━━┈\n`;
    const utilCmds = [
      ['ping', 'Velocidad bot'],
      ['ia', 'Cerebro IA'],
      ['perfil', 'Mis datos'],
      ['update', 'Actualizar']
    ];
    utilCmds.forEach(([cmd, desc]) => {
      menuTxt += `┋ ❒ */${cmd}*\n┋ ↳ _${desc}_\n`;
    });
    menuTxt += `╰━━━━━━━━━━━━━━━━━━━━━┈\n\n`;

    // --- SECCIÓN: ZONA MIX ---
    menuTxt += `╭━━〔 🎮 *𝖹𝖮𝖭𝖠 𝖬𝖨𝖷* 〕━━┈\n`;
    const mixCmds = [
      ['tiktok', 'Videos HD'],
      ['doxeo', 'Fake Tracker'],
      ['bug', 'Reportar fallo']
    ];
    mixCmds.forEach(([cmd, desc]) => {
      menuTxt += `┋ ❒ */${cmd}*\n┋ ↳ _${desc}_\n`;
    });
    menuTxt += `╰━━━━━━━━━━━━━━━━━━━━━┈\n\n`;

    menuTxt += `> 🍥 *© 𝖩𝗁𝗈𝗇 𝖦𝗎𝖾𝗋𝗋𝖺 | 𝖭𝖺𝗋𝗎𝗍𝗈𝖡ο𝗍 𝖢𝗈𝗋𝖾*`;

    await sock.sendMessage(from, {
      text: menuTxt,
      contextInfo: {
        externalAdReply: {
          title: "🚀 𝘕𝘈𝘙𝘜𝘛𝘖𝘉𝘖𝘛 𝘔𝘋 2026 🚀",
          body: "𝐽ℎ𝑥𝑛𝑛 🏌️‍♂️ - 𝐸𝑑𝑖𝑡𝑖𝑜𝑛 𝐿𝑖𝑚𝑖𝑡𝑒𝑑",
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
