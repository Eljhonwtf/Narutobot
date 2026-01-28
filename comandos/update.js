const { execSync } = require('child_process');
const path = require('path');

module.exports = {
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        
        // ✅ Solo el owner puede usar este comando
        if (!isOwner) {
            await sock.sendMessage(from, { 
                text: "❌ Solo el owner puede usar este comando.",
                quoted: msg
            });
            return;
        }

        try {
            await sock.sendMessage(from, { 
                text: "» ˚୨•(⚔️)• ⊹ ᴀᴄᴛᴜᴀʟɪᴢᴀɴᴅᴏ ᴇʟ ʙᴏᴛ...\n\n⏳ *ᴇsᴘᴇʀᴀ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ* 🏴‍☠️",
                quoted: msg
            });

            // Ejecutar git pull
            const resultado = execSync('git pull', { 
                cwd: path.join(__dirname, '..'),
                encoding: 'utf-8'
            });

            const mensaje = `» ˚୨•(⚔️)• ⊹ ᴀᴄᴛᴜᴀʟɪᴢᴀᴄɪᴏ́ɴ ᴅᴇʟ ʙᴏᴛ\n\n✅ *ᴀᴄᴛᴜᴀʟɪᴢᴀᴅᴏ ᴄᴏɪ́ɪᴛᴏ* 🏴‍☠️\n\n𝐗𝐚𝐫𝐤𝐢𝐚𝐥 𝐢𝐬 𝐬𝐭𝐫𝐨𝐧𝐠𝐞𝐫 𝐧𝐨𝐰 💪\n\n${resultado || '✐ Los archivos están al día'}`;

            await sock.sendMessage(from, { 
                text: mensaje,
                quoted: msg
            });

            console.log('✅ Bot actualizado por:', msg.pushName);
        } catch (err) {
            const errorMsg = `» ˚୨•(💀)• ⊹ ᴇʀʀᴏʀ ᴇɴ ʟᴀ ᴀᴄᴛᴜᴀʟɪᴢᴀʀ ᴇʟ ʙᴏᴛ\n\n❌ *ᴀʟɢᴏ sᴀʟɪó ᴍᴀʟ* 🔥\n\n${err.message}`;

            await sock.sendMessage(from, { 
                text: errorMsg,
                quoted: msg
            });
            console.log('❌ Error en comando update:', err);
        }
    }
};