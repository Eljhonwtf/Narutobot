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
            text: `🌀 *NARUTOBOT: SYNCHRONIZATION* 🌀\n\n> 🛠️ _Invocando cambios desde el repositorio oficial..._` 
        }, { quoted: msg });

        // Ejecutamos git pull desde la raíz del bot
        exec('git pull', async (err, stdout, stderr) => {
            if (err) {
                return sock.sendMessage(from, { 
                    text: `❌ *ERROR DE CONEXIÓN:* \n\n\`\`\`${err.message}\`\`\`` 
                });
            }

            if (stdout.includes('Already up to date')) {
                return sock.sendMessage(from, { 
                    text: `✨ *NARUTOBOT:* El sistema ya está utilizando el último pergamino disponible (Sin cambios).` 
                });
            }

            // --- RECARGA DE MEMORIA DINÁMICA ---
            // Buscamos la carpeta de comandos relativa a este archivo
            const carpetaComandos = path.join(__dirname, '../'); // Sube un nivel a /comandos/

            const limpiarCache = (dir) => {
                if (!fs.existsSync(dir)) return;
                fs.readdirSync(dir).forEach(file => {
                    const fullPath = path.join(dir, file);
                    if (fs.statSync(fullPath).isDirectory()) {
                        limpiarCache(fullPath);
                    } else if (file.endsWith('.js')) {
                        // Borramos la memoria vieja para que el bot lea el archivo nuevo
                        delete require.cache[require.resolve(fullPath)];
                    }
                });
            };

            try {
                limpiarCache(carpetaComandos); 
                
                const reporte = stdout.slice(0, 500);
                await sock.sendMessage(from, { 
                    text: `✅ *ACTUALIZACIÓN COMPLETADA*\n\n*REPORTE:* \n\`\`\`${reporte}\`\`\`\n\n🔥 *JUTSUS RECARGADOS:* He actualizado la memoria caché. Los cambios en comandos ya están listos para usar.` 
                }, { quoted: msg });

            } catch (e) {
                await sock.sendMessage(from, { text: `⚠️ Pergaminos bajados, pero hubo un error al recargar la memoria: ${e.message}` });
            }
        });
    }
};