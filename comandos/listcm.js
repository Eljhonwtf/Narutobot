const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'listcmd',
    description: '𝒊𝒏𝒗𝒆𝒏𝒕𝒂𝒓𝒊𝒐 𝒅𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐𝒔',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        // Reacción inmediata para confirmar recepción
        await sock.sendMessage(from, { react: { text: "📂", key: msg.key } });

        if (!isOwner) {
            return await sock.sendMessage(from, { 
                text: `『 🚫 **𝒂𝒄𝒄𝒆𝒔𝒐 𝒅𝒆𝒏𝒆𝒈𝒂𝒅𝒐** 』\n\nEste archivo está encriptado. Solo el dueño tiene acceso.` 
            }, { quoted: msg });
        }

        try {
            // Localizamos la carpeta 'comandos' de forma dinámica
            const carpetaComandos = path.join(process.cwd(), 'comandos');
            
            if (!fs.existsSync(carpetaComandos)) {
                return await sock.sendMessage(from, { 
                    text: `『 ❌ **𝒆𝒓𝒓𝒐𝒓 𝒅𝒆 𝒓𝒖𝒕𝒂** 』\n\nNo encontré la carpeta "comandos". Verifica el nombre.` 
                }, { quoted: msg });
            }

            const archivos = fs.readdirSync(carpetaComandos).filter(file => file.endsWith('.js'));
            
            // --- DISEÑO HÍBRIDO ---
            let lista = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒄𝒐𝒎𝒎𝒂𝒏𝒅 𝒄𝒆𝒏𝒕𝒆𝒓** 🏌🏽‍♂️ 』\n\n`;
            
            lista += `┌──『 📊 **𝒔𝒕𝒂𝒕𝒔** 』\n`;
            lista += `│ 📂 Total: ${archivos.length} archivos\n`;
            lista += `│ ⚡ Estado: Online\n`;
            lista += `└─────────────────────────\n\n`;

            lista += `┌──『 🛠️ **𝒊𝒏𝒗𝒆𝒏𝒕𝒂𝒓𝒊𝒐** 』\n`;
            
            archivos.forEach((file, index) => {
                const nombreCmd = file.replace('.js', '');
                lista += `│ ${index + 1}. /${nombreCmd}\n`;
            });

            lista += `└─────────────────────────\n\n`;
            lista += `🚀 **𝒔𝒚𝒔𝒕𝒆𝒎:** Escaneo de sector completado.\n`;
            lista += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

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
                text: `『 ❌ **𝒆𝒓𝒓𝒐𝒓 𝒄𝒓𝒊𝒕𝒊𝒄𝒂𝒍** 』\n\nHubo un fallo al leer la carpeta "comandos".` 
            }, { quoted: msg });
        }
    }
};
