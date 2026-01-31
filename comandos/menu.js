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

        // --- ENCABEZADO ---
        let menuTxt = `*𝑩𝒊𝒆𝒏𝒗𝒆𝒏𝒊𝒅𝒐, 𝒆𝒔𝒑𝒆𝒓𝒐 𝒒𝒖𝒆 𝒅𝒊𝒔𝒇𝒓𝒖𝒕𝒆𝒔 𝒅𝒆𝒍 𝒃𝒐𝒕.❤️\n`;
        menuTxt += `🏌️‍♂️ _𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝑺𝒚𝒔𝒕𝒆𝒎_ 🏌️‍♂️\n\n`;

        // --- INFO DEL SISTEMA ---
        menuTxt += `𝑷𝒂𝒊𝒔 : *𝑽𝒆𝒏𝒆𝒛𝒖𝒆𝒍𝒂* 🇻🇪\n`;
        menuTxt += `𝑷𝒓𝒆𝒇𝒊𝒋𝒐 : *𝑴𝒖𝒍𝒕𝒊 𝒑𝒓𝒆𝒇𝒊𝒋𝒐* 😈\n`;
        menuTxt += `𝑺𝒕𝒂𝒕𝒖𝒔 : *𝑩𝒖𝒔𝒄𝒂𝒏𝒅𝒐 𝒖𝒏𝒂 𝒎𝒊𝒏𝒂* 😳\n`;
        menuTxt += `𝑻𝒐𝒕𝒂𝒍 𝒄𝒐𝒎𝒂𝒏𝒅𝒐𝒔 : *${totalComandos}* 😵‍💫\n\n`;

        menuTxt += `¡𝐇𝐨𝐥𝐚 👋! 𝐌𝐮𝐜𝐡𝐨 𝐠𝐮𝐬𝐭𝐨 *${pushName}*\n`;
        menuTxt += `!𝐒𝐨𝐲 𝐍𝐚𝐫𝐮𝐭𝐨𝐁𝐨𝐭! 𝐀𝐜𝐚 𝐭𝐞 𝐝𝐞𝐣𝐨 𝐥𝐚 𝐥𝐢𝐬𝐭𝐚 𝐝𝐞 𝐜𝐨𝐦𝐚𝐝𝐨𝐬. 🏌️‍♂️\n\n`;

        // --- SECCIÓN: ADMINISTRACIÓN (Uno debajo del otro) ---
        menuTxt += `~│~ ✦ *𝐀𝐃𝐌𝐈𝐍𝐈𝐒𝐓𝐑𝐀𝐂𝐈𝐎𝐍 𝐃𝐄 𝐆𝐑𝐔𝐏𝐎𝐒*\n`;
        menuTxt += `† */admins*\n`;
        menuTxt += `† */antilink*\n`;
        menuTxt += `† */kick*\n`;
        menuTxt += `† */add*\n`;
        menuTxt += `† */promote*\n`;
        menuTxt += `† */demote*\n`;
        menuTxt += `† */tagall*\n`;
        menuTxt += `† */hidetag*\n`;
        menuTxt += `† */delete*\n`;
        menuTxt += `† */resetlink*\n`;
        menuTxt += `† */link*\n`;
        menuTxt += `† */setname*\n`;
        menuTxt += `† */setdesc*\n`;
        menuTxt += `† */infogp*\n`;
        menuTxt += `† */join*\n`;
        menuTxt += `† */out*\n`;
        menuTxt += `~│~\n\n`;

        // --- SECCIÓN: UTILIDADES ---
        menuTxt += `» ~°•(⚡)• ÷~ *𝐔𝐓𝐈𝐋𝐈𝐃𝐀𝐃𝐄𝐒 & 𝐒𝐘𝐒𝐓𝐄𝐌* ~÷~\n`;
        menuTxt += `⚡ */ping*\n`;
        menuTxt += `⚡ */ia*\n`;
        menuTxt += `⚡ */info*\n`;
        menuTxt += `⚡ */menu*\n`;
        menuTxt += `⚡ */listcm*\n`;
        menuTxt += `⚡ */listgp*\n`;
        menuTxt += `⚡ */perfil*\n`;
        menuTxt += `⚡ */tr*\n`;
        menuTxt += `⚡ */update*\n`;
        menuTxt += `⚡ */fix*\n`;
        menuTxt += `⚡ */ext*\n`;
        menuTxt += `~│~\n\n`;

        // --- SECCIÓN: MIX ---
        menuTxt += `» ~°•(★)• ÷~ *𝐙𝐎𝐍𝐀 𝐌𝐈𝐗* ~÷~\n`;
        menuTxt += `★ */ppt*\n`;
        menuTxt += `★ */tiktok*\n`;
        menuTxt += `★ */doxeo*\n`;
        menuTxt += `★ */bug*\n`;
        menuTxt += `★ */bc*\n`;
        menuTxt += `★ */autodm*\n`;
        menuTxt += `★ */unreg*\n`;
        menuTxt += `~│~\n\n`;

        // --- PIE DE PÁGINA ---
        menuTxt += `🚀 *𝒔𝒚𝒔𝒕𝒆𝒎:* Escaneo completado.\n`;
        menuTxt += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

        // --- ENVÍO FINAL ---
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
