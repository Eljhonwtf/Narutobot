const { exec, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'update',
    alias: ['actualizar', 'gitpull'],
    run: async (sock, msg, body, args, isOwner) => {
        // --- VALIDACIÓN DE IDENTIDAD ---
        const ownerNumber = '584142577312';
        // Obtenemos el número del que envía y limpiamos todo lo que no sea número
        const sender = msg.key.participant || msg.key.remoteJid;
        const senderNumber = sender.replace(/[^0-9]/g, '');

        if (senderNumber !== ownerNumber) {
            return sock.sendMessage(msg.key.remoteJid, { 
                text: '❌ *ACCESO DENEGADO:* Solo el Hokage puede actualizar los pergaminos de Konoha.' 
            }, { quoted: msg });
        }

        await sock.sendMessage(msg.key.remoteJid, { 
            text: '🌀 *NARUTO BOT: REGENERACIÓN DE JUTSUS* 🌀\n\n> 📥 _Sincronizando con el repositorio..._' 
        }, { quoted: msg });

        // --- PROCESO DE ACTUALIZACIÓN ---
        // Usamos reset --hard para evitar los errores de conflicto que viste en tus fotos anteriores
        exec('git fetch --all && git reset --hard origin/main && git pull', async (err, stdout, stderr) => {
            if (err) {
                return sock.sendMessage(msg.key.remoteJid, { 
                    text: `❌ *ERROR EN EL PERGAMINO:* \n\n\`\`\`${err.message}\`\`\`` 
                }, { quoted: msg });
            }

            let response = stdout.toString();
            if (response.includes('Already up to date')) {
                return sock.sendMessage(msg.key.remoteJid, { 
                    text: '✨ *NARUTO BOT:* El sistema ya está en su versión más reciente.' 
                }, { quoted: msg });
            }

            // --- HOT RELOAD: RECARGA DE MÓDULOS ---
            // Esta función obliga al bot a leer los archivos nuevos sin reiniciarse
            const reloadModules = (dir) => {
                const files = fs.readdirSync(dir);
                for (const file of files) {
                    const fullPath = path.join(dir, file);
                    if (fs.statSync(fullPath).isDirectory()) {
                        if (!fullPath.includes('node_modules')) reloadModules(fullPath);
                    } else if (file.endsWith('.js')) {
                        const absolutePath = path.resolve(fullPath);
                        // Borramos el caché de Node.js para este archivo
                        delete require.cache[require.resolve(absolutePath)];
                    }
                }
            };

            try {
                // Aplicamos la recarga a la carpeta de comandos
                const comandosPath = path.join(process.cwd(), 'comandos');
                reloadModules(comandosPath);

                const successMsg = `✅ *ACTUALIZACIÓN EXITOSA* ✅\n\n*ESTADO:* \n\`\`\`${response}\`\`\`\n\n🔥 *HOT RELOAD:* Todos los comandos han sido recargados en memoria.`;
                
                await sock.sendMessage(msg.key.remoteJid, { 
                    text: successMsg,
                    contextInfo: {
                        externalAdReply: {
                            title: 'NARUTO BOT V3.1',
                            body: 'Sistema Actualizado',
                            thumbnailUrl: 'https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg',
                            sourceUrl: 'https://github.com'
                        }
                    }
                }, { quoted: msg });

            } catch (e) {
                await sock.sendMessage(msg.key.remoteJid, { 
                    text: `✅ *GIT PULL OK*\n\n⚠️ Error al recargar RAM: ${e.message}\n> _Reinicia manualmente para aplicar cambios._` 
                }, { quoted: msg });
            }
        });
    }
};
