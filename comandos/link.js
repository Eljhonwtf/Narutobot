module.exports = {
    name: 'link',
    description: '𝒈𝒆𝒏𝒆𝒓𝒂𝒄𝒊𝒐́𝒏 𝒅𝒆 𝒆𝒏𝒍𝒂𝒄𝒆 𝒅𝒆 𝒂𝒄𝒄𝒆𝒔𝒐 𝒂𝒍 𝒔𝒆𝒄𝒕𝒐𝒓',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        try {
            // 1. VERIFICACIÓN DE ENTORNO
            if (!from.endsWith('@g.us')) return;

            // 2. VERIFICACIÓN DE AUTORIDAD
            const metadata = await sock.groupMetadata(from);
            const isAdmin = metadata.participants.find(p => p.id === (msg.key.participant || msg.key.remoteJid))?.admin || isOwner;
            
            if (!isAdmin) {
                return await sock.sendMessage(from, { 
                    text: `『 🚫 **𝒂𝒄𝒄𝒆𝒔𝒐 𝒅𝒆𝒏𝒆𝒈𝒂𝒅𝒐** 🏌🏽‍♂️ 』\n\n𝒔𝒐𝒍𝒐 𝒍𝒐𝒔 *𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒅𝒐𝒓𝒆𝒔* 𝒕𝒊𝒆𝒏𝒆𝒏 𝒑𝒆𝒓𝒎𝒊𝒔𝒐 𝒑𝒂𝒓𝒂 𝒆𝒙𝒕𝒓𝒂𝒆𝒓 𝒆𝒍 𝒆𝒏𝒍𝒂𝒄𝒆 𝒅𝒆𝒍 𝒔𝒆𝒄𝒕𝒐𝒓. 🚀` 
                }, { quoted: msg });
            }

            // 3. EXTRACCIÓN DEL CÓDIGO
            const code = await sock.groupInviteCode(from);
            const link = `https://chat.whatsapp.com/${code}`;

            // --- DISEÑO DE INTERFAZ DIGITAL (SIN IMAGEN) ---
            let linkMsg = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒂𝒄𝒄𝒆𝒔𝒔 𝒍𝒊𝒏𝒌** 🏌🏽‍♂️ 』\n\n`;
            linkMsg += `┌─────────────────────────\n`;
            linkMsg += `│ 🔗 **𝒆𝒏𝒍𝒂𝒄𝒆 𝒅𝒆 𝒂𝒄𝒄𝒆𝒔𝒐:**\n`;
            linkMsg += `│ ${link}\n`;
            linkMsg += `└─────────────────────────\n\n`;
            linkMsg += `🚀 **𝒔𝒕𝒂𝒕𝒖𝒔:** 𝒄𝒐́𝒅𝒊𝒈𝒐 𝒈𝒆𝒏𝒆𝒓𝒂𝒅𝒐 𝒄𝒐𝒏 𝒆́𝒙𝒊𝒕𝒐.\n`;
            linkMsg += `🏌🏽‍♂️ _𝒔𝒊𝒏𝒄𝒓𝒐𝒏𝒊𝒛𝒂𝒅𝒐 𝒄𝒐𝒏 𝒋𝒉𝒐𝒏 𝒔𝒚𝒔𝒕𝒆𝒎_`;

            await sock.sendMessage(from, { 
                text: linkMsg,
                contextInfo: {
                    externalAdReply: {
                        title: "🛰️ 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎",
                        body: "𝒆𝒏𝒍𝒂𝒄𝒆 𝒅𝒆 𝒊𝒏𝒗𝒊𝒕𝒂𝒄𝒊𝒐́𝒏 𝒐𝒇𝒊𝒄𝒊𝒂𝒍 🚀",
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: false // Sin imagen como pediste
                    }
                }
            }, { quoted: msg });

            await sock.sendMessage(from, { react: { text: "🔗", key: msg.key } });

        } catch (e) {
            await sock.sendMessage(from, { 
                text: `『 ❌ **𝒆𝒓𝒓𝒐𝒓 𝒅𝒆 𝒔𝒊𝒔𝒕𝒆𝒎𝒂** 🚀 』\n\n𝒏𝒐 𝒔𝒆 𝒑𝒖𝒅𝒐 𝒈𝒆𝒏𝒆𝒓𝒂𝒓 𝒆𝒍 𝒆𝒏𝒍𝒂𝒄𝒆. ¿𝒆𝒍 𝒃𝒐𝒕 𝒕𝒊𝒆𝒏𝒆 𝒓𝒂𝒏𝒈𝒐 𝒅𝒆 𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒅𝒐𝒓? 🏌🏽‍♂️` 
            }, { quoted: msg });
        }
    }
};
