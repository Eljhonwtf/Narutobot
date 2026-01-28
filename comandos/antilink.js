module.exports = {
    name: 'antilink',
    description: '𝑨𝒄𝒕𝒊𝒗𝒂 𝒐 𝒅𝒆𝒔𝒂𝒄𝒕𝒊𝒗𝒂 𝒆𝒍 𝒂𝒏𝒕𝒊-𝒆𝒏𝒍𝒂𝒄𝒆𝒔 𝒆𝒏 𝒆𝒍 𝒈𝒓𝒖𝒑𝒐',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        
        // Solo funciona en grupos
        if (!from.endsWith('@g.us')) return;

        try {
            const groupMetadata = await sock.groupMetadata(from);
            const participants = groupMetadata.participants;
            
            // Verificamos si el bot es admin (necesario para borrar y sacar gente)
            const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
            const isBotAdmin = participants.find(p => p.id === botId)?.admin !== null;

            if (!isBotAdmin) {
                return await sock.sendMessage(from, { 
                    text: "⚠️ *𝑵𝒆𝒄𝒆𝒔𝒊𝒕𝒐 𝒔𝒆𝒓 𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒅𝒐𝒓 𝒑𝒂𝒓𝒂 𝒆𝒋𝒆𝒄𝒖𝒕𝒂𝒓 𝒆𝒍 𝑨𝒏𝒕𝒊-𝑳𝒊𝒏𝒌.*" 
                }, { quoted: msg });
            }

            // Expresión regular para detectar enlaces de WhatsApp
            const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;

            if (linkRegex.test(body)) {
                // Verificamos si el que envió el link es admin
                const sender = msg.key.participant || msg.key.remoteJid;
                const isAdmin = participants.find(p => p.id === sender)?.admin !== null;

                if (isAdmin) {
                    return; // Si es admin, lo dejamos pasar
                }

                // --- ACCIÓN SI NO ES ADMIN ---
                
                // 1. Reacción de advertencia
                await sock.sendMessage(from, { react: { text: "🚫", key: msg.key } });

                // 2. Mensaje de expulsión
                const mention = `@${sender.split('@')[0]}`;
                await sock.sendMessage(from, { 
                    text: `*『 𝑨𝑵𝑻𝑰-𝑳𝑰𝑵𝑲 𝑫𝑬𝑻𝑬𝑪𝑻𝑨𝑫𝑶 』*\n\n┃ 🛡️ *𝑼𝒔𝒖𝒂𝒓𝒊𝒐:* ${mention}\n┃ ⚔️ *𝑨𝒄𝒄𝒊𝒐́𝒏:* 𝑬𝒍𝒊𝒎𝒊𝒏𝒂𝒄𝒊𝒐́𝒏 𝒚 𝑩𝒂𝒏.\n┃\n🚩 *𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝑺𝒚𝒔𝒕𝒆𝒎*`,
                    mentions: [sender]
                }, { quoted: msg });

                // 3. Eliminar el mensaje
                await sock.sendMessage(from, { delete: msg.key });

                // 4. Expulsar al usuario
                await sock.groupParticipantsUpdate(from, [sender], "remove");
            }
        } catch (e) {
            console.log("𝑬𝒓𝒓𝒐𝒓 𝒆𝒏 𝑨𝒏𝒕𝒊-𝑳𝒊𝒏𝒌:", e);
        }
    }
};
