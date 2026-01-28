const { execSync } = require('child_process');
const path = require('path');

module.exports = {
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        // 🧐 𝑺𝒐𝒍𝒐 𝒆𝒍 𝒐𝒘𝒏𝒆𝒓 𝒑𝒖𝒆𝒅𝒆 𝒖𝒔𝒂𝒓 𝒆𝒔𝒕𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐
        if (!isOwner) {
            await sock.sendMessage(from, { 
                text: "❌ 𝑺𝒐𝒍𝒐 𝒆𝒍 𝒐𝒘𝒏𝒆𝒓 𝒑𝒖𝒆𝒅𝒆 𝒖𝒔𝒂𝒓 𝒆𝒔𝒕𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐."
            }, { quoted: msg });
            return;
        }

        try {
            // Reacción inicial de proceso
            await sock.sendMessage(from, { react: { text: "⏳", key: msg.key } });

            await sock.sendMessage(from, { 
                text: "» ˚୨•(⚔️)• ⊹ 𝒂𝒄𝒕𝒖𝒂𝒍𝒊𝒛𝒂𝒏𝒅𝒐 𝒆𝒍 𝒃𝒐𝒕...\n\n😮‍💨 *𝒆𝒔𝒑𝒆𝒓𝒂 𝒖𝒏 𝒎𝒐𝒎𝒆𝒏𝒕𝒐* 🏴‍☠️"
            }, { quoted: msg });

            // Ejecutar git pull para obtener las actualizaciones
            const resultado = execSync('git pull', { 
                cwd: path.join(__dirname, '..'),
                encoding: 'utf-8'
            });

            // Mensaje de éxito con el nombre Narutobot y frase en español
            const mensaje = `» ˚୨•(⚔️)• ⊹ ᴀᴄᴛᴜᴀʟɪᴢᴀᴄɪᴏ́ɴ ᴅᴇʟ ʙᴏᴛ\n\n✅ *ᴀᴄᴛᴜᴀʟɪᴢᴀᴅᴏ ᴄᴏʀʀᴇᴄᴛᴀᴍᴇɴᴛᴇ* 🏴‍☠️\n\n𝐍𝐚𝐫𝐮𝐭𝐨𝐛𝐨𝐭 𝐞𝐬 𝐦𝐚́𝐬 𝐟𝐮𝐞𝐫𝐭𝐞 𝐚𝐡𝐨𝐫𝐚 💪\n\n${resultado || '✐ Los archivos están al día'}`;

            await sock.sendMessage(from, { 
                text: mensaje
            }, { quoted: msg });

            // Reacción final de éxito
            await sock.sendMessage(from, { react: { text: "✅", key: msg.key } });

            console.log('✅ Bot actualizado por:', msg.pushName);
        } catch (err) {
            const errorMsg = `» ˚୨•(💀)• ⊹ ᴇʀʀᴏʀ ᴇɴ ʟᴀ ᴀᴄᴛᴜᴀʟɪᴢᴀʀ ᴇʟ ʙᴏᴛ\n\n❌ *ᴀʟɢᴏ sᴀʟɪó ᴍᴀʟ* 🔥\n\n${err.message}`;

            await sock.sendMessage(from, { 
                text: errorMsg
            }, { quoted: msg });
            
            // Reacción de error
            await sock.sendMessage(from, { react: { text: "❌", key: msg.key } });
            console.log('❌ Error en comando update:', err);
        }
    }
};
