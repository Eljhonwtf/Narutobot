const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'listcm', // Nombre exacto corregido
    description: '𝒊𝒏𝒗𝒆𝒏𝒕𝒂𝒓𝒊𝒐 𝒅𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐𝒔',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        // 1. REACCIÓN INICIAL
        await sock.sendMessage(from, { react: { text: "📂", key: msg.key } });

        if (!isOwner) return;

        try {
            // 2. RUTA A LA CARPETA 'comandos'
            const carpetaComandos = path.join(process.cwd(), 'comandos');
            
            // Si por alguna razón la ruta falla, usa la carpeta actual
            const finalPath = fs.existsSync(carpetaComandos) ? carpetaComandos : __dirname;
            const archivos = fs.readdirSync(finalPath).filter(file => file.endsWith('.js'));
            
            // 3. DISEÑO HÍBRIDO (Títulos pro / Texto normal)
            let lista = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒄𝒐𝒎𝒎𝒂𝒏𝒅 𝒄𝒆𝒏𝒕𝒆𝒓** 🏌🏽‍♂️ 』\n\n`;
            
            lista += `┌──『 📊 **𝒔𝒕𝒂𝒕𝒔** 』\n`;
            lista += `│ 📂 Total: ${archivos.length} comandos\n`;
            lista += `│ ⚡ Estado: Online\n`;
            lista += `└─────────────────────────\n\n`;

            lista += `┌──『 🛠️ **𝒊𝒏𝒗𝒆𝒏𝒕𝒂𝒓𝒊𝒐** 』\n`;
            
            archivos.forEach((file, index) => {
                const nombreCmd = file.replace('.js', '');
                lista += `│ ${index + 1}. /${nombreCmd}\n`;
            });

            lista += `└─────────────────────────\n\n`;
            lista += `🚀 **𝒔𝒚𝒔𝒕𝒆𝒎:** Escaneo completado.\n`;
            lista += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

            // 4. ENVÍO DE DATOS
            await sock.sendMessage(from, { 
                text: lista,
                contextInfo: {
                    externalAdReply: {
                        title: "🛰️ 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒅𝒂𝒕𝒂𝒃𝒂𝒔𝒆",
                        body: "Módulos de comandos cargados",
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: false
                    }
                }
            }, { quoted: msg });

        } catch (err) {
            console.error(err);
            await sock.sendMessage(from, { 
                text: `『 ❌ **𝒆𝒓𝒓𝒐𝒓 𝒄𝒓𝒊𝒕𝒊𝒄𝒂𝒍** 』\n\nFallo al leer la carpeta "comandos".` 
            }, { quoted: msg });
        }
    }
};
