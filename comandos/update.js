const { exec, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'update',
    alias: ['actualizar', 'gitpull'],
    run: async (sock, msg, body, args, isOwner) => {
        // --- FILTRO DE SEGURIDAD (Solo tú: 584142577312) ---
        const ownerNumber = '584142577312';
        const sender = msg.key.participant || msg.key.remoteJid;
        const senderNumber = sender.replace(/[^0-9]/g, '');

        if (senderNumber !== ownerNumber) {
            return sock.sendMessage(msg.key.remoteJid, { 
                text: '❌ *ACCESO DENEGADO:* Solo el Hokage puede actualizar los pergaminos de Konoha.' 
            }, { quoted: msg });
        }

        await sock.sendMessage(msg.key.remoteJid, { 
            text: '🌀 *NARUTO BOT: ACTUALIZACIÓN FORZADA* 🌀\n\n> 📥 _Sincronizando con el repositorio y recargando archivos..._' 
        }, { quoted: msg });

        // --- EJECUCIÓN DE GIT ---
        // Usamos reset --hard para que los cambios en Termux no bloqueen el update
        exec('git fetch --all && git reset --hard origin/main && git pull', async (err, stdout, stderr) => {
            if (err) {
                try {
                    const status = execSync('git status --porcelain').toString();
                    return sock.sendMessage(msg.key.remoteJid, { 
                        text: `⚠️ *CONFLICTO DETECTADO:* \n\n\`\`\`${status}\`\`\`\n\n> Intenta limpiar tu carpeta manualmente.` 
                    }, { quoted: msg });
                } catch (e) {
                    return sock.sendMessage(msg.key.remoteJid, { text: `❌ *ERROR:* ${err.message}` }, { quoted: msg });
                }
            }

            let response = stdout.toString();
            if (response.includes('Already up to date')) {
                return sock.sendMessage(msg.key.remoteJid, { 
                    text: '✨ *NARUTO BOT:* El sistema ya cuenta con la versión más reciente.' 
                }, { quoted: msg });
            }

            // --- MAGIA: HOT RELOAD (Recarga de archivos JS) ---
            // Esta función limpia el caché de Node.js para que use los archivos nuevos
            const reloadModules = (dir) => {
                const files = fs.readdirSync(dir);
                for (const file of files) {
                    const fullPath = path.join(dir, file);
                    if (fs.statSync(fullPath).isDirectory()) {
                        if (!fullPath.includes('node_modules')) reloadModules(fullPath);
                    } else if (file.endsWith('.js')) {
                        const absolutePath = path.resolve(fullPath);
                        delete require.cache[require.resolve(absolutePath)]; // Limpia la RAM
                    }
                }
            };

            try {
                // Recargamos la carpeta de comandos
                const comandosPath = path.join(process.cwd(), 'comandos');
                reloadModules(comandosPath);

                const successMsg = `✅ *ACTUALIZACIÓN EXITOSA* ✅\n\n*REPORTE:* \n\`\`\`${response}\`\`\`\n\n🔥 *SISTEMA RECARGADO:* Los cambios ya están activos sin apagar el bot.`;
                await sock.sendMessage(msg.key.remoteJid, { text: successMsg }, { quoted: msg });

            } catch (e) {
                await sock.sendMessage(msg.key.remoteJid, { 
                    text: `✅ *GIT PULL OK*\n\n⚠️ Error al recargar RAM: ${e.message}\n> Reinicia manualmente si los cambios no se ven.` 
                }, { quoted: msg });
            }
        });
    }
};
