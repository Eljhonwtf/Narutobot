const { exec } = require('child_process');

module.exports = {
    name: 'update',
    alias: ['actualizar', 'upgrade'],
    run: async (sock, msg, body, args, isOwner) => {
        // Validación de Seguridad
        if (!isOwner) return;

        const from = msg.key.remoteJid;

        // Reacción de inicio
        await sock.sendMessage(from, { react: { text: "⚙️", key: msg.key } });

        await sock.sendMessage(from, { 
            text: `⚔️ *WARLORD SYSTEM: UPDATE* ⚔️\n\n> 📥 _Extrayendo datos del servidor central..._` 
        }, { quoted: msg });

        // Ejecutamos una limpieza y luego el pull para evitar que se trabe
        // 'git fetch --all && git reset --hard origin/main' es para forzar si hay errores
        exec('git pull', (err, stdout, stderr) => {
            if (err) {
                return sock.sendMessage(from, { 
                    text: `❌ *CRITICAL ERROR*\n\n> *Detalle:* \n\`\`\`${err.message}\`\`\`` 
                });
            }

            if (stdout.includes('Already up to date.')) {
                return sock.sendMessage(from, { 
                    text: `🛡️ *WARLORD STATUS*\n\nEl sistema ya se encuentra en su versión más letal. No hay parches nuevos.` 
                });
            }

            // Reporte de archivos modificados
            const cambios = stdout.split('\n').filter(line => line.includes('|') || line.includes('changed')).join('\n');

            const mensajeFinal = `✅ *SISTEMA ACTUALIZADO* ✅\n\n` +
                `┏━━━━〔 📊 *INFORME* 〕━━━━┓\n\n` +
                `📂 *ARCHIVOS:* \n\`\`\`${cambios}\`\`\`\n\n` +
                `👤 *OPERADOR:* JHON\n` +
                `┗━━━━━━━━━━━━━━━━━━━━┛\n\n` +
                `🚀 *Reiniciando sistema en 3 segundos...*`;

            sock.sendMessage(from, { text: mensajeFinal }, { quoted: msg });

            // Reinicio automático (Solo si usas 'pm2' o un script 'start.sh')
            setTimeout(() => {
                process.exit();
            }, 3000);
        });
    }
};
