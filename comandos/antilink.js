const fs = require('fs');

module.exports = {
    name: 'antilink',
    description: '𝑨𝒄𝒕𝒊𝒗𝒂 𝒐 𝒅𝒆𝒔𝒂𝒄𝒕𝒊𝒗𝒂 𝒆𝒍 𝒂𝒏𝒕𝒊-𝒆𝒏𝒍𝒂𝒄𝒆𝒔',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const groupAdmins = (participants) => participants.filter(p => p.admin !== null).map(p => p.id);
        
        if (!from.endsWith('@g.us')) return;

        try {
            // 1. Cargar o crear base de datos de ajustes del grupo
            let chatData = {};
            if (fs.existsSync('./chats.json')) {
                chatData = JSON.parse(fs.readFileSync('./chats.json'));
            }

            if (!chatData[from]) chatData[from] = { antilink: false };

            const metadata = await sock.groupMetadata(from);
            const participants = metadata.participants;
            const admins = groupAdmins(participants);
            const sender = msg.key.participant || msg.key.remoteJid;
            const isAdmin = admins.includes(sender);

            // --- LÓGICA DE COMANDO (ON / OFF) ---
            if (args[0] === 'on') {
                if (!isAdmin && !isOwner) return sock.sendMessage(from, { text: "❌ *𝑬𝒔𝒕𝒂 𝒇𝒖𝒏𝒄𝒊𝒐́𝒏 𝒆𝒔 𝒔𝒐𝒍𝒐 𝒑𝒂𝒓𝒂 𝒂𝒅𝒎𝒊𝒏𝒔.*" }, { quoted: msg });
                
                chatData[from].antilink = true;
                fs.writeFileSync('./chats.json', JSON.stringify(chatData, null, 2));
                
                await sock.sendMessage(from, { react: { text: "✅", key: msg.key } });
                return await sock.sendMessage(from, { 
                    text: `*『 𝑨𝑵𝑻𝑰-𝑳𝑰𝑵𝑲 𝑨𝑪𝑻𝑰𝑽𝑨𝑫𝑶 』*\n\n┃ 🛡️ *𝑬𝒔𝒕𝒂𝒅𝒐:* 𝑶𝑵\n┃ ⚔️ *𝑨𝒄𝒄𝒊𝒐́𝒏:* 𝑩𝒂𝒏 𝒂 𝒖𝒔𝒖𝒂𝒓𝒊𝒐𝒔 𝒆𝒙𝒕𝒆𝒓𝒏𝒐𝒔\n┃\n🚩 *𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝑺𝒚𝒔𝒕𝒆𝒎*` 
                }, { quoted: msg });
            }

            if (args[0] === 'off') {
                if (!isAdmin && !isOwner) return sock.sendMessage(from, { text: "❌ *𝑬𝒔𝒕𝒂 𝒇𝒖𝒏𝒄𝒊𝒐́𝒏 𝒆𝒔 𝒔𝒐𝒍𝒐 𝒑𝒂𝒓𝒂 𝒂𝒅𝒎𝒊𝒏𝒔.*" }, { quoted: msg });
                
                chatData[from].antilink = false;
                fs.writeFileSync('./chats.json', JSON.stringify(chatData, null, 2));
                
                await sock.sendMessage(from, { react: { text: "🚫", key: msg.key } });
                return await sock.sendMessage(from, { 
                    text: `*『 𝑨𝑵𝑻𝑰-𝑳𝑰𝑵𝑲 𝑫𝑬𝑺𝑨𝑪𝑻𝑰𝑽𝑨𝑫𝑶 』*\n\n┃ 🛡️ *𝑬𝒔𝒕𝒂𝒅𝒐:* 𝑶𝑭𝑭\n┃\n🚩 *𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝑺𝒚𝒔𝒕𝒆𝒎*` 
                }, { quoted: msg });
            }

            // --- LÓGICA DE DETECCIÓN (Solo si está ON) ---
            if (chatData[from].antilink) {
                const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
                
                if (linkRegex.test(body) && !isAdmin) {
                    await sock.sendMessage(from, { delete: msg.key });
                    await sock.groupParticipantsUpdate(from, [sender], "remove");
                    await sock.sendMessage(from, { 
                        text: `*『 𝑱𝑼𝑻𝑺𝑼 𝑫𝑬 𝑫𝑬𝑺𝑻𝑰𝑬𝑹𝑶 』*\n\n┃ 👤 @${sender.split('@')[0]} 𝒇𝒖𝒆 𝒆𝒍𝒊𝒎𝒊𝒏𝒂𝒅𝒐.\n┃ ⚔️ *𝑹𝒂𝒛𝒐́𝒏:* 𝑬𝒏𝒗𝒊𝒂𝒓 𝒆𝒏𝒍𝒂𝒄𝒆𝒔 𝒑𝒓𝒐𝒉𝒊𝒃𝒊𝒅𝒐𝒔.\n┃\n🚩 *𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝑺𝒚𝒔𝒕𝒆𝒎*`,
                        mentions: [sender]
                    });
                }
            }

        } catch (e) {
            console.log("Error en Antilink:", e);
        }
    }
};
