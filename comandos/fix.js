const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'clearbug',
    description: '𝒍𝒊𝒎𝒑𝒊𝒆𝒛𝒂 𝒅𝒆𝒍 𝒓𝒆𝒈𝒊𝒔𝒕𝒓𝒐 𝒅𝒆 𝒆𝒓𝒓𝒐𝒓𝒆𝒔',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        // Bloqueo de seguridad para el sistema
        if (!isOwner) return; 

        const filePath = path.join(__dirname, '../fallas.txt');
        
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Borra el registro

            // --- DISEÑO DE INTERFAZ DE LIMPIEZA ---
            let cleanMsg = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒎𝒂𝒊𝒏𝒕𝒆𝒏𝒂𝒏𝒄𝒆** 🏌🏽‍♂️ 』\n`;
            cleanMsg += `╔════════════════════════╗\n`;
            cleanMsg += `  ✨ **𝒆𝒔𝒕𝒂𝒅𝒐:** 𝒍𝒊𝒎𝒑𝒊𝒆𝒛𝒂 𝒆𝒙𝒊𝒕𝒐𝒔𝒂\n`;
            cleanMsg += `  📂 **𝒂𝒓𝒄𝒉𝒊𝒗𝒐:** 𝒇𝒂𝒍𝒍𝒂𝒔.𝒕𝒙𝒕\n`;
            cleanMsg += `  🗑️ **𝒂𝒄𝒄𝒊𝒐́𝒏:** 𝒑𝒖𝒓𝒈𝒂 𝒄𝒐𝒎𝒑𝒍𝒆𝒕𝒂\n`;
            cleanMsg += `╚════════════════════════╝\n\n`;
            cleanMsg += `> 𝒕𝒐𝒅𝒐 𝒆𝒔𝒕𝒂́ 𝒍𝒊𝒎𝒑𝒊𝒐 𝒚 𝒐𝒑𝒕𝒊𝒎𝒊𝒛𝒂𝒅𝒐, 𝒋𝒆𝒇𝒆. 🚀\n\n`;
            cleanMsg += `🏌🏽‍♂️ _𝒔𝒊𝒔𝒕𝒆𝒎𝒂 𝒓𝒆𝒔𝒕𝒂𝒖𝒓𝒂𝒅𝒐 𝒑𝒐𝒓 𝒋𝒉𝒐𝒏 𝒔𝒚𝒔𝒕𝒆𝒎_`;

            await sock.sendMessage(from, { text: cleanMsg }, { quoted: msg });
            await sock.sendMessage(from, { react: { text: "🧹", key: msg.key } });

        } else {
            // Diseño para estado vacío
            let emptyMsg = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎** 🏌🏽‍♂️ 』\n`;
            emptyMsg += `┌─────────────────────────\n`;
            emptyMsg += `│ ⚠️ **𝒂𝒗𝒊𝒔𝒐:** 𝒏𝒐 𝒉𝒂𝒚 𝒏𝒂𝒅𝒂 𝒒𝒖𝒆 𝒍𝒊𝒎𝒑𝒊𝒂𝒓.\n`;
            emptyMsg += `│ 📂 **𝒓𝒆𝒈𝒊𝒔𝒕𝒓𝒐:** 𝒗𝒂𝒄𝒊́𝒐\n`;
            emptyMsg += `└─────────────────────────\n\n`;
            emptyMsg += `🚀 _𝒆𝒍 𝒔𝒊𝒔𝒕𝒆𝒎𝒂 𝒚𝒂 𝒔𝒆 𝒆𝒏𝒄𝒖𝒆𝒏𝒕𝒓𝒂 𝒐𝒑𝒕𝒊𝒎𝒊𝒛𝒂𝒅𝒐._`;

            await sock.sendMessage(from, { text: emptyMsg }, { quoted: msg });
            await sock.sendMessage(from, { react: { text: "🏌🏽‍♂️", key: msg.key } });
        }
    }
};
