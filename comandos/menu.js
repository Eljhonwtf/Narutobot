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

    // --- CONSTRUCCIÓN DEL MENÚ ---
    let menuTxt = `『 𝐍𝐀𝐑𝐔𝐓𝐎𝐁𝐎𝐓 𝐒𝐘𝐒𝐓𝐄𝐌 ⚡ 』\n\n`;
    
    menuTxt += `𝑯𝒐𝒍𝒂 *${pushName}*, 𝒃𝒊𝒆𝒏𝒗𝒆𝒏𝒊𝒅𝒐 𝒂 𝒍𝒂 𝒊𝒏𝒇𝒐𝒓𝒎𝒂𝒄𝒊ó𝒏 𝒅𝒆𝒍 𝒃𝒐𝒕, 𝒆𝒔𝒑𝒆𝒓𝒐 𝒕𝒆 𝒈𝒖𝒔𝒕𝒆. ✨\n\n`;
    
    menuTxt += `┌─ 📂 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝗰𝗶𝗼́𝗻\n`;
    menuTxt += `│ ⬡ 𝖯𝖺𝗂𝗌: Venezuela 🇻🇪\n`;
    menuTxt += `│ ⬡ 𝖢𝗈𝗆𝖺𝗇𝖽𝗈𝗌: ${totalComandos}\n`;
    menuTxt += `│ ⬡ 𝖤𝗌𝗍𝖺𝖽𝗈: Online 🟢\n`;
    menuTxt += `└───────────────┈\n\n`;

    // --- SECCIÓN: ADMINISTRACIÓN ---
    menuTxt += `┏━━〔 GROUP ADMIN〕━━┓\n`;
    const adminCmds = [
      ['admins', 'Mencionar al staff técnico.'],
      ['antilink', 'Filtro de seguridad para enlaces.'],
      ['kick', 'Remover usuario del grupo.'],
      ['add', 'Agregar nuevo integrante.'],
      ['promote', 'Asignar rango de administrador.'],
      ['demote', 'Remover rango de administrador.'],
      ['tagall', 'Notificación global a miembros.'],
      ['hidetag', 'Mención fantasma en el chat.'],
      ['delete', 'Eliminar mensajes del sistema.'],
      ['infogp', 'Detalles del grupo actual.']
    ];
    adminCmds.forEach(([cmd, desc]) => {
      menuTxt += `  ◈ */${cmd}*\n  > _${desc}_\n`;
    });

    // --- SECCIÓN: UTILIDADES ---
    menuTxt += `\n┏━━〔 𝖲𝖸𝖲𝖳𝖤𝖬 𝖳𝖮𝖮𝖫𝖲 〕━━┓\n`;
    const utilCmds = [
      ['ping', 'Estado de la latencia actual.'],
      ['ia', 'Consultar inteligencia artificial.'],
      ['info', 'Especificaciones de Narutobot.'],
      ['menu', 'Desplegar panel principal.'],
      ['perfil', 'Ver ficha de usuario personal.'],
      ['update', 'Sincronizar nueva versión.'],
      ['fix', 'Mantenimiento de base de datos.']
    ];
    utilCmds.forEach(([cmd, desc]) => {
      menuTxt += `  ◈ */${cmd}*\n  > _${desc}_\n`;
    });

    // --- SECCIÓN: MIX ---
    menuTxt += `\n┏━━〔 𝖤𝖭𝖳𝖤𝖱𝖳𝖠𝖨𝖭𝖬𝖤𝖭𝖳 〕━━┓\n`;
    const mixCmds = [
      ['tiktok', 'Descargar multimedia sin marca.'],
      ['doxeo', 'Simulación de rastreo (Broma).'],
      ['bug', 'Reportar fallo al creador.'],
      ['bc', 'Enviar anuncio a los chats.'],
      ['autodm', 'Gestor de respuestas privadas.']
    ];
    mixCmds.forEach(([cmd, desc]) => {
      menuTxt += `  ◈ */${cmd}*\n  > _${desc}_\n`;
    });

    menuTxt += `\n┗━━━━━━━━━━━━━━━┛\n`;
    menuTxt += `© 𝖩𝗁𝗈𝗇 𝖦𝗎𝖾𝗋𝗋𝖺 | 𝖭𝖺𝗋𝗎𝗍𝗈𝖡𝗈𝗍 𝖢𝗈𝗋𝖾`;

    await sock.sendMessage(from, {
      text: menuTxt,
      contextInfo: {
        externalAdReply: {
          title: "𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝑺𝒚𝒔𝒕𝒆𝒎 𝑽1",
          body: "Architecture by Jhon Guerra 🏴‍☠️",
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
