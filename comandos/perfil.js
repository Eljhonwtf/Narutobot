module.exports = {
    name: 'profile',
    description: 'Ver el perfil de un usuario',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        try {
            // 1. ¿A quién vemos?
            const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
            const quoted = msg.message.extendedTextMessage?.contextInfo?.participant;
            const target = mentioned || quoted || (msg.key.participant || msg.key.remoteJid);
            
            await sock.sendMessage(from, { react: { text: "👤", key: msg.key } });

            // 2. OBTENER FOTO DE PERFIL
            let ppUrl;
            try {
                ppUrl = await sock.profilePictureUrl(target, 'image');
            } catch {
                // Foto por defecto si no tiene o está privada
                ppUrl = 'https://web.whatsapp.com/img/default-user_613589.png'; 
            }

            // 3. DISEÑO CORTO Y DIRECTO
            let profileMsg = `『 🚀 **𝒑𝒆𝒓𝒇𝒊𝒍** 🏌🏽‍♂️ 』\n\n`;
            profileMsg += `👤 **Usuario:** @${target.split('@')[0]}\n`;
            profileMsg += `🆔 **Número:** ${target.split('@')[0]}\n`;
            profileMsg += `⚡ **Estado:** Activo\n\n`;
            profileMsg += `🚀 _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕_`;

            // 4. ENVÍO CON FOTO REAL
            await sock.sendMessage(from, { 
                image: { url: ppUrl },
                caption: profileMsg,
                mentions: [target]
            }, { quoted: msg });

        } catch (e) {
            console.error(e);
            await sock.sendMessage(from, { text: "❌ No pude cargar el perfil." }, { quoted: msg });
        }
    }
};
