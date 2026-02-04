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
    const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

    let menuTxt = `🏌️‍♂️ *𝐼𝑁𝐹𝑂𝑅𝑀𝐴𝐶𝐼𝑂𝑁 𝐷𝐸𝐿 𝐵𝑂𝑇* 🏌️‍♂️\n\n`;
    menuTxt += `𝐻𝑜𝑙𝑎 𝑏𝑖𝑒𝑛𝑣𝑒𝑛𝑖𝑑𝑜 ${pushName} 𝑎𝑐𝑎 𝑡𝑒 𝑑𝑑𝑗𝑜 𝑙𝑎 𝑖𝑛𝑓𝑟𝑜𝑚𝑎𝑐𝑖𝑜𝑛 𝑑𝑒𝑙 𝑏𝑜𝑡😊\n`;
    menuTxt += `🇻🇪 *𝒱𝑒𝓃𝑒𝓏𝓊𝑒𝓁𝒶* | ${totalComandos} 𝒸𝑜𝓂𝒶𝓃𝒹𝑜𝓈 | ⚡ *𝐄𝐬𝐭𝐚𝐝𝐨:* 🟢 𝒪𝓃𝓁𝒾𝓃𝑒 🚀\n\n`;

    // ADMIN - SIN ESPACIOS EXTRAS
    menuTxt += `🔧 *𝐀𝐃𝐌𝐈𝐍𝐈𝐒𝐓𝐑𝐀𝐂𝐈𝐎𝐍* 👑\n`;
    menuTxt += `/admins
 > 𝑀𝑒𝓃𝒸𝒾𝑜𝓃𝒶𝓇 𝒶𝒹𝓂𝒾𝓃𝓈\n`;
    menuTxt += `/antilink
 > 𝒜𝒸𝓉𝒾𝓋𝒶𝓇 𝒶𝓃𝓉𝒾-𝑒𝓃𝓁𝒶𝒸𝑒𝓈\n`;
    menuTxt += `/kick
 > 𝐸𝓁𝒾𝓂𝒾𝓃𝒶𝓇 𝓊𝓈𝓊𝒶𝓇𝒾𝑜\n`;
    menuTxt += `/add > 𝒜𝑔𝓇𝑒𝑔𝒶𝓇 𝓊𝓈𝓊𝒶𝓇𝒾𝑜\n`;
    menuTxt += `/promote > 𝐷𝒶𝓇 𝒶𝒹𝓂𝒾𝓃\n`;
    menuTxt += `/demote > 𝒬𝓊𝒾𝓉𝒶𝓇 𝒶𝒹𝓂𝒾𝓃\n`;
    menuTxt += `/tagall > 𝑀𝑒𝓃𝒸𝒾𝑜𝓃𝒶𝓇 𝓉𝑜𝒹𝑜𝓈\n`;
    menuTxt += `/hidetag > 𝑀𝑒𝓃𝒸𝒾𝑜́𝓃 𝒾𝓃𝓋𝒾𝓈𝒾𝒷𝓁𝑒\n`;
    menuTxt += `/delete > 𝐵𝑜𝓇𝓇𝒶𝓇 𝓂𝑒𝓃𝓈𝒶𝒷𝑒\n`;
    menuTxt += `/resetlink > 𝒩𝓊𝑒𝓋𝑜 𝑒𝓃𝓁𝒶𝒸𝑒\n`;
    menuTxt += `/link > Obtener 𝑒𝓃𝓁𝒶𝒸𝑒\n`;
    menuTxt += `/setname > Cambiar 𝓃𝑜𝓂𝒷𝓇𝑒\n`;
    menuTxt += `/setdesc > Cambiar 𝒹𝑒𝓈𝒸𝓇𝒾𝓅𝒸𝒾𝑜́𝓃\n`;
    menuTxt += `/infogp > 𝐼𝓃𝒻𝑜𝓇𝓂𝒶𝓇𝒾𝑜́𝓃 𝑔𝓇𝓊𝓅𝑜\n`;
    menuTxt += `/join > Bot 𝓈𝑒 𝓊𝓃𝑒\n`;
    menuTxt += `/out > Bot 𝓈𝒶𝓁𝑒\n\n`;

    // UTILIDADES - SIN ESPACIOS
    menuTxt += `⚙️ *𝒰𝓉𝒾𝓁𝒾𝒹𝒶𝒹𝑒𝓈* 🛠️\n`;
    menuTxt += `/ping > 𝒱𝑒𝓁𝑜𝒸𝒾𝒹𝒶𝒹 𝓇𝑒𝓈𝓅𝓊𝑒𝓈𝓉𝒶\n`;
    menuTxt += `/ia > ℋ𝒶𝒷𝓁𝒶𝓇 𝒸𝑜𝓃 𝐼𝒜\n`;
    menuTxt += `/info > 𝐼𝓃𝒻𝑜𝓇𝓂𝒶𝓇𝒾𝑜́𝓃 𝒷𝑜𝓉\n`;
    menuTxt += `/menu > 𝒱𝑒𝓇 𝑒𝓈𝓉𝑒 𝓂𝑒𝓃𝓊́\n`;
    menuTxt += `/listcm > 𝐿𝒾𝓈𝓉𝒶 𝒸𝑜𝓂𝒶𝓃𝒹𝑜𝓈\n`;
    menuTxt += `/listgp > 𝒢𝓇𝓊𝓅𝑜𝓈 𝒷𝑜𝓉\n`;
    menuTxt += `/perfil > 𝓉𝓊 𝓅𝑒𝓇𝒻𝒾𝓁\n`;
    menuTxt += `/tr > 𝓉𝓇𝒶𝒹𝓊𝒸𝓉𝑜𝓇\n`;
    menuTxt += `/update > 𝒜𝒸𝓉𝓊𝒶𝓁𝒾𝓏𝒶𝓇\n`;
    menuTxt += `/fix > ℛ𝑒𝓅𝒶𝓇𝒶𝓇 𝐷𝐵\n`;
    menuTxt += `/ext > 𝒢𝑒𝓈𝓉𝒾𝑜́𝓃𝒶𝓇 𝑒𝓍𝓉𝑒𝓃𝓈𝒾𝑜𝓃𝑒𝓈\n\n`;

    // MIX - SIN ESPACIOS
    menuTxt += `🎮 *𝒵𝓸𝓃𝒶 𝑀𝒾𝓍* 🔥\n`;
    menuTxt += `/ppt > 𝒫𝒾𝑒𝒹𝓇𝒶 𝓅𝒶𝓅𝑒𝓁 𝓉𝒾𝒿𝑒𝓇𝒶\n`;
    menuTxt += `/tiktok > 𝐷𝑒𝓈𝒸𝒶𝓇𝑔𝒶𝓇 𝓋𝒾𝒹𝑒𝑜\n`;
    menuTxt += `/doxeo > 𝒮𝒾𝓂𝓊𝓁𝒶𝓇 𝐼𝒫 𝓉𝓇𝒶𝒸𝓀𝑒𝓇\n`;
    menuTxt += `/bug > ℛ𝑒𝓅𝑜𝓇𝓉𝒶𝓇 𝑒𝓇𝓇𝑜𝓇\n`;
    menuTxt += `/bc > 𝑀𝑒𝓃𝓈𝒶𝒷𝑒 𝓂𝒶𝓈𝒾𝓋𝑜\n`;
    menuTxt += `/autodm > 𝑀𝑒𝓃𝓈𝒶𝒷𝑒 𝒶𝓊𝓉𝑜́𝓂𝒶𝓉𝒾𝓬𝑜\n`;
    menuTxt += `/unreg > 𝐷𝑒𝓈𝓇𝑒𝑔𝒾𝓈𝓉𝓇𝒶𝓇𝓈𝑒\n\n`;

    menuTxt += `👨‍💻 *ℂ𝓇𝑒𝒶𝒹𝑜𝓇:* 𝐽𝒽𝑜𝓃 𝒢𝓊𝑒𝓇𝓇𝒶 👋\n🔗 *𝒢𝒾𝓉ℋ𝓊𝒷:* 𝒿𝒽𝑜𝓃𝓈𝓎𝓈𝓉𝑒𝓂 🚀`;

    await sock.sendMessage(from, {
      text: menuTxt,
      contextInfo: {
        externalAdReply: {
          title: "🧙‍♂️ 𝓝𝓪𝓻𝓾𝓽𝓸𝓑𝓸𝓽 𝓜𝓾𝓵𝓽𝓲 🧙‍♂️",
          body: "🏌️‍♂️ 𝒮𝓎𝓈𝓉𝑒𝓂𝒶 𝒱𝑒𝓃𝑒𝓏𝑜𝓁𝒶𝓃𝑜 🇻🇪 🚀",
          mediaType: 1,
          renderLargerThumbnail: true,
          thumbnailUrl: thumbUrl,
          sourceUrl: "https://github.com/jhonsystem"
        }
      }
    }, { quoted: msg });
  }
};
