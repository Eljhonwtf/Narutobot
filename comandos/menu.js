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

    let menuTxt = `✨ *NARUTOBOT SYSTEM* ✨\n\n`;
    menuTxt += `👤 *Usuario:* ${pushName}\n`;
    menuTxt += `🇻🇪 *Venezuela* | ${totalComandos} Comandos\n\n`;

    // ═══════════════════════════════
    menuTxt += `🔧 *ADMINISTRACIÓN*\n\n`;
    menuTxt += `/admins\n> Mencionar administradores\n\n`;
    menuTxt += `/antilink\n> Activar anti-enlaces\n\n`;
    menuTxt += `/kick\n> Eliminar usuario\n\n`;
    menuTxt += `/add\n> Agregar usuario\n\n`;
    menuTxt += `/promote\n> Dar administrador\n\n`;
    menuTxt += `/demote\n> Quitar administrador\n\n`;
    menuTxt += `/tagall\n> Mencionar todos\n\n`;
    menuTxt += `/hidetag\n> Mención invisible\n\n`;
    menuTxt += `/delete\n> Borrar mensaje\n\n`;
    menuTxt += `/resetlink\n> Nuevo enlace grupo\n\n`;
    menuTxt += `/link\n> Obtener enlace\n\n`;
    menuTxt += `/setname\n> Cambiar nombre\n\n`;
    menuTxt += `/setdesc\n> Cambiar descripción\n\n`;
    menuTxt += `/infogp\n> Información grupo\n\n`;
    menuTxt += `/join\n> Bot se une grupo\n\n`;
    menuTxt += `/out\n> Bot sale grupo\n\n`;

    // ═══════════════════════════════
    menuTxt += `⚙️ *UTILIDADES*\n\n`;
    menuTxt += `/ping\n> Velocidad respuesta\n\n`;
    menuTxt += `/ia\n> Consultar IA\n\n`;
    menuTxt += `/info\n> Info del bot\n\n`;
    menuTxt += `/menu\n> Ver este menú\n\n`;
    menuTxt += `/listcm\n> Lista comandos\n\n`;
    menuTxt += `/listgp\n> Grupos bot\n\n`;
    menuTxt += `/perfil\n> Tu perfil\n\n`;
    menuTxt += `/tr\n> Traductor\n\n`;
    menuTxt += `/update\n> Actualizar bot\n\n`;
    menuTxt += `/fix\n> Reparar base datos\n\n`;
    menuTxt += `/ext\n> Gestionar extensiones\n\n`;

    // ═══════════════════════════════
    menuTxt += `🎮 *ZONA MIX*\n\n`;
    menuTxt += `/ppt\n> Piedra papel tijera\n\n`;
    menuTxt += `/tiktok\n> Descargar video\n\n`;
    menuTxt += `/doxeo\n> Simular IP tracker\n\n`;
    menuTxt += `/bug\n> Reportar error\n\n`;
    menuTxt += `/bc\n> Mensaje masivo\n\n`;
    menuTxt += `/autodm\n> Mensaje automático\n\n`;
    menuTxt += `/unreg\n> Desregistrarse\n\n`;

    menuTxt += `\n👨‍💻 *Creador:* John Guerra\n🔗 *GitHub:* jhonsystem`;

    await sock.sendMessage(from, {
      text: menuTxt,
      contextInfo: {
        externalAdReply: {
          title: "🤖 NARUTOBOT PROFESSIONAL",
          body: "Sistema Venezolano 🇻🇪",
          mediaType: 1,
          renderLargerThumbnail: true,
          thumbnailUrl: thumbUrl,
          sourceUrl: "https://github.com/jhonsystem"
        }
      }
    }, { quoted: msg });
  }
};
