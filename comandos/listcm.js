const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'listcm',
    description: 'Inventario de comandos',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        // 1. REACCIÓN DE CONFIRMACIÓN
        await sock.sendMessage(from, { react: { text: "🛰️", key: msg.key } });

        if (!isOwner) return;

        try {
            // 2. RUTA SIMPLE A CARPETA COMANDOS
            const folderPath = path.join(process.cwd(), 'comandos');
            
            if (!fs.existsSync(folderPath)) {
                return await sock.sendMessage(from, { text: "❌ Error: Carpeta 'comandos' no encontrada." });
            }

            // 3. LEER ARCHIVOS (Solo primer nivel para asegurar que responda)
            const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.js'));
            
            // 4. CONSTRUCCIÓN DEL MENSAJE (Diseño Híbrido)
            let txt = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎 𝒄𝒐𝒓𝒆** 🏌🏽‍♂️ 』\n\n`;
            
            txt += `┌──『 📊 **𝒔𝒕𝒂𝒕𝒔** 』\n`;
            txt += `│ 📂 Total: ${files.length} archivos\n`;
            txt += `│ ⚡ Estado: Online\n`;
            txt += `└─────────────────────────\n\n`;

            txt += `┌──『 🛠️ **𝒊𝒏𝒗𝒆𝒏𝒕𝒂𝒓𝒊𝒐** 』\n`;
            
            files.forEach((file, i) => {
                txt += `│ ${i + 1}. /${file.replace('.js', '')}\n`;
            });

            txt += `└─────────────────────────\n\n`;
            txt += `🚀 **𝒔𝒚𝒔𝒕𝒆𝒎:** Escaneo completado.\n`;
            txt += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

            // 5. ENVÍO SIMPLE (Sin externalAdReply para descartar errores ahí)
            await sock.sendMessage(from, { text: txt }, { quoted: msg });

        } catch (e) {
            console.log(e);
            await sock.sendMessage(from, { text: "❌ Error interno: " + e.message });
        }
    }
};
