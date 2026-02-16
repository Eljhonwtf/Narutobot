const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'hotreload',
    alias: ['hr', 'recargar', 'actualizar'],
    run: async (sock, msg, body, args, isOwner) => {
        // 1. Verificación de Seguridad (Solo el Hokage)
        if (!isOwner) return;

        const from = msg.key.remoteJid;

        await sock.sendMessage(from, { 
            text: `🌀 *NARUTO BOT: REGENERACIÓN TOTAL* 🌀\n\n> 📥 _Sincronizando pergaminos y recargando chakra del sistema..._` 
        }, { quoted: msg });

        // 2. Ejecutar Git para bajar cambios de forma segura
        // Usamos reset --hard para limpiar cualquier residuo local
        exec('git fetch --all && git reset --hard origin/main && git pull', async (err, stdout, stderr) => {
            if (err) {
                return sock.sendMessage(from, { 
                    text: `❌ *ERROR DE SINCRONIZACIÓN:* \n\n\`\`\`${err.message}\`\`\`` 
                }, { quoted: msg });
            }

            if (stdout.includes('Already up to date')) {
                return sock.sendMessage(from, { 
                    text: `✨ *NARUTO BOT:* Todos los jutsus ya están en su versión más reciente.` 
                }, { quoted: msg });
            }

            // 3. LA MAGIA: Limpieza profunda del Caché de Node.js
            // Esta función recorre tus archivos y obliga al bot a "olvidar" el código viejo
            const purgarMemoria = (dir) => {
                const archivos = fs.readdirSync(dir);
                for (const archivo of archivos) {
                    const rutaFull = path.join(dir, archivo);
                    if (fs.statSync(rutaFull).isDirectory()) {
                        purgarMemoria(rutaFull); // Recurrsivo para subcarpetas
                    } else if (archivo.endsWith('.js')) {
                        // Eliminamos la referencia del archivo en la RAM
                        delete require.cache[require.resolve(rutaFull)];
                    }
                }
            };

            try {
                // Limpiamos la carpeta de comandos y archivos base
                const rutaComandos = path.join(__dirname, '../'); 
                purgarMemoria(rutaComandos);

                // Reporte visual de la actualización
                const cambios = stdout.split('\n').filter(line => line.includes('|') || line.includes('changed')).join('\n');

                await sock.sendMessage(from, { 
                    text: `✅ *ACTUALIZACIÓN Y RECARGA EXITOSA* ✅\n\n` +
                        `┏━━━━〔 📊 *CAMBIOS* 〕━━━━┓\n\n` +
                        `📂 *ARCHIVOS MODIFICADOS:* \n\`\`\`${cambios}\`\`\`\n\n` +
                        `🚀 *ESTADO:* Chakra recargado. Los comandos nuevos ya están activos.\n` +
                        `┗━━━━━━━━━━━━━━━━━━━━┛`
                }, { quoted: msg });

            } catch (e) {
                await sock.sendMessage(from, { 
                    text: `⚠️ Archivos bajados, pero hubo un error al recargar la memoria: ${e.message}` 
                }, { quoted: msg });
            }
        });
    }
};
