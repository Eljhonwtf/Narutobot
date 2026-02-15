const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'update',
    alias: ['upd', 'actualizar'],
    run: async (sock, msg, body, args, isOwner) => {
        if (!isOwner) return;

        const from = msg.key.remoteJid;

        await sock.sendMessage(from, { 
            text: `🌀 *NARUTO BOT: HOT RELOAD* 🌀\n\n> 🛠️ _Sincronizando pergaminos sin apagar el núcleo..._` 
        }, { quoted: msg });

        // 1. Descargamos los cambios de GitHub
        exec('git reset --hard HEAD && git pull', async (err, stdout, stderr) => {
            if (err) {
                return sock.sendMessage(from, { 
                    text: `❌ *ERROR EN TRANSFERENCIA:* \n\n\`\`\`${err.message}\`\`\`` 
                });
            }

            if (stdout.includes('Already up to date')) {
                return sock.sendMessage(from, { 
                    text: `✨ *NARUTO BOT:* No hay jutsus nuevos en el repositorio.` 
                });
            }

            // 2. RECARGA DE MEMORIA (La magia)
            // Esta función busca todos los archivos en la carpeta comandos y limpia su caché
            const carpetaComandos = path.join(__dirname, '../../comandos'); // Ajusta la ruta si es necesario
            
            const limpiarCache = (dir) => {
                fs.readdirSync(dir).forEach(file => {
                    const fullPath = path.join(dir, file);
                    if (fs.statSync(fullPath).isDirectory()) {
                        limpiarCache(fullPath);
                    } else if (file.endsWith('.js')) {
                        delete require.cache[require.resolve(fullPath)];
                    }
                });
            };

            try {
                limpiarCache(path.join(__dirname, '../')); // Limpia la subcarpeta actual
                // Si tienes los comandos en carpetas separadas, esto limpia TODO lo que esté en /comandos/
                
                const reporte = stdout.slice(0, 500);
                await sock.sendMessage(from, { 
                    text: `✅ *ACTUALIZACIÓN EXITOSA*\n\n*REPORTE:* \n\`\`\`${reporte}\`\`\`\n\n🔥 *SISTEMA RECARGADO:* Los cambios ya están activos sin reiniciar el bot.` 
                }, { quoted: msg });

            } catch (e) {
                await sock.sendMessage(from, { text: `⚠️ Archivos actualizados, pero error al recargar caché: ${e.message}` });
            }
        });
    }
};
