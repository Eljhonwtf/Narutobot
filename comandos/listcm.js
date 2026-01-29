const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'listcmd',
    description: '𝒊𝒏𝒗𝒆𝒏𝒕𝒂𝒓𝒊𝒐 𝒅𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐𝒔',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        // 1. BLOQUEO DE SEGURIDAD
        if (!isOwner) {
            await sock.sendMessage(from, { react: { text: "💀", key: msg.key } });
            return await sock.sendMessage(from, { 
                text: `『 🚫 **𝒂𝒄𝒄𝒆𝒔𝒐 𝒅𝒆𝒏𝒆𝒈𝒂𝒅𝒐** 』\n\nIntento de intrusión detectado. Solo el dueño tiene acceso al núcleo.` 
            }, { quoted: msg });
        }

        try {
            // 2. LECTURA DE ARCHIVOS
            const dirPath = path.join(__dirname); 
            const archivos = fs.readdirSync(dirPath).filter(file => file.endsWith('.js'));
            
            await sock.sendMessage(from, { react: { text: "📂", key: msg.key } });

            // 3. DISEÑO HÍBRIDO (FUENTES COMBINADAS)
            let lista = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒄𝒐𝒎𝒎𝒂𝒏𝒅 𝒄𝒆𝒏𝒕𝒆𝒓** 🏌🏽‍♂️ 』\n\n`;
            
            lista += `┌──『 📊 **𝒔𝒕𝒂𝒕𝒔** 』\n`;
            lista += `│ 📂 Total cmds: ${archivos.length}\n`;
            lista += `│ ⚡ Estado: Operativo\n`;
            lista += `└─────────────────────────\n\n`;

            lista += `┌──『 🛠️ **𝒊𝒏𝒗𝒆𝒏𝒕𝒂𝒓𝒊𝒐** 』\n`;
            
            archivos.forEach((file, index) => {
                const nombreCmd = file.replace('.js', '');
                // Número y comando en fuente normal para lectura rápida
                lista += `│ [${index + 1}] ──> /${nombreCmd}\n`;
            });

            lista += `└─────────────────────────\n\n`;
            lista += `🚀 **𝒔𝒚𝒔𝒕𝒆𝒎:** Sincronización completada.\n`;
            lista += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

            // 4. ENVÍO TÁCTICO
            await sock.sendMessage(from, { 
                text: lista,
                contextInfo: {
                    externalAdReply: {
                        title: "🛰️ 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒏𝒆𝒕𝒘𝒐𝒓𝒌",
                        body: `${archivos.length} módulos detectados`,
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: false
                    }
                }
            }, { quoted: msg });

        } catch (err) {
            console.error("Error en listcmd:", err);
            await sock.sendMessage(from, { 
                text: `『 ❌ **𝒆𝒓𝒓𝒐𝒓 𝒄𝒓𝒊𝒕𝒊𝒄𝒂𝒍** 』\n\nNo se pudo leer el directorio de comandos.` 
            });
        }
    }
};
