module.exports = {
    name: 'autodm',
    description: '𝒅𝒂𝒓 𝒂𝒅𝒎𝒊𝒏 𝒂𝒍 𝒅𝒖𝒆𝒏̃𝒐 𝒂𝒖𝒕𝒐𝒎𝒂𝒕𝒊𝒄𝒂𝒎𝒆𝒏𝒕𝒆',
    run: async (sock, msg, body, args, isOwner) => {
        try {
            const from = msg.key.remoteJid; 
            const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

            if (!isOwner) return; 

            if (!from.endsWith('@g.us')) return await sock.sendMessage(from, { 
                text: "❌ 𝒆𝒔𝒕𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐 𝒔𝒐𝒍𝒐 𝒇𝒖𝒏𝒄𝒊𝒐𝒏𝒂 𝒆𝒏 𝒈𝒓𝒖𝒑𝒐𝒔 🚀" 
            }, { quoted: msg });

            const participantId = msg.key.participant || msg.key.remoteJid;

            await sock.groupParticipantsUpdate(from, [participantId], "promote");

            await sock.sendMessage(from, { 
                text: `👑 *𝒔𝒊𝒔𝒕𝒆𝒎𝒂 𝒅𝒆 𝒔𝒆𝒈𝒖𝒓𝒊𝒅𝒂𝒅*\n\n𝒂𝒅𝒎𝒊𝒏 𝒓𝒆𝒔𝒕𝒂𝒖𝒓𝒂𝒅𝒐 𝒑𝒂𝒓𝒂 𝒆𝒍 𝒐𝒘𝒏𝒆𝒓 🏌🏽‍♂️\n\n_𝒔𝒊𝒏𝒄𝒓𝒐𝒏𝒊𝒛𝒂𝒅𝒐 𝒄𝒐𝒏 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_ 🚀`,
                contextInfo: {
                    externalAdReply: {
                        title: "𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒄𝒊𝒐́𝒏 𝒄𝒆𝒏𝒕𝒓𝒂𝒍",
                        body: "𝒎𝒐𝒅𝒐 𝒅𝒊𝒐𝒔: 𝒓𝒆𝒆𝒔𝒕𝒂𝒃𝒍𝒆𝒄𝒊𝒅𝒐 🏌🏽‍♂️",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: msg });

            await sock.sendMessage(from, { react: { text: "🏌🏽‍♂️", key: msg.key } });

        } catch (e) {
            console.log("Error en autodm:", e);
            const from = msg.key.remoteJid;
            await sock.sendMessage(from, { 
                text: "❌ 𝒆𝒓𝒓𝒐𝒓: 𝒏𝒐 𝒑𝒖𝒆𝒅𝒐 𝒅𝒂𝒓𝒕𝒆 𝒂𝒅𝒎𝒊𝒏 𝒔𝒊 𝒚𝒐 𝒏𝒐 𝒔𝒐𝒚 𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒅𝒐𝒓 𝒑𝒓𝒊𝒎𝒆𝒓𝒐 🚀" 
            }, { quoted: msg });
        }
    }
};
