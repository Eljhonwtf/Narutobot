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

    // --- ENCABEZADO (FIX) ---
    let menuTxt = 𝐀𝐃𝐌𝐈𝐍𝐈𝐒𝐓𝐑𝐀𝐂𝐈𝐎𝐍 𝐂𝐄𝐍𝐓𝐑𝐀𝐋\n\n;

    menuTxt += ┌───〔 𝑵𝑨𝑹𝑼𝑻𝑶𝑩𝑶𝑻 𝑴𝑬𝑵𝑼 〕───┐\n;
    menuTxt += │ 𝑷𝒂𝒊𝒔 : 𝑽𝒆𝒏𝒆𝒛𝒖𝒆𝒍𝒂 🇻🇪\n;
    menuTxt += │ 𝑷𝒓𝒆𝒇𝒊𝒋𝒐 : 𝑴𝒖𝒍𝒕𝒊 𝒑𝒓𝒆𝒇𝒊𝒋𝒐 😈\n;
    menuTxt += │ 𝑺𝒕𝒂𝒕𝒖𝒔 : 𝑩𝒖𝒔𝒄𝒂𝒏𝒅𝒐 𝒖𝒏𝒂 𝒎𝒊𝒏𝒂 😳\n;
    menuTxt += │ 𝑻𝒐𝒕𝒂𝒍 : ${totalComandos} 😵‍💫\n;
    menuTxt += ├──────────────────────────────┤\n;
    menuTxt += │ ¡𝐇𝐨𝐥𝐚 👋! ${pushName}\n;
    menuTxt += │ 𝐒𝐨𝐲 𝐍𝐚𝐫𝐮𝐭𝐨𝐁𝐨𝐭, aquí tienes los comandos.\n;
    menuTxt += └──────────────────────────────┘\n\n;

    // --- SECCIÓN: ADMINISTRACIÓN ---
    menuTxt += │ ✦ 𝐀𝐃𝐌𝐈𝐍𝐈𝐒𝐓𝐑𝐀𝐂𝐈𝐎𝐍 𝐃𝐄 𝐆𝐑𝐔𝐏𝐎𝐒\n;
    menuTxt += † /admins\n╰┈➤ Mencionar a los administradores.\n;
    menuTxt += † /antilink\n╰┈➤ Activa el anti-enlaces de grupos.\n;
    menuTxt += † /kick\n╰┈➤ Eliminar a un usuario del grupo.\n;
    menuTxt += † /add\n╰┈➤ Agregar un usuario al grupo.\n;
    menuTxt += † /promote\n╰┈➤ Dar administrador a un usuario.\n;
    menuTxt += † /demote\n╰┈➤ Quitar administrador a un usuario.\n;
    menuTxt += † /tagall\n╰┈➤ Mencionar a todos los miembros.\n;
    menuTxt += † /hidetag\n╰┈➤ Enviar una mención invisible.\n;
    menuTxt += † /delete\n╰┈➤ Eliminar mensajes de otros.\n;
    menuTxt += † /resetlink\n╰┈➤ Restablecer enlace del grupo.\n;
    menuTxt += † /link\n╰┈➤ Obtener el enlace del grupo.\n;
    menuTxt += † /setname\n╰┈➤ Cambiar el nombre del grupo.\n;
    menuTxt += † /setdesc\n╰┈➤ Cambiar la descripción.\n;
    menuTxt += † /infogp\n╰┈➤ Ver ajustes del grupo actual.\n;
    menuTxt += † /join\n╰┈➤ Hacer que el bot se una a un grupo.\n;
    menuTxt += † /out\n╰┈➤ Hacer que el bot salga del grupo.\n;
    menuTxt += │\n\n;

    // --- SECCIÓN: UTILIDADES ---
    menuTxt += » °•(⚡)• ÷ 𝐔𝐓𝐈𝐋𝐈𝐃𝐀𝐃𝐄𝐒 & 𝐒𝐘𝐒𝐓𝐄𝐌 ÷\n;
    menuTxt += ⚡ /ping\n╰┈➤ Ver la velocidad de respuesta.\n;
    menuTxt += ⚡ /ia\n╰┈➤ Consultar a la Inteligencia Artificial.\n;
    menuTxt += ⚡ /info\n╰┈➤ Información sobre el bot y dueño.\n;
    menuTxt += ⚡ /menu\n╰┈➤ Mostrar este panel de comandos.\n;
    menuTxt += ⚡ /listcm\n╰┈➤ Lista de comandos sin detalles.\n;
    menuTxt += ⚡ /listgp\n╰┈➤ Lista de grupos vinculados.\n;
    menuTxt += ⚡ /perfil\n╰┈➤ Ver tu tarjeta de usuario.\n;
    menuTxt += ⚡ /tr\n╰┈➤ Traductor de idiomas integrado.\n;
    menuTxt += ⚡ /update\n╰┈➤ Actualizar el bot a la última versión.\n;
    menuTxt += ⚡ /fix\n╰┈➤ Reparar errores de base de datos.\n;
    menuTxt += ⚡ /ext\n╰┈➤ Gestionar extensiones del sistema.\n;
    menuTxt += │\n\n;

    // --- SECCIÓN: MIX ---
    menuTxt += » °•(★)• ÷ 𝐙𝐎𝐍𝐀 𝐌𝐈𝐗 ÷\n;
    menuTxt += ★ /ppt\n╰┈➤ Jugar Piedra, Papel o Tijera.\n;
    menuTxt += ★ /tiktok\n╰┈➤ Descargar videos sin marca de agua.\n;
    menuTxt += ★ /doxeo\n╰┈➤ Simular un rastro de IP (Broma).\n;
    menuTxt += ★ /bug\n╰┈➤ Reportar un fallo al desarrollador.\n;
    menuTxt += ★ /bc\n╰┈➤ Enviar un comunicado oficial.\n;
    menuTxt += ★ /autodm\n╰┈➤ Configurar mensaje al privado.\n;
    menuTxt += ★ /unreg\n╰┈➤ Eliminar tu registro del bot.\n;
    menuTxt += │\n\n;

    // --- PIE DE PÁGINA ---
    menuTxt += 🚀 𝒔𝒚𝒔𝒕𝒆𝒎: Escaneo completado.\n;
    menuTxt += 🏌🏽‍♂️ 𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎;

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