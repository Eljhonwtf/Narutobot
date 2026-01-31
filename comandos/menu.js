const { exec } = require('child_process');

module.exports = {
    name: 'update',
    alias: ['actualizar', 'fixbot'],
    category: 'owner',
    run: async (sock, msg, body, args, isOwner) => {
        // Validación de dueño
        if (!isOwner) return sock.sendMessage(msg.key.remoteJid, { text: '❌ Este comando es solo para mi jefe *Jhon*.' });

        const from = msg.key.remoteJid;

        // Mensaje de espera inicial
        await sock.sendMessage(from, { 
            text: `⚡ *𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝑺𝒚𝒔𝒕𝒆𝒎*\n\n> ⏳ Iniciando actualización de archivos...` 
        }, { quoted: msg });

        // Ejecución del comando de Git
        exec('git pull', (err, stdout, stderr) => {
            if (err) {
                return sock.sendMessage(from, { 
                    text: `❌ *𝐄𝐑𝐑𝐎𝐑 𝐃𝐄 𝐒𝐈𝐒𝐓𝐄𝐌𝐀*\n\n~│~ No se pudo actualizar:\n~│~ _${err.message}_` 
                });
            }

            const resultado = stdout.trim();
            
            // MENSAJE FINAL (Sin comillas invertidas internas para evitar errores)
            const mensaje = `» ˚୨•(⚔️)• ⊹ *𝒂𝒄𝒕𝒖𝒂𝒍𝒊𝒛𝒂𝒄𝒊𝒐́𝒏 𝒅𝒆𝒍 𝒃𝒐𝒕*\n\n✅ *𝒂𝒄𝒕𝒖𝒂𝒍𝒊𝒛𝒂𝒅𝒐 𝒄𝒐𝒓𝒓𝒆𝒄𝒕𝒂𝒎𝒆𝒏𝒕𝒆* 🏴‍☠️\n\n𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒆𝒔 𝒎𝒂́𝒔 *𝒇𝒖𝒆𝒓𝒕𝒆* 𝒂𝒉𝒐𝒓𝒂 💪\n\n${resultado.includes('Already up to date') ? '𝒑𝒓𝒐𝒚𝒆𝒄𝒕𝒐 𝒔𝒊𝒏 𝒄𝒂𝒎𝒃𝒊𝒐𝒔 𝒑𝒆𝒏𝒅𝒊𝒆𝒏𝒕𝒆𝒔' : resultado}`;

            return sock.sendMessage(from, { text: mensaje }, { quoted: msg });
        });
    }
};
