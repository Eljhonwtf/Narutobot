const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'menu',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const pushName = msg.pushName || 'Usuario';
        
        // --- Contador dinámico de archivos ---
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

        let menuTxt = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎** 🏌🏽‍♂️ 』\n\n`;
        
        menuTxt += `│ 📂 **Total:** ${totalComandos} archivos\n`;
        menuTxt += `│ ⚡ **Estado:** Online\n\n`;

        // --- SECCIÓN: ADMINISTRACIÓN ---
        menuTxt += `│ ✎ **𝑨𝑫𝑴𝑰𝑵𝑰𝑺𝑻𝑹𝑨𝑪𝑰𝑶𝑵 𝑫𝑬 𝑮𝑹𝑼𝑷𝑶𝑺**\n`;
        menuTxt += `│\n`;
        menuTxt += `✧ ⚔️ ✝ /admins | ✝ /tagall\n`;
        menuTxt += `│ _Menciona a los miembros/admins._\n`;
        menuTxt += `✧ ⚔️ ✝ /kick | ✝ /join | ✝ /out\n`;
        menuTxt += `│ _Gestionar entrada/salida de usuarios._\n`;
        menuTxt += `✧ ⚔️ ✝ /promote | ✝ /demote\n`;
        menuTxt += `│ _Cambiar rangos de usuario._\n`;
        menuTxt += `✧ ⚔️ ✝ /antilink | ✝ /resetlink\n`;
        menuTxt += `│ _Seguridad y enlaces del grupo._\n`;
        menuTxt += `✧ ⚔️ ✝ /setname | ✝ /setdesc\n`;
        menuTxt += `│ _Configurar info del grupo._\n`;
        menuTxt += `✧ ⚔️ ✝ /delete | ✝ /hidetag\n`;
        menuTxt += `│ _Limpieza y menciones ocultas._\n`;
        menuTxt += `│\n`;

        // --- SECCIÓN: UTILIDADES & IA ---
        menuTxt += `» °9•(🛰️)• ÷ **𝑼𝑻𝑰𝑳𝑰𝑫𝑨𝑫𝑬𝑺 & 𝑰𝑨** ÷\n`;
        menuTxt += `│\n`;
        menuTxt += `✧ 🛰️ ✝ /ia | ✝ /tr\n`;
        menuTxt += `│ _Inteligencia artificial y traductor._\n`;
        menuTxt += `✧ 🛰️ ✝ /ping | ✝ /update | ✝ /fix\n`;
        menuTxt += `│ _Estado del bot y mantenimiento._\n`;
        menuTxt += `✧ 🛰️ ✝ /info | ✝ /infogp | ✝ /perfil\n`;
        menuTxt += `│ _Información detallada._\n`;
        menuTxt += `✧ 🛰️ ✝ /link | ✝ /listgp | ✝ /listcm\n`;
        menuTxt += `│ _Listados y enlaces rápidos._\n`;
        menuTxt += `│\n`;

        // --- SECCIÓN: ENTRETENIMIENTO ---
        menuTxt += `» °9•(🎮)• ÷ **𝑫𝑰𝑽𝑬𝑹𝑺𝑰𝑶𝑵** ÷\n`;
        menuTxt += `│\n`;
        menuTxt += `✧ 🎮 ✝ /ppt | ✝ /doxeo\n`;
        menuTxt += `│ _Juegos y comandos de broma._\n`;
        menuTxt += `✧ 🎮 ✝ /tiktok | ✝ /bug\n`;
        menuTxt += `│ _Descargas y reportes._\n`;
        menuTxt += `✧ 🎮 ✝ /unreg | ✝ /autodm | ✝ /bc\n`;
        menuTxt += `│ _Otros servicios del sistema._\n`;
        menuTxt += `│\n`;

        menuTxt += `🚀 **𝒔𝒚𝒔𝒕𝒆𝒎:** Escaneo completado.\n`;
        menuTxt += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

        await sock.sendMessage(from, { 
            text: menuTxt,
            mentions: [msg.key.participant || from]
        }, { quoted: msg });
    }
};
