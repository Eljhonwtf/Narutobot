const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'listcmd',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        // 1. REACCIÓN INICIAL (Si no hace esto, el bot no cargó el comando)
        await sock.sendMessage(from, { react: { text: "📂", key: msg.key } });

        if (!isOwner) return;

        try {
            // Buscamos la carpeta 'comandos' desde la raíz del proyecto
            const folderPath = path.join(process.cwd(), 'comandos');
            
            // Si no existe, probamos con la ruta relativa clásica
            const finalPath = fs.existsSync(folderPath) ? folderPath : path.join(__dirname);
            
            const files = fs.readdirSync(finalPath).filter(f => f.endsWith('.js'));

            // --- DISEÑO HÍBRIDO (Títulos pro / Texto normal) ---
            let txt = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒄𝒐𝒎𝒎𝒂𝒏𝒅 𝒄𝒆𝒏𝒕𝒆𝒓** 🏌🏽‍♂️ 』\n\n`;
            
            txt += `┌──『 📊 **𝒔𝒕𝒂𝒕𝒔** 』\n`;
            txt += `│ 📂 Total: ${files.length} comandos\n`;
            txt += `│ ⚡ Estado: Online\n`;
            txt += `└─────────────────────────\n\n`;

            txt += `┌──『 🛠️ **𝒊𝒏𝒗𝒆𝒏𝒕𝒂𝒓𝒊𝒐** 』\n`;
            files.forEach((file, i) => {
                txt += `│ ${i + 1}. /${file.replace('.js', '')}\n`;
            });
            txt += `└─────────────────────────\n\n`;
            
            txt += `🚀 **𝒔𝒚𝒔𝒕𝒆𝒎:** Escaneo completado.\n`;
            txt += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

            await sock.sendMessage(from, { 
                text: txt,
                contextInfo: {
                    externalAdReply: {
                        title: "🛰️ 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒅𝒂𝒕𝒂𝒃𝒂𝒔𝒆",
                        body: "Módulos cargados correctamente",
                        mediaType: 1,
                        renderLargerThumbnail: false
                    }
                }
            }, { quoted: msg });

        } catch (e) {
            await sock.sendMessage(from, { text: "❌ Error al leer comandos: " + e.message });
        }
    }
};
