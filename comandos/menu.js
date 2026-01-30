const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'menu',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        
        // --- Contador de comandos ---
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
        
        // Link de la imagen de Naruto
        const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg"; 

        // --- CUERPO DEL MENÚ (Aesthetic) ---
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
        menuTxt += `† */admins*\n† */antilink*\n† */kick*\n† */add*\n† */promote*\n† */demote*\n† */tagall*\n† */hidetag*\n† */delete*\n† */resetlink*\n† */link*\n† */setname*\n† */setdesc*\n† */infogp*\n† */join*\n† */out*\n`;
        menuTxt += `~│~\n`;

        menuTxt += `» ~°•(⚡)• ÷~ *𝐔𝐓𝐈𝐋𝐈𝐃𝐀𝐃𝐄𝐒 & 𝐒𝐘𝐒𝐓𝐄𝐌* ~÷~\n`;
        menuTxt += `~│~\n`;
        menuTxt += `⚡ */ping*\n⚡ */ia*\n⚡ */info*\n⚡ */menu*\n⚡ */listcm*\n⚡ */listgp*\n⚡ */perfil*\n⚡ */tr*\n⚡ */update*\n⚡ */fix*\n⚡ */ext*\n`;
        menuTxt += `~│~\n`;

        menuTxt += `» ~°•(★)• ÷~ *𝐙𝐎𝐍𝐀 𝐌𝐈𝐗* ~÷~\n`;
        menuTxt += `~│~\n`;
        menuTxt += `★ */ppt*\n★ */tiktok*\n★ */doxeo*\n★ */bug*\n★ */bc*\n★ */autodm*\n★ */unreg*\n`;
        menuTxt += `~│~\n\n`;

        menuTxt += `🚀 *𝒔𝒚𝒔𝒕𝒆𝒎:* Escaneo completado.\n`;
        menuTxt += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

        // --- ENVÍO DE UN SOLO MENSAJE ---
        await sock.sendMessage(from, { 
            image: { url: thumbUrl }, // Imagen principal
            caption: menuTxt,         // Texto del menú
            contextInfo: {
                externalAdReply: {
                    title: "𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝑺𝒚𝒔𝒕𝒆𝒎",
                    body: "𝑱𝒉𝒐𝒏 𝑮𝒖𝒆𝒓𝒓𝒂 🏴‍☠️",
                    mediaType: 1,
                    sourceUrl: "https://github.com/jhonsystem", // Tu link
                    thumbnailUrl: thumbUrl,
                    renderLargerThumbnail: true // Hace que la miniatura sea la misma imagen grande
                }
            }
        }, { quoted: msg });
    }
};
