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
            let nombreUser = isOwner ? "Jhon🏴‍☠️" : (userData?.split('|')[0] || "Agente");

            // --- LISTA DE COMANDOS ---
            const comandos = [
                "admins", "antilink", "autodm", "bc", "bug", "delete", "demote", 
                "doxeo", "fecha", "fix", "grupo", "info", "infogp", "insultar", 
                "join", "kick", "link", "listcm", "listgp", "menu", "out", 
                "perfil", "ping", "ppt", "promote", "reg", "resetlink", 
                "setinfo", "setname", "tagall", "tiktok", "tr", "unreg", "user"
            ];

            // 2. Construcción del Menú (Estilo Original Vertical)
            let textoMenu = `🚀 *LISTA DE MENU DEL BOT* 🚀\n`;
            textoMenu += `📊 *Total Instalados:* ${comandos.length}\n`;
            textoMenu += `───────────────────────\n\n`;

            textoMenu += `👑 *OWNER & NIVEL DIOS*\n`;
            textoMenu += `  † /bc\n  † /join\n  † /out\n  † /autodm\n\n`;

            textoMenu += `🛡️ *GESTIÓN DE GRUPOS*\n`;
            textoMenu += `  † /antilink\n  † /kick\n  † /promote\n  † /demote\n`;
            textoMenu += `  † /admins\n  † /tagall\n  † /grupo\n  † /resetlink\n  † /delete\n\n`;

            textoMenu += `📝 *INFORMACIÓN & EDICIÓN*\n`;
            textoMenu += `  † /infogp\n  † /listgp\n  † /link\n  † /setname\n  † /setinfo\n\n`;

            textoMenu += `👤 *USUARIO & REGISTRO*\n`;
            textoMenu += `  † /reg | /unreg\n  † /perfil | /user\n\n`;

            textoMenu += `⚙️ *SISTEMA & SOPORTE*\n`;
            textoMenu += `  † /ping | /info | /fecha\n  † /listcm | /fix | /menu\n\n`;

            textoMenu += `🎭 *ENTRETENIMIENTO* \n`;
            textoMenu += `  † /ppt | /insultar | /tiktok\n  † /tr | /doxeo | /bug\n\n`;

            textoMenu += `───────────────────────\n`;
            textoMenu += `_Sincronizado con Jhon-Bot System_`;

            // 3. Envío con créditos en el apartado de la imagen (externalAdReply)
            await sock.sendMessage(from, { 
                text: textoMenu,
                contextInfo: {
                    externalAdReply: {
                        title: "ADMINISTRACIÓN CENTRAL",
                        body: "Jhon-Bot System ❤️", // Créditos con corazón en la imagen
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
