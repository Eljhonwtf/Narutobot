module.exports = {
    name: 'kick',
    description: '𝒆𝒍𝒊𝒎𝒊𝒏𝒂𝒄𝒊𝒐́𝒏 𝒕𝒂́𝒄𝒕𝒊𝒄𝒂 𝒅𝒆 𝒖𝒔𝒖𝒂𝒓𝒊𝒐𝒔',
    async run(sock, msg, body, args, isOwner) {
        const from = msg.key.remoteJid;
        const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

        // 1. VERIFICACIÓN DE ENTORNO
        if (!from.endsWith('@g.us')) {
            return sock.sendMessage(from, { 
                text: "『 🚀 **𝒂𝒗𝒊𝒔𝒐 𝒅𝒆𝒍 𝒔𝒊𝒔𝒕𝒆𝒎𝒂** 🏌🏽‍♂️ 』\n\n¿𝒗𝒊𝒔𝒕𝒆 𝒒𝒖𝒆 𝒆𝒓𝒆𝒔 𝒕𝒐𝒏𝒕𝒐? 𝒆𝒔𝒕𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐 𝒔𝒐𝒍𝒐 𝒇𝒖𝒏𝒄𝒊𝒐𝒏𝒂 𝒆𝒏 𝒈𝒓𝒖𝒑𝒐𝒔. ⚠️" 
            });
        }

        try {
            const groupMetadata = await sock.groupMetadata(from);
            const participants = groupMetadata.participants;
            
            // 2. VERIFICACIÓN DE RANGO DEL BOT
            const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
            const isBotAdmin = participants.find(p => p.id === botNumber)?.admin !== null;
            if (!isBotAdmin) return sock.sendMessage(from, { 
                text: "『 ⚠️ **𝒆𝒓𝒓𝒐𝒓 𝒅𝒆 𝒑𝒆𝒓𝒎𝒊𝒔𝒐𝒔** 🚀 』\n\n𝒏𝒆𝒄𝒆𝒔𝒊𝒕𝒐 𝒔𝒆𝒓 *𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒅𝒐𝒓* 𝒑𝒂𝒓𝒂 𝒆𝒋𝒆𝒄𝒖𝒕𝒂𝒓 𝒍𝒂 𝒍𝒊𝒎𝒑𝒊𝒆𝒛𝒂. 🏌🏽‍♂️" 
            });

            // 3. VERIFICACIÓN DE AUTORIDAD (ADMIN O OWNER)
            const sender = msg.key.participant || msg.key.remoteJid;
            const isAdmin = participants.find(p => p.id === sender)?.admin !== null;
            
            if (!isAdmin && !isOwner) {
                return sock.sendMessage(from, { 
                    text: "『 🚫 **𝒂𝒄𝒄𝒆𝒔𝒐 𝒅𝒆𝒏𝒆𝒈𝒂𝒅𝒐** 🏌🏽‍♂️ 』\n\n𝒔𝒐𝒍𝒐 𝒍𝒐𝒔 *𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒅𝒐𝒓𝒆𝒔* 𝒐 𝒆𝒍 *𝒋𝒆𝒇𝒆* 𝒑𝒖𝒆𝒅𝒆𝒏 𝒖𝒔𝒂𝒓 𝒆𝒔𝒕𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐. 🚀" 
                });
            }

            // 4. IDENTIFICACIÓN DEL OBJETIVO
            let usuario = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || 
                          msg.message.extendedTextMessage?.contextInfo?.participant;

            if (!usuario) return sock.sendMessage(from, { 
                text: "『 ⚠️ **𝒐𝒃𝒋𝒆𝒕𝒊𝒗𝒐 𝒏𝒐 𝒅𝒆𝒕𝒆𝒄𝒕𝒂𝒅𝒐** 🚀 』\n\n𝒎𝒆𝒏𝒄𝒊𝒐𝒏𝒂 𝒂𝒍 𝒖𝒔𝒖𝒂𝒓𝒊𝒐 𝒒𝒖𝒆 𝒅𝒆𝒔𝒆𝒂𝒔 𝒆𝒍𝒊𝒎𝒊𝒏𝒂𝒓 𝒐 𝒓𝒆𝒔𝒑𝒐𝒏𝒅𝒆 𝒂 𝒔𝒖 𝒎𝒆𝒏𝒔𝒂𝒋𝒆. 🏌🏽‍♂️" 
            });

            // 5. EJECUCIÓN DEL PROTOCOLO KICK
            await sock.groupParticipantsUpdate(from, [usuario], "remove");

            // 6. DISEÑO DE CONFIRMACIÓN DE EXTERMINIO
            let kickMsg = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒆𝒙𝒕𝒆𝒓𝒎𝒊𝒏𝒂𝒕𝒊𝒐𝒏** 🏌🏽‍♂️ 』\n\n`;
            kickMsg += `╔════════════════════════╗\n`;
            kickMsg += `  🚫 **𝒆𝒔𝒕𝒂𝒅𝒐:** 𝒖𝒔𝒖𝒂𝒓𝒊𝒐 𝒆𝒍𝒊𝒎𝒊𝒏𝒂𝒅𝒐\n`;
            kickMsg += `  🧹 **𝒂𝒄𝒄𝒊𝒐́𝒏:** 𝒍𝒊𝒎𝒑𝒊𝒆𝒛𝒂 𝒄𝒐𝒎𝒑𝒍𝒆𝒕𝒂𝒅𝒂\n`;
            kickMsg += `  🛡️ **𝒂𝒖𝒕𝒐𝒓𝒊𝒛𝒂𝒄𝒊𝒐́𝒏:** 𝒂𝒅𝒎𝒊𝒏 𝒔𝒚𝒔𝒕𝒆𝒎\n`;
            kickMsg += `╚════════════════════════╝\n\n`;
            kickMsg += `🚀 **𝒔𝒊𝒔𝒕𝒆𝒎𝒂:** 𝒆𝒍 𝒐𝒃𝒋𝒆𝒕𝒊𝒗𝒐 𝒉𝒂 𝒔𝒊𝒅𝒐 𝒓𝒆𝒕𝒊𝒓𝒂𝒅𝒐 𝒅𝒆𝒍 𝒔𝒆𝒄𝒕𝒐𝒓.\n`;
            kickMsg += `🏌🏽‍♂️ _𝒔𝒊𝒏𝒄𝒓𝒐𝒏𝒊𝒛𝒂𝒅𝒐 𝒄𝒐𝒏 𝒋𝒉𝒐𝒏 𝒔𝒚𝒔𝒕𝒆𝒎_`;

            await sock.sendMessage(from, { 
                text: kickMsg,
                contextInfo: {
                    externalAdReply: {
                        title: "🛰️ 𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒄𝒊𝒐́𝒏 𝒄𝒆𝒏𝒕𝒓𝒂𝒍 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕",
                        body: "𝒎𝒐𝒅𝒐 𝒅𝒊𝒐𝒔: 𝒆𝒋𝒆𝒄𝒖𝒕𝒂𝒏𝒅𝒐 𝒍𝒊𝒎𝒑𝒊𝒆𝒛𝒂 🚀",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: msg });

            await sock.sendMessage(from, { react: { text: "🏌🏽‍♂️", key: msg.key } });

        } catch (err) {
            console.log(err);
            await sock.sendMessage(from, { 
                text: "『 ❌ **𝒆𝒓𝒓𝒐𝒓 𝒅𝒆 𝒔𝒊𝒔𝒕𝒆𝒎𝒂** 🚀 』\n\n𝒏𝒐 𝒔𝒆 𝒑𝒖𝒅𝒐 𝒄𝒐𝒎𝒑𝒍𝒆𝒕𝒂𝒓 𝒍𝒂 𝒆𝒙𝒑𝒖𝒍𝒔𝒊𝒐́𝒏. 🏌🏽‍♂️" 
            });
        }
    }
};
