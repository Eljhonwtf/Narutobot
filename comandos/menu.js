const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'menu',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        
        // --- Contador de Comandos Reales ---
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

        // --- CUERPO DEL MENÚ (AESTHETIC & COMPACTO) ---
        let menuTxt = `*𝐀𝐃𝐌𝐈𝐍𝐈𝐒𝐓𝐑𝐀𝐂𝐈𝐎𝐍 𝐂𝐄𝐍𝐓𝐑𝐀𝐋*\n`;
        menuTxt += `_𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝑺𝒚𝒔𝒕𝒆𝒎_ 🍥\n\n`;
        
        menuTxt += `Hola! Soy *Narutobot* 🍥\n`;
        menuTxt += `¡Bienvenido, *Jhon* 🏴‍☠️!\n\n`;

        // --- DISEÑO COMPACTO ---
        menuTxt += `𝑷𝒂𝒊𝒔 : *𝑽𝒆𝒏𝒆𝒛𝒖𝒆𝒍𝒂* 🇻🇪
𝑷𝒓𝒆𝒇𝒊𝒋𝒐 : 𝑴𝒖𝒍𝒕𝒊 𝒑𝒓𝒆𝒇𝒊𝒋𝒐 😈
𝑺𝒕𝒂𝒕𝒖𝒔 : 𝑩𝒖𝒔𝒄𝒂𝒏𝒅𝒐 𝒖𝒏𝒂 𝒎𝒊𝒏𝒂 😳
𝑻𝒐𝒕𝒂𝒍 𝒅𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐𝒔 𝒄𝒂𝒓𝒈𝒂𝒅𝒐𝒔 : ${totalComandos} 😵‍💫

¡𝐇𝐨𝐥𝐚 👋! 𝐌𝐮𝐜𝐡𝐨 𝐠𝐮𝐬𝐭𝐨 *${userName}* 
!𝐒𝐨𝐲 𝐍𝐚𝐫𝐮𝐭𝐨𝐁𝐨𝐭! 𝐀𝐜𝐚 𝐭𝐞 𝐝𝐞𝐣𝐨 𝐥𝐚 𝐥𝐢𝐬𝐭𝐚 𝐝𝐞 𝐜𝐨𝐦𝐚𝐝𝐨𝐬. 🏌️‍♂️

😮‍💨 *𝑨𝑫𝑴𝑰𝑵𝑰𝑺𝑻𝑹𝑨𝑪𝑰𝑶𝑵 𝑫𝑬 𝑮𝑹𝑼𝑷𝑶𝑺* 😮‍💨`;

        // SECCIÓN ADMIN
        menuTxt += `~│~ ✦ *𝐀𝐃𝐌𝐈𝐍𝐈𝐒𝐓𝐑𝐀𝐂𝐈𝐎𝐍 𝐃𝐄 𝐆𝐑𝐔𝐏𝐎𝐒*\n`;
        menuTxt += `† */admins*\n† */antilink*\n† */kick*\n† */add*\n† */promote*\n† */demote*\n† */tagall*\n† */hidetag*\n† */delete*\n† */resetlink*\n† */link*\n† */setname*\n† */setdesc*\n† */infogp*\n† */join*\n† */out*\n`;
        menuTxt += `~│~\n`;

        // SECCIÓN UTILIDADES
        menuTxt += `» ~°•(⚡)• ÷~ *𝐔𝐓𝐈𝐋𝐈𝐃𝐀𝐃𝐄𝐒 & 𝐒𝐘𝐒𝐓𝐄𝐌* ~÷~\n`;
        menuTxt += `⚡ */ping*\n⚡ */ia*\n⚡ */info*\n⚡ */menu*\n⚡ */listcm*\n⚡ */listgp*\n⚡ */perfil*\n⚡ */tr*\n⚡ */update*\n⚡ */fix*\n⚡ */ext*\n`;
        menuTxt += `~│~\n`;

        // SECCIÓN DIVERSIÓN/MIX
        menuTxt += `» ~°•(★)• ÷~ *𝐙𝐎𝐍𝐀 𝐌𝐈𝐗* ~÷~\n`;
        menuTxt += `★ */ppt*\n★ */tiktok*\n★ */doxeo*\n★ */bug*\n★ */bc*\n★ */autodm*\n★ */unreg*\n`;
        menuTxt += `~│~\n\n`;

        menuTxt += `🚀 *𝒔𝒚𝒔𝒕𝒆𝒎:* Escaneo completado.\n`;
        menuTxt += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

        // --- ENVÍO ÚNICO CON SOURCEURL INTEGRADO ---
        await sock.sendMessage(from, { 
            text: menuTxt, 
            contextInfo: {
                externalAdReply: {
                    title: "𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝑺𝒚𝒔𝒕𝒆𝒎 𝑽1",
                    body: "𝑱𝒉𝒐𝒏 𝑮𝒖𝒆𝒓𝒓𝒂 🏴‍☠️",
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: true,
                    thumbnailUrl: thumbUrl,
                    sourceUrl: "https://github.com/jhonsystem" 
                },
                mentionedJid: [msg.key.participant || from]
            }
        }, { quoted: msg });
    }
};
