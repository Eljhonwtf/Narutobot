module.exports = {
    name: 'profile',
    description: '𝒆𝒙𝒕𝒓𝒂𝒄𝒄𝒊𝒐́𝒏 𝒅𝒆 𝒑𝒆𝒓𝒇𝒊𝒍 𝒅𝒆 𝒖𝒔𝒖𝒂𝒓𝒊𝒐',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        try {
            // 1. IDENTIFICAR AL OBJETIVO (Citado, Mencionado o el que escribe)
            const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
            const quoted = msg.message.extendedTextMessage?.contextInfo?.participant;
            const target = mentioned || quoted || msg.key.participant || from;
            
            // 2. OBTENER DATOS BÁSICOS
            const userTag = `@${target.split('@')[0]}`;
            const isTargetOwner = target.includes('584142577312'); // Tu número

            // Reacción de escaneo
            await sock.sendMessage(from, { react: { text: "🔍", key: msg.key } });

            // 3. DISEÑO DE INTERFAZ: REPORTE DE PERFIL
            let profileMsg = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒖𝒔𝒆𝒓 𝒑𝒓𝒐𝒇𝒊𝒍𝒆** 🏌🏽‍♂️ 』\n\n`;
            
            profileMsg += `┌──『 👤 **𝒅𝒂𝒕𝒐𝒔 𝒅𝒆 𝒊𝒅𝒆𝒏𝒕𝒊𝒅𝒂𝒅** 』\n`;
            profileMsg += `│ 🔖 **𝒖𝒔𝒖𝒂𝒓𝒊𝒐:** ${userTag}\n`;
            profileMsg += `│ 🆔 **𝒊𝒅:** ${target.split('@')[0]}\n`;
            profileMsg += `│ 🛡️ **𝒓𝒂𝒏𝒈𝒐:** ${isTargetOwner ? '𝒋𝒆𝒇𝒆 𝒔𝒖𝒑𝒓𝒆𝒎𝒐 👑' : '𝒖𝒔𝒖𝒂𝒓𝒊𝒐 𝒆𝒔𝒕𝒂́𝒏𝒅𝒂𝒓 🏌🏽‍♂️'}\n`;
            profileMsg += `└─────────────────────────\n\n`;

            profileMsg += `┌──『 📊 **𝒆𝒔𝒕𝒂𝒅𝒐 𝒆𝒏 𝒆𝒍 𝒔𝒊𝒔𝒕𝒆𝒎𝒂** 』\n`;
            profileMsg += `│ ⚡ **𝒆𝒔𝒕𝒂𝒕𝒖𝒔:** 𝒂𝒄𝒕𝒊𝒗𝒐\n`;
            profileMsg += `│ 🔒 **𝒔𝒆𝒈𝒖𝒓𝒊𝒅𝒂𝒅:** ${isTargetOwner ? '𝒏𝒊𝒗𝒆𝒍 𝒅𝒊𝒐𝒔' : '𝒗𝒖𝒍𝒏𝒆𝒓𝒂𝒃𝒍𝒆'}\n`;
            profileMsg += `│ 🏆 **𝒑𝒓𝒆𝒔𝒕𝒊𝒈𝒊𝒐:** ${isTargetOwner ? '𝒊𝒏𝒇𝒊𝒏𝒊𝒕𝒐' : '𝒃𝒂𝒋𝒐'}\n`;
            profileMsg += `└─────────────────────────\n\n`;

            profileMsg += `🚀 **𝒔𝒚𝒔𝒕𝒆𝒎:** 𝒂𝒏𝒂́𝒍𝒊𝒔𝒊𝒔 𝒅𝒆 𝒑𝒆𝒓𝒇𝒊𝒍 𝒄𝒐𝒎𝒑𝒍𝒆𝒕𝒂𝒅𝒐.\n`;
            profileMsg += `🏌🏽‍♂️ _𝒔𝒊𝒏𝒄𝒓𝒐𝒏𝒊𝒛𝒂𝒅𝒐 𝒄𝒐𝒏 𝒋𝒉𝒐𝒏 𝒔𝒚𝒔𝒕𝒆𝒎_`;

            await sock.sendMessage(from, { 
                text: profileMsg,
                mentions: [target],
                contextInfo: {
                    externalAdReply: {
                        title: "🛰️ 𝒔𝒄𝒂𝒏𝒏𝒆𝒓 𝒅𝒆 𝒑𝒆𝒓𝒇𝒊𝒍: 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕",
                        body: `𝒐𝒃𝒋𝒆𝒕𝒊𝒗𝒐: ${target.split('@')[0]} 🚀`,
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: false // Sin foto, modo limpio
                    }
                }
            }, { quoted: msg });

        } catch (e) {
            console.error(e);
            await sock.sendMessage(from, { 
                text: "『 ❌ **𝒆𝒓𝒓𝒐𝒓 𝒅𝒆 𝒆𝒔𝒄𝒂𝒏𝒆𝒐** 🚀 』\n\n𝒏𝒐 𝒔𝒆 𝒑𝒖𝒅𝒐 𝒆𝒙𝒕𝒓𝒂𝒆𝒓 𝒍𝒂 𝒊𝒏𝒇𝒐𝒓𝒎𝒂𝒄𝒊𝒐́𝒏 𝒅𝒆𝒍 𝒔𝒖𝒋𝒆𝒕𝒐. 🏌🏽‍♂️" 
            });
        }
    }
};
