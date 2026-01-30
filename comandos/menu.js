const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'menu',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const pushName = msg.pushName || 'Usuario';
        
        const contarComandos = (dir) => {
            let total = 0;
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
        
        // Link de la imagen para el cuerpo y el SourceUrl
        const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg"; 

        // --- CUERPO DEL MENÚ ---
        let menuTxt = `*𝐀𝐃𝐌𝐈𝐍𝐈𝐒𝐓𝐑𝐀𝐂𝐈𝐎𝐍 𝐂𝐄𝐍𝐓𝐑𝐀𝐋*\n`;
        menuTxt += `_𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝑺𝒚𝒔𝒕𝒆𝒎_ 🍥\n\n`;
        
        menuTxt += `Hola! Soy *Narutobot* 🍥\n`;
        menuTxt += `¡Bienvenido, *Jhon* 🏴‍☠️!\n\n`;

        menuTxt += `~╭━━━╼〔~ ✦ *𝐈𝐍𝐅𝐎 𝐒𝐘𝐒𝐓𝐄𝐌* ✦ ~〕╼━━━~\n`;
        menuTxt += `🍥\n`;
        menuTxt += `~┃~ ✑ *𝐏𝐚𝐢𝐬:* Venezuela 🇻🇪\n`;
        menuTxt += `~┃~ ✑ *𝐏𝐫𝐞𝐟𝐢𝐣𝐨:* Multi\n`;
        menuTxt += `~┃~ ✑ *𝐄𝐬𝐭𝐚𝐝𝐨:* Activo ✅\n`;
        menuTxt += `~┃~ ✑ *𝐀𝐫𝐜𝐡𝐢𝐯𝐨𝐬:* ${totalComandos}\n`;
        menuTxt += `~╰━━━━━━━━━━━━━━━━━━━━━━━~\n\n`;

        menuTxt += `~│~ ✦ *𝐀𝐃𝐌𝐈𝐍𝐈𝐒𝐓𝐑𝐀𝐂𝐈𝐎𝐍 𝐃𝐄 𝐆𝐑𝐔𝐏𝐎𝐒*\n`;
        menuTxt += `~│~\n`;
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
        menuTxt += `~│~\n`;

        menuTxt += `» ~°•(⚡)• ÷~ *𝐔𝐓𝐈𝐋𝐈𝐃𝐀𝐃𝐄𝐒 & 𝐒𝐘𝐒𝐓𝐄𝐌* ~÷~\n`;
        menuTxt += `~│~\n`;
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
        menuTxt += `~│~\n`;

        menuTxt += `» ~°•(★)• ÷~ *𝐙𝐎𝐍𝐀 𝐌𝐈𝐗* ~÷~\n`;
        menuTxt += `~│~\n`;
        menuTxt += `★ */ppt*\n`;
        menuTxt += `★ */tiktok*\n`;
        menuTxt += `★ */doxeo*\n`;
        menuTxt += `★ */bug*\n`;
        menuTxt += `★ */bc*\n`;
        menuTxt += `★ */autodm*\n`;
        menuTxt += `★ */unreg*\n`;
        menuTxt += `~│~\n\n`;

        menuTxt += `🚀 *𝒔𝒚𝒔𝒕𝒆𝒎:* Escaneo completado.\n`;
        menuTxt += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

        // --- ENVÍO CON SOURCEURL (MINIATURA DE ENLACE) ---
        await sock.sendMessage(from, { 
            image: { url: thumbUrl }, 
            caption: menuTxt,
            contextInfo: {
                externalAdReply: {
                    title: "𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝑺𝒚𝒔𝒕𝒆𝒎 𝑽1",
                    body: "𝑩𝒚: 𝑱𝒉𝒐𝒏 𝑮𝒖𝒆𝒓𝒓𝒂",
                    thumbnailUrl: thumbUrl,
                    sourceUrl: "https://github.com/jhonsystem", // Aquí puedes poner tu link
                    mediaType: 1,
                    renderLargerThumbnail: true
                },
                mentionedJid: [msg.key.participant || from]
            }
        }, { quoted: msg });
    }
};
