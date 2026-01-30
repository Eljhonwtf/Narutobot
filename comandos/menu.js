const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'menu',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const pushName = msg.pushName || 'Usuario';
        
        // --- Contador dinámico de archivos (Stats Reales) ---
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
        
        // --- IMAGEN ESPECÍFICA ---
        const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg"; 

        // --- ENCABEZADO ESTILO CAPTURA ---
        let menuTxt = `*𝑨𝑫𝑴𝑰𝑵𝑰𝑺𝑻𝑹𝑨𝑪𝑰𝑶𝑵 𝑪𝑬𝑵𝑻𝑹𝑨𝑳*\n`;
        menuTxt += `_Narutobot System_ 🍥\n\n`;
        
        menuTxt += `Hola! Soy *Narutobot* 🍥\n`;
        menuTxt += `¡Bienvenido, *Jhon* 🏴‍☠️!\n\n`;

        // --- CAJA DE INFO SISTEMA ---
        menuTxt += `╭━━━╼〔 📜 *𝑰𝑵𝑭𝑶 𝑺𝑰𝑺𝑻𝑬𝑴𝑨* 〕╼━━━\n`;
        menuTxt += `🍥\n`;
        menuTxt += `┃ ✎ *Pais:* Venezuela 🇻🇪\n`;
        menuTxt += `┃ ✎ *Prefijo:* Multi\n`;
        menuTxt += `┃ ✎ *Estado:* Activo ✅\n`;
        menuTxt += `┃ ✎ *Archivos:* ${totalComandos}\n`;
        menuTxt += `╰━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

        // --- SESIÓN 1: ADMINISTRACIÓN DE GRUPOS ---
        menuTxt += `│ ✎ *𝑨𝑫𝑴𝑰𝑵𝑰𝑺𝑻𝑹𝑨𝑪𝑰𝑶𝑵 𝑫𝑬 𝑮𝑹𝑼𝑷𝑶𝑺*\n`;
        menuTxt += `│\n`;
        menuTxt += `✧ ⚔️ ✝ /admins\n`;
        menuTxt += `│ _Menciona a los administradores._\n`;
        menuTxt += `✧ ⚔️ ✝ /antilink\n`;
        menuTxt += `│ _Activa o desactiva enlaces._\n`;
        menuTxt += `✧ ⚔️ ✝ /kick | ✝ /add\n`;
        menuTxt += `│ _Expulsar o añadir usuarios._\n`;
        menuTxt += `✧ ⚔️ ✝ /promote | ✝ /demote\n`;
        menuTxt += `│ _Dar o quitar admin._\n`;
        menuTxt += `✧ ⚔️ ✝ /tagall | ✝ /hidetag\n`;
        menuTxt += `│ _Menciona a todos._\n`;
        menuTxt += `✧ ⚔️ ✝ /delete\n`;
        menuTxt += `│ _Elimina mensajes del bot._\n`;
        menuTxt += `✧ ⚔️ ✝ /link | ✝ /resetlink\n`;
        menuTxt += `│ _Gestión del enlace del grupo._\n`;
        menuTxt += `✧ ⚔️ ✝ /setname | ✝ /setdesc\n`;
        menuTxt += `│ _Cambiar nombre o descripción._\n`;
        menuTxt += `✧ ⚔️ ✝ /infogp\n`;
        menuTxt += `│ _Información del grupo._\n`;
        menuTxt += `✧ ⚔️ ✝ /join | ✝ /out\n`;
        menuTxt += `│ _Unirse o salir de un chat._\n`;
        menuTxt += `│\n`;

        // --- SESIÓN 2: UTILIDADES Y SISTEMA ---
        menuTxt += `» °9•(🛰️)• ÷ *𝑼𝑻𝑰𝑳𝑰𝑫𝑨𝑫𝑬𝑺 & 𝑺𝒀𝑺𝑻𝑬𝑴* ÷\n`;
        menuTxt += `│\n`;
        menuTxt += `✧ 🛰️ ✝ /info | ✝ /ping\n`;
        menuTxt += `│ _Velocidad y estado del bot._\n`;
        menuTxt += `✧ 🛰️ ✝ /ia | ✝ /tr\n`;
        menuTxt += `│ _Inteligencia Artificial y Traductor._\n`;
        menuTxt += `✧ 🛰️ ✝ /menu | ✝ /listcm\n`;
        menuTxt += `│ _Panel principal y lista._\n`;
        menuTxt += `✧ 🛰️ ✝ /perfil\n`;
        menuTxt += `│ _Ver tu perfil de usuario._\n`;
        menuTxt += `✧ 🛰️ ✝ /update | ✝ /fix\n`;
        menuTxt += `│ _Actualizar y corregir errores._\n`;
        menuTxt += `✧ 🛰️ ✝ /listgp | ✝ /ext\n`;
        menuTxt += `│ _Lista de grupos y extensiones._\n`;
        menuTxt += `│\n`;

        // --- SESIÓN 3: DIVERSIÓN Y OTROS ---
        menuTxt += `» °9•(🎮)• ÷ *𝒁𝑶𝑵𝑨 𝑴𝑰𝑿* ÷\n`;
        menuTxt += `│\n`;
        menuTxt += `✧ 🎮 ✝ /ppt\n`;
        menuTxt += `│ _Piedra, Papel o Tijera._\n`;
        menuTxt += `✧ 🎮 ✝ /doxeo\n`;
        menuTxt += `│ _Comando de broma (fake)._\n`;
        menuTxt += `✧ 🎮 ✝ /tiktok\n`;
        menuTxt += `│ _Descargas de TikTok._\n`;
        menuTxt += `✧ 🎮 ✝ /bug | ✝ /bc\n`;
        menuTxt += `│ _Reportar error o Broadcast._\n`;
        menuTxt += `✧ 🎮 ✝ /autodm | ✝ /unreg\n`;
        menuTxt += `│ _Auto MD y anular registro._\n`;
        menuTxt += `│\n`;

        menuTxt += `🚀 *𝒔𝒚𝒔𝒕𝒆𝒎:* Escaneo completado.\n`;
        menuTxt += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

        await sock.sendMessage(from, { 
            image: { url: thumbUrl }, 
            caption: menuTxt,
            mentions: [msg.key.participant || from]
        }, { quoted: msg });
    }
};
