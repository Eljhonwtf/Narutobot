const { exec } = require('child_process');

module.exports = {
    name: 'update',
    alias: ['actualizar', 'fixbot'],
    category: 'owner',
    run: async (sock, msg, body, args, isOwner) => {
        if (!isOwner) return;

        const from = msg.key.remoteJid;

        // 1er Mensaje: Aviso de inicio
        await sock.sendMessage(from, { 
            text: `⚡ *𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝑺𝒚𝒔𝒕𝒆𝒎*\n\n> 📥 _Buscando cambios en el repositorio..._` 
        }, { quoted: msg });

        exec('git pull', (err, stdout, stderr) => {
            if (err) {
                return sock.sendMessage(from, { 
                    text: `❌ *𝐄𝐑𝐑𝐎𝐑 𝐃𝐄 𝐒𝐈𝐒𝐓𝐄𝐌𝐀*\n\n${err.message}` 
                });
            }

            if (stdout.includes('Already up to date')) {
                return sock.sendMessage(from, { 
                    text: `✅ *𝐒𝐘𝐒𝐓𝐄𝐌 𝐔𝐏𝐃𝐀𝐓𝐄*\n\n𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒚𝒂 𝒆𝒔𝒕𝒂́ 𝒆𝒏 𝒔𝒖 𝒖́𝒍𝒕𝒊𝒎𝒂 𝒗𝒆𝒓𝒔𝒊𝒐́𝒏.` 
                });
            }

            // --- FORMATEO DEL REPORTE DE CAMBIOS ---
            // Extraemos solo la parte del resumen (ej: "1 file changed, 66 insertions...")
            const stats = stdout.split('\n').filter(line => line.includes('changed') || line.includes('insertion') || line.includes('deletion')).join('\n');
            // Extraemos los archivos modificados
            const archivos = stdout.split('\n').filter(line => line.includes('|')).join('\n');

            const mensajeFinal = `» ˚୨•(⚔️)• ⊹ *𝒂𝒄𝒕𝒖𝒂𝒍𝒊𝒛𝒂𝒄𝒊𝒐́𝒏 𝒅𝒆𝒍 𝒃𝒐𝒕*\n\n` +
                `✅ *𝒂𝒄𝒕𝒖𝒂𝒍𝒊𝒛𝒂𝒅𝒐 𝒄𝒐𝒓𝒓𝒆𝒄𝒕𝒂𝒎𝒆𝒏𝒕𝒆* 🏴‍☠️\n\n` +
                `𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒆𝒔 𝒎𝒂́𝒔 *𝒇𝒖𝒆𝒓𝒕𝒆* 𝒂𝒉𝒐𝒓𝒂 💪\n\n` +
                `┏━━━〔 ✦ *𝐃𝐄𝐓𝐀𝐋𝐋𝐄𝐒* ✦ 〕━━━┓\n` +
                `📂 *𝐀𝐫𝐜𝐡𝐢𝐯𝐨𝐬:* \n${archivos}\n\n` +
                `📊 * Estadísticas:* \n${stats}\n` +
                `┗━━━━━━━━━━━━━━━━━━━━┛\n\n` +
                `🚀 _Reiniciando para aplicar cambios..._`;

            return sock.sendMessage(from, { text: mensajeFinal }, { quoted: msg });
        });
    }
};
