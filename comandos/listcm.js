const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'listcm',
    description: '𝒊𝒏𝒗𝒆𝒏𝒕𝒂𝒓𝒊𝒐 𝒕𝒐𝒕𝒂𝒍 𝒅𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐𝒔',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        // Reacción de procesando
        await sock.sendMessage(from, { react: { text: "🛰️", key: msg.key } });

        if (!isOwner) return;

        // Función recursiva para listar todo (Igual que tu Index)
        const obtenerTodosLosCmds = (dir, listaArchivos = []) => {
            const archivos = fs.readdirSync(dir);
            for (const archivo of archivos) {
                const rutaFull = path.join(dir, archivo);
                if (fs.statSync(rutaFull).isDirectory()) {
                    obtenerTodosLosCmds(rutaFull, listaArchivos);
                } else if (archivo.endsWith('.js')) {
                    listaArchivos.push(archivo.replace('.js', ''));
                }
            }
            return listaArchivos;
        };

        try {
            const dirComandos = path.join(process.cwd(), 'comandos');
            
            if (!fs.existsSync(dirComandos)) {
                return await sock.sendMessage(from, { text: "❌ La carpeta 'comandos' no existe." });
            }

            const todosLosCmds = obtenerTodosLosCmds(dirComandos);

            // --- DISEÑO HÍBRIDO (NARUTOBOT STYLE) ---
            let txt = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎 𝒄𝒐𝒓𝒆** 🏌🏽‍♂️ 』\n\n`;
            
            txt += `┌──『 📊 **𝒔𝒕𝒂𝒕𝒔** 』\n`;
            txt += `│ 📂 Total: ${todosLosCmds.length} comandos cargados\n`;
            txt += `│ ⚡ Estado: Online\n`;
            txt += `└─────────────────────────\n\n`;

            txt += `┌──『 🛠️ **𝒍𝒊𝒔𝒕𝒂 𝒅𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐𝒔** 』\n`;
            
            // Listar alfabéticamente para que se vea ordenado
            todosLosCmds.sort().forEach((cmd, i) => {
                txt += `│ ${i + 1}. /${cmd}\n`;
            });

            txt += `└─────────────────────────\n\n`;
            txt += `🚀 **𝒔𝒚𝒔𝒕𝒆𝒎:** Base de datos escaneada.\n`;
            txt += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

            await sock.sendMessage(from, { 
                text: txt,
                contextInfo: {
                    externalAdReply: {
                        title: "🛰️ 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒅𝒂𝒕𝒂-𝒄𝒆𝒏𝒕𝒆𝒓",
                        body: "Inventario de módulos completo",
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: false
                    }
                }
            }, { quoted: msg });

        } catch (e) {
            console.error(e);
            await sock.sendMessage(from, { text: "❌ Error al mapear comandos: " + e.message });
        }
    }
};
