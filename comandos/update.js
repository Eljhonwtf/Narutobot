const { exec } = require('child_process');

module.exports = {
    name: 'update',
    alias: ['actualizar', 'fixbot', 'upgrade'],
    category: 'owner',
    run: async (sock, msg, body, args, isOwner) => {
        if (!isOwner) return;

        const from = msg.key.remoteJid;

        // 1er Mensaje: Inicio de la secuencia
        await sock.sendMessage(from, { 
            text: `⚙️ *𝐍𝐀𝐑𝐔𝐓𝐎𝐁𝐎𝐓 𝐂𝐎𝐍𝐍𝐄𝐂𝐓*\n\n> 📥 _Sincronizando con el núcleo del repositorio..._` 
        }, { quoted: msg });

        exec('git pull', (err, stdout, stderr) => {
            if (err) {
                return sock.sendMessage(from, { 
                    text: `❌ *𝐒𝐘𝐒𝐓𝐄𝐌 𝐅𝐀𝐈𝐋𝐔𝐑𝐄*\n\n> *Error detectado:* \n\`\`\`${err.message}\`\`\`` 
                });
            }

            if (stdout.includes('Already up to date')) {
                return sock.sendMessage(from, { 
                    text: `💎 *𝐒𝐘𝐒𝐓𝐄𝐌 𝐒𝐓𝐀𝐓𝐔𝐒*\n\nEl sistema ya opera en la versión más estable y reciente.` 
                });
            }

            // --- PROCESAMIENTO DE DATOS ---
            const stats = stdout.split('\n').filter(line => line.includes('changed') || line.includes('insertion') || line.includes('deletion')).join('\n');
            const archivos = stdout.split('\n').filter(line => line.includes('|')).join('\n');

            // --- DISEÑO FINAL MEJORADO ---
            const mensajeFinal = `✨ *𝐍𝐀𝐑𝐔𝐓𝐎𝐁𝐎𝐓 𝐔𝐏𝐆𝐑𝐀𝐃𝐄𝐃* ✨\n\n` +
                `✅ El sistema ha sido optimizado con éxito.\n\n` +
                `┏━━━━〔 📊 *𝐑𝐄𝐏𝐎𝐑𝐓𝐄* 〕━━━━┓\n\n` +
                `📂 *𝐌𝐎𝐃𝐈𝐅𝐈𝐂𝐀𝐂𝐈𝐎𝐍𝐄𝐒:* \n\`\`\`${archivos}\`\`\`\n\n` +
                `📈 *𝐄𝐒𝐓𝐀𝐃𝐈́𝐒𝐓𝐈𝐂𝐀𝐒:* \n\`\`\`${stats}\`\`\`\n\n` +
                `👤 *𝐃𝐞𝐯:* _Obito_\n` +
                `┗━━━━━━━━━━━━━━━━━━━━┛\n\n` +
                `🚀 _Reiniciando procesos para aplicar parches..._`;

            return sock.sendMessage(from, { text: mensajeFinal }, { quoted: msg });
        });
    }
};
