const { execSync } = require('child_process');
const path = require('path');

module.exports = {
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        // ✅ 𝑺𝒐𝒍𝒐 𝒆𝒍 𝒐𝒘𝒏𝒆𝒓 𝒑𝒖𝒆𝒅𝒆 𝒖𝒔𝒂𝒓 𝒆𝒔𝒕𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐
        if (!isOwner) {
            await sock.sendMessage(from, { 
                text: "❌ *𝑺𝒐𝒍𝒐 𝒆𝒍 𝒐𝒘𝒏𝒆𝒓 𝒑𝒖𝒆𝒅𝒆 𝒖𝒔𝒂𝒓 𝒆𝒔𝒕𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐.*"
            }, { quoted: msg });
            return;
        }

        try {
            // Reacción inicial de proceso
            await sock.sendMessage(from, { react: { text: "⏳", key: msg.key } });

            await sock.sendMessage(from, { 
                text: "» ˚୨•(⚔️)• ⊹ 𝒂𝒄𝒕𝒖𝒂𝒍𝒊𝒛𝒂𝒏𝒅𝒐 𝒆𝒍 𝒃𝒐𝒕...\n\n⏳ *𝒆𝒔𝒑𝒆𝒓𝒂 𝒖𝒏 𝒎𝒐𝒎𝒆𝒏𝒕𝒐* 🏴‍☠️"
            }, { quoted: msg });

            // Ejecutar git pull para obtener las actualizaciones
            const resultado = execSync('git pull', { 
                cwd: path.join(__dirname, '..'),
                encoding: 'utf-8'
            });

            // Mensaje de éxito con Narutobot y tipografía solicitada
            const mensaje = `» ˚୨•(⚔️)• ⊹ 𝒂𝒄𝒕𝒖𝒂𝒍𝒊𝒛𝒂𝒄𝒊𝒐́𝒏 𝒅𝒆𝒍 𝒃𝒐𝒕\n\n✅ *𝒂𝒄𝒕𝒖𝒂𝒍𝒊𝒛𝒂𝒅𝒐 𝒄𝒐𝒓𝒓𝒆𝒄𝒕𝒂𝒎𝒆𝒏𝒕𝒆* 🏴‍☠️\n\n𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒆𝒔 𝒎𝒂́𝒔 *𝒇𝒖𝒆𝒓𝒕𝒆* 𝒂𝒉𝒐𝒓𝒂 💪\n\n${resultado || '𝒑𝒓𝒐𝒚𝒆𝒄𝒕𝒐 𝒔𝒊𝒏 𝒄𝒂𝒎𝒃𝒊𝒐𝒔 𝒑𝒆𝒏𝒅𝒊𝒆𝒏𝒕𝒆𝒔'}`;

            await sock.sendMessage(from, { 
                text: mensaje
            }, { quoted: msg });

            // Reacción final de éxito
            await sock.sendMessage(from, { react: { text: "✅", key: msg.key } });

            console.log('✅ Bot actualizado por:', msg.pushName);
        } catch (err) {
            const errorMsg = `» ˚୨•(💀)• ⊹ 𝒆𝒓𝒓𝒐𝒓 𝒂𝒍 𝒂𝒄𝒕𝒖𝒂𝒍𝒊𝒛𝒂𝒓 𝒆𝒍 𝒃𝒐𝒕\n\n❌ *𝒂𝒍𝒈𝒐 𝒔𝒂𝒍𝒊𝒐́ 𝒎𝒂𝒍* 🔥\n\n${err.message}`;

            await sock.sendMessage(from, { 
                text: errorMsg
            }, { quoted: msg });
            
            // Reacción de error
            await sock.sendMessage(from, { react: { text: "❌", key: msg.key } });
            console.log('❌ Error en comando update:', err);
        }
    }
};