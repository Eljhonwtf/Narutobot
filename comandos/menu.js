const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'menu',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const pushName = msg.pushName || 'Usuario';
        
        // --- Escaneo automático de archivos para Stats ---
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

        // TU ENLACE DE IMAGEN ACTUALIZADO
        const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg"; 

        // --- Estructura del Menú ---
        let menuTxt = `¡Hola! **@${pushName}**, Soy **Narutobot** 🍥\n`;
        menuTxt += `¡Bienvenido, **Jhon** 🏴‍☠️!\n\n`;

        menuTxt += `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎 𝒄𝒐𝒓𝒆** 🏌🏽‍♂️ 』\n\n`;

        menuTxt += `┌──『 📊 **𝒔𝒕𝒂𝒕𝒔** 』\n`;
        menuTxt += `│ 📂 **Total:** ${totalComandos} archivos\n`;
        menuTxt += `│ ⚡ **Estado:** Online\n`;
        menuTxt += `└─────────────────────────\n\n`;

        menuTxt += `┌──『 🛠️ **𝒊𝒏𝒗𝒆𝒏𝒕𝒂𝒓𝒊𝒐** 』\n`;
        menuTxt += `│ 1. /admins\n│ 2. /antilink\n│ 3. /autodm\n│ 4. /bc\n│ 5. /bug\n`;
        menuTxt += `│ 6. /delete\n│ 7. /demote\n│ 8. /doxeo\n│ 9. /ext\n│ 10. /fix\n`;
        menuTxt += `│ 11. /ia\n│ 12. /info\n│ 13. /infogp\n│ 14. /join\n│ 15. /kick\n`;
        menuTxt += `│ 16. /link\n│ 17. /listcm\n│ 18. /listgp\n│ 19. /menu\n│ 20. /out\n`;
        menuTxt += `│ 21. /perfil\n│ 22. /ping\n│ 23. /ppt\n│ 24. /promote\n│ 25. /resetlink\n`;
        menuTxt += `│ 26. /setdesc\n│ 27. /setname\n│ 28. /tagall\n│ 29. /tiktok\n│ 30. /tr\n`;
        menuTxt += `│ 31. /unreg\n│ 32. /update\n`;
        menuTxt += `└─────────────────────────\n\n`;

        menuTxt += `┌──『 💳 **𝒄𝒓𝒆𝒅𝒊𝒕𝒐𝒔** 』\n`;
        menuTxt += `│ 👑 **Creador:** Jhon Guerra\n`;
        menuTxt += `│ 🏗️ **Build:** Jhon System\n`;
        menuTxt += `└─────────────────────────\n\n`;

        menuTxt += `🚀 **𝒔𝒚𝒔𝒕𝒆𝒎:** Escaneo completado.\n`;
        menuTxt += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

        // Envío con la imagen de Postimg
        await sock.sendMessage(from, { 
            image: { url: thumbUrl }, 
            caption: menuTxt,
            mentions: [msg.key.participant || from]
        }, { quoted: msg });
    }
};
