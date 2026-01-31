const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'menu',
  run: async (sock, msg, body, args, isOwner) => {
    const from = msg.key.remoteJid;
    const pushName = msg.pushName || 'Usuario';

    // --- Lógica para contar comandos ---
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

    // --- ENCABEZADO (CON COMILLAS CORREGIDAS) ---
    let menuTxt = `*𝐀𝐃𝐌𝐈𝐍𝐈𝐒𝐓𝐑𝐀𝐂𝐈𝐎𝐍 𝐂𝐄𝐍𝐓𝐑𝐀𝐋*\n\n`;

    menuTxt += `┌───〔 𝑵𝑨𝑹𝑼𝑻𝑶𝑩𝑶𝑻 𝑴𝑬𝑵𝑼 〕───┐\n`;
    menuTxt += `│ 𝑷𝒂𝒊𝒔 : 𝑽𝒆𝒏𝒆𝒛𝒖𝒆𝒍𝒂 🇻🇪\n`;
    menuTxt += `│ 𝑷𝒓𝒆𝒇𝒊𝒋𝒐 : 𝑴𝒖𝒍𝒕𝒊 𝒑𝒓𝒆𝒇𝒊𝒋𝒐 😈\n`;
    menuTxt += `│ 𝑺𝒕𝒂𝒕𝒖𝒔 : 𝑩𝒖𝒔𝒄𝒂𝒏𝒅𝒐 𝒖𝒏𝒂 𝒎𝒊𝒏𝒂 😳\n`;
    menuTxt += `│ 𝑻𝒐𝒕𝒂𝒍 : ${totalComandos} 😵‍💫\n`;
    menuTxt += `├──────────────────────────────┤\n`;
    menuTxt += `│ ¡𝐇𝐨𝐥𝐚 👋! ${pushName}\n`;
    menuTxt += `│ 𝐒𝐨𝐲 𝐍𝐚𝐫𝐮𝐭𝐨𝐁𝐨𝐭, aquí tienes los comandos.\n`;
    menuTxt += `└──────────────────────────────┘\n\n`;

    // --- SECCIÓN: ADMINISTRACIÓN ---
    menuTxt += `┌──〔 ✦ 𝐀𝐃𝐌𝐈𝐍𝐈𝐒𝐓𝐑𝐀𝐂𝐈𝐎𝐍 〕\n`;
    menuTxt += `│\n`;
    menuTxt += `│ † */admins*\n╰┈➤ _Mencionar a los administradores._\n`;
    menuTxt += `│ † */antilink*\n╰┈➤ _Activa el anti-enlaces de grupos._\n`;
    menuTxt += `│ † */kick*\n╰┈➤ _Eliminar a un usuario del grupo._\n`;
    menuTxt += `│ † */add*\n╰┈➤ _Agregar un usuario al grupo._\n`;
    menuTxt += `│ † */promote*\n╰┈➤ _Dar administrador a un usuario._\n`;
    menuTxt += `│ † */demote*\n╰┈➤ _Quitar administrador a un usuario._\n`;
    menuTxt += `│ † */tagall*\n╰┈➤ _Mencionar a todos los miembros._\n`;
    menuTxt += `│ † */hidetag*\n╰┈➤ _Enviar una mención invisible._\n`;
    menuTxt += `│ † */delete*\n╰┈➤ _Eliminar mensajes de otros._\n`;
    menuTxt += `│ † */resetlink*\n╰┈➤ _Restablecer enlace del grupo._\n`;
    menuTxt += `│ † */link*\n╰┈➤ _Obtener el enlace del grupo._\n`;
    menuTxt += `│ † */setname*\n╰┈➤ _Cambiar el nombre del grupo._\n`;
    menuTxt += `│ † */setdesc*\n╰┈➤ _Cambiar la descripción._\n`;
    menuTxt += `│ † */infogp*\n╰┈➤ _Ver ajustes del grupo actual._\n`;
    menuTxt += `│ † */join*\n╰┈➤ _Hacer que el bot se una a un grupo._\n`;
    menuTxt += `│ † */out*\n╰┈➤ _Hacer que el bot salga del grupo._\n`;
    menuTxt += `└──────────────────────────────┘\n\n`;

    // --- SECCIÓN: UTILIDADES ---
    menuTxt += `┌──〔 ⚡ 𝐔𝐓𝐈𝐋𝐈𝐃𝐀𝐃𝐄𝐒 〕\n`;
    menuTxt += `│\n`;
    menuTxt += `│ ⚡ */ping*\n╰┈➤ _Ver la velocidad de respuesta._\n`;
    menuTxt += `│ ⚡ */ia*\n╰┈➤ _Consultar a la Inteligencia Artificial._\n`;
    menuTxt += `│ ⚡ */info*\n╰┈➤ _Información sobre el bot y dueño._\n`;
    menuTxt += `│ ⚡ */menu*\n╰┈➤ _Mostrar este panel de comandos._\n`;
    menuTxt += `│ ⚡ */listcm*\n╰┈➤ _Lista de comandos sin detalles._\n`;
    menuTxt += `│ ⚡ */listgp*\n╰┈➤ _Lista de grupos vinculados._\n`;
    menuTxt += `│ ⚡ */perfil*\n╰┈➤ _Ver tu tarjeta de usuario._\n`;
    menuTxt += `│ ⚡ */tr*\n╰┈➤ _Traductor de idiomas integrado._\n`;
    menuTxt += `│ ⚡ */update*\n╰┈➤ _Actualizar el bot a la versión Pro._\n`;
    menuTxt += `│ ⚡ */fix*\n╰┈➤ _Reparar errores de base de datos._\n`;
    menuTxt += `│ ⚡ */ext*\n╰┈➤ _Gestionar extensiones del sistema._\n`;
    menuTxt += `└──────────────────────────────┘\n\n`;

    // --- SECCIÓN: MIX ---
    menuTxt += `┌──〔 ★ 𝐙𝐎𝐍𝐀 𝐌𝐈𝐗 〕\n`;
    menuTxt += `│\n`;
    menuTxt += `│ ★ */ppt*\n╰┈➤ _Jugar Piedra, Papel o Tijera._\n`;
    menuTxt += `│ ★ */tiktok*\n╰┈➤ _Descargar videos sin marca de agua._\n`;
    menuTxt += `│ ★ */doxeo*\n╰┈➤ _Simular un rastro de IP (Broma)._\n`;
    menuTxt += `│ ★ */bug*\n╰┈➤ _Reportar un fallo al desarrollador._\n`;
    menuTxt += `│ ★ */bc*\n╰┈➤ _Enviar un comunicado oficial._\n`;
    menuTxt += `│ ★ */autodm*\n╰┈➤ _Configurar mensaje al privado._\n`;
    menuTxt += `│ ★ */unreg*\n╰┈➤ _Eliminar tu registro del bot._\n`;
    menuTxt += `└──────────────────────────────┘\n\n`;

    // --- PIE DE PÁGINA ---
    menuTxt += `🚀 *𝒔𝒚𝒔𝒕𝒆𝒎:* Escaneo completado.\n`;
    menuTxt += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

    // --- ENVÍO CON SOURCEURL ---
    await sock.sendMessage(from, {
      text: menuTxt,
      contextInfo: {
        externalAdReply: {
          title: "𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝑺𝒚𝒔𝒕𝒆𝒎 𝑽1",
          body: "𝑱𝒉𝒐𝒏 𝑮𝒖𝒆𝒓𝒓𝒂 🏴‍☠️",
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
