module.exports = {
    name: 'inspect',
    description: 'Ver info de un grupo mediante su enlace',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        // 1. SOLO EL JEFE
        if (!isOwner) return;

        // 2. VERIFICAR LINK
        const link = args[0];
        if (!link || !link.includes('chat.whatsapp.com')) {
            return await sock.sendMessage(from, { text: "⚠️ Pega un enlace de grupo válido." }, { quoted: msg });
        }

        try {
            await sock.sendMessage(from, { react: { text: "👁️", key: msg.key } });

            const code = link.split('https://chat.whatsapp.com/')[1];
            const info = await sock.groupGetInviteInfo(code);

            // 3. OBTENER FOTO DEL GRUPO A INSPECCIONAR
            let groupPP;
            try {
                groupPP = await sock.profilePictureUrl(info.id, 'image');
            } catch {
                groupPP = 'https://web.whatsapp.com/img/default-user_613589.png';
            }

            // 4. DISEÑO HÍBRIDO "INSPECTOR"
            let txt = `『 🚀 **𝒊𝒏𝒔𝒑𝒆𝒄𝒄𝒊𝒐́𝒏 𝒅𝒆 𝒔𝒆𝒄𝒕𝒐𝒓** 🏌🏽‍♂️ 』\n\n`;
            
            txt += `─── ⋆ ⋅ 🔍 ⋅ ⋆ ───\n`;
            txt += `📎 **𝑵𝒐𝒎𝒃𝒓𝒆:** ${info.subject}\n`;
            txt += `🆔 **𝑰𝑫:** ${info.id}\n`;
            txt += `👑 **𝑪𝒓𝒆𝒂𝒅𝒐𝒓:** @${info.owner?.split('@')[0] || 'Desconocido'}\n`;
            txt += `👥 **𝑴𝒊𝒆𝒎𝒃𝒓𝒐𝒔:** ${info.size}\n`;
            txt += `─── ⋆ ⋅ 🚀 ⋅ ⋆ ───\n\n`;

            txt += `📝 **𝑫𝒆𝒔𝒄𝒓𝒊𝒑𝒄𝒊𝒐́𝒏:**\n${info.desc || 'Sin descripción'}\n\n`;
            txt += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒊𝒏𝒕𝒆𝒍_`;

            await sock.sendMessage(from, { 
                image: { url: groupPP },
                caption: txt,
                mentions: [info.owner]
            }, { quoted: msg });

        } catch (e) {
            console.log(e);
            await sock.sendMessage(from, { text: "❌ No pude inspeccionar ese enlace. Puede que haya expirado." }, { quoted: msg });
        }
    }
};
