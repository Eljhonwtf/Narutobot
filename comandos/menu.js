const fs = require('fs');

module.exports = {
    name: 'menu',
    description: 'Menú de Auditoría Original con Créditos en Imagen',
    run: async (sock, msg, body, args, isOwner) => {
        try {
            const from = msg.key.remoteJid;
            const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

            // 1. Cargar base de datos
            let db = {};
            if (fs.existsSync('./usuarios.json')) {
                db = JSON.parse(fs.readFileSync('./usuarios.json'));
            }

            const userData = db[from];
            let nombreUser = isOwner ? "𝑱𝒉𝒐𝒏🏴‍☠️" : (userData?.split('|')[0] || "𝑨𝒈𝒆𝒏𝒕𝒆");

            // --- LISTA DE COMANDOS ---
            const comandos = [
                "admins", "antilink", "autodm", "bc", "bug", "delete", "demote", 
                "doxeo", "fecha", "fix", "grupo", "info", "infogp", "insultar", 
                "join", "kick", "link", "listcm", "listgp", "menu", "out", 
                "perfil", "ping", "ppt", "promote", "reg", "resetlink", 
                "setinfo", "setname", "tagall", "tiktok", "tr", "unreg", "user"
            ];

            // 2. Construcción del Menú (Estilo Bold Italic)
            let textoMenu = `🏌🏽‍♂️ *𝑳𝑰𝑺𝑻𝑨 𝑫𝑬 𝑴𝑬𝑵𝑼 𝑫𝑬𝑳 𝑩𝑶𝑻* 🚀\n`;
            textoMenu += `📊 *𝑻𝒐𝒕𝒂𝒍 𝑰𝒏𝒔𝒕𝒂𝒍𝒂𝒅𝒐𝒔:* ${comandos.length}\n`;
            textoMenu += `───────────────────────\n\n`;

            textoMenu += `👑 *𝑶𝑾𝑵𝑬𝑹 & 𝑵𝑰𝑽𝑬𝑳 𝑫𝑰𝑶𝑺*\n`;
            textoMenu += `  † /bc\n  † /join\n  † /out\n  † /autodm\n\n`;

            textoMenu += `🛡️ *𝑮𝑬𝑺𝑻𝑰𝑶́𝑵 𝑫𝑬 𝑮𝑹𝑼𝑷𝑶𝑺*\n`;
            textoMenu += `  † /antilink\n  † /kick\n  † /promote\n  † /demote\n`;
            textoMenu += `  † /admins\n  † /tagall\n  † /grupo\n  † /resetlink\n  † /delete\n\n`;

            textoMenu += `📝 *𝑰𝑵𝑭𝑶𝑹𝑴𝑨𝑪𝑰𝑶́𝑵 & 𝑬𝑫𝑰𝑪𝑰𝑶́𝑵*\n`;
            textoMenu += `  † /infogp\n  † /listgp\n  † /link\n  † /setname\n  † /setinfo\n\n`;

            textoMenu += `👤 *𝑼𝑺𝑼𝑨𝑹𝑰𝑶 & 𝑹𝑬𝑮𝑰𝑺𝑻𝑹𝑶*\n`;
            textoMenu += `  † /reg | /unreg\n  † /perfil | /user\n\n`;

            textoMenu += `⚙️ *𝑺𝑰𝑺𝑻𝑬𝑴𝑨 & 𝑺𝑶𝑷𝑶𝑹𝑻𝑬*\n`;
            textoMenu += `  † /ping | /info | /fecha\n  † /listcm | /fix | /menu\n\n`;

            textoMenu += `🎭 *𝑬𝑵𝑻𝑹𝑬𝑻𝑬𝑵𝑰𝑴𝑰𝑬𝑵𝑻𝑶* \n`;
            textoMenu += `  † /ppt | /insultar | /tiktok\n  † /tr | /doxeo | /bug\n\n`;

            textoMenu += `───────────────────────\n`;
            textoMenu += `_𝑺𝒊𝒏𝒄𝒓𝒐𝒏𝒊𝒛𝒂𝒅𝒐 𝒄𝒐𝒏 𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝑺𝒚𝒔𝒕𝒆𝒎_`;

            // 3. Envío con créditos y quoted corregido
            await sock.sendMessage(from, { 
                text: textoMenu,
                contextInfo: {
                    externalAdReply: {
                        title: "𝑨𝑫𝑴𝑰𝑵𝑰𝑺𝑻𝑹𝑨𝑪𝑰𝑶́𝑵 𝑪𝑬𝑵𝑻𝑹𝑨𝑳",
                        body: "𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝑺𝒚𝒔𝒕𝒆𝒎 ❤️", 
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: msg });

            await sock.sendMessage(from, { react: { text: "📂", key: msg.key } });

        } catch (e) {
            console.log("Error en el menú:", e);
        }
    }
};
