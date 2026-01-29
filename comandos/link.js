module.exports = {
    name: 'link',
    description: '𝒈𝒆𝒏𝒆𝒓𝒂𝒄𝒊𝒐́𝒏 𝒅𝒆 𝒆𝒏𝒍𝒂𝒄𝒆 𝒅𝒆 𝒂𝒄𝒄𝒆𝒔𝒐',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        // Usamos tu imagen confirmada
        const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

        try {
            if (!from.endsWith('@g.us')) return;

            // 1. REACCIÓN INICIAL
            await sock.sendMessage(from, { react: { text: "🛰️", key: msg.key } });

            // 2. VERIFICACIÓN DE RANGO
            const metadata = await sock.groupMetadata(from);
            const isAdmin = metadata.participants.find(p => p.id === (msg.key.participant || msg.key.remoteJid))?.admin || isOwner;
            
            if (!isAdmin) {
                return await sock.sendMessage(from, { 
                    text: `『 🚫 **𝒂𝒄𝒄𝒆𝒔𝒐 𝒅𝒆𝒏𝒆𝒈𝒂𝒅𝒐** 🏌🏽‍♂️ 』\n\nSolo los *administradores* pueden solicitar el enlace. 🚀` 
                }, { quoted: msg });
            }

            // 3. OBTENER LINK
            const code = await sock.groupInviteCode(from);
            const link = `https://chat.whatsapp.com/${code}`;

            // 4. DISEÑO HÍBRIDO (CAPTION)
            let caption = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒂𝒄𝒄𝒆𝒔𝒔 𝒍𝒊𝒏𝒌** 🏌🏽‍♂️ 』\n\n`;
            caption += `┌──『 🔗 **𝒆𝒏𝒍𝒂𝒄𝒆 𝒅𝒆 𝒂𝒄𝒄𝒆𝒔𝒐** 』\n`;
            caption += `│\n`;
            caption += `│ ${link}\n`;
            caption += `│\n`;
            caption += `└─────────────────────────\n\n`;
            caption += `🚀 **𝒔𝒚𝒔𝒕𝒆𝒎:** Enlace oficial del sector.\n`;
            caption += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

            // 5. ENVÍO COMO IMAGEN (ESTRATEGIA ANTI-SPAM)
            // Enviamos la imagen real con el texto abajo. Esto NO lo bloquea WhatsApp.
            await sock.sendMessage(from, { 
                image: { url: thumbUrl },
                caption: caption
            }, { quoted: msg });

            // Reacción final
            await sock.sendMessage(from, { react: { text: "✅", key: msg.key } });

        } catch (e) {
            console.log(e);
            // Plan C: Si falla la imagen, texto plano puro y duro
            await sock.sendMessage(from, { 
                text: `🚀 *Link:* https://chat.whatsapp.com/${(await sock.groupInviteCode(from))}` 
            }, { quoted: msg });
        }
    }
};
