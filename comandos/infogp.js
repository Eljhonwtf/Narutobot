module.exports = {
    name: 'infogp',
    description: '𝒔𝒄𝒂𝒏𝒏𝒆𝒓 𝒂𝒗𝒂𝒏𝒛𝒂𝒅𝒐 𝒅𝒆𝒍 𝒔𝒆𝒄𝒕𝒐𝒓 𝒈𝒓𝒖𝒑𝒂𝒍',
    run: async (sock, msg, body, args, isOwner) => {
        try {
            const from = msg.key.remoteJid;
            const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";
            
            if (!from.endsWith('@g.us')) return;

            const metadata = await sock.groupMetadata(from);
            const participantes = metadata.participants.length;
            const creador = metadata.owner || "𝒏𝒐 𝒂𝒔𝒊𝒈𝒏𝒂𝒅𝒐";
            
            // --- DISEÑO: INTERFAZ DE ESCANEO ---
            let texto = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒅𝒂𝒕𝒂 𝒔𝒄𝒂𝒏** 🏌🏽‍♂️ 』\n`;
            texto += `🛡️ 𝒔𝒆𝒄𝒕𝒐𝒓: 𝒈𝒓𝒖𝒑𝒂𝒍 𝒂𝒄𝒕𝒊𝒗𝒐\n`;
            texto += `───────────────────────\n\n`;
            
            texto += `💠 **𝒏𝒐𝒎𝒃𝒓𝒆:**\n╰─> ${metadata.subject}\n\n`;
            
            texto += `👥 **𝒂𝒇𝒐𝒓𝒐:**\n╰─> ${participantes} 𝒖𝒔𝒖𝒂𝒓𝒊𝒐𝒔 𝒓𝒆𝒔𝒕𝒓𝒆𝒂𝒅𝒐𝒔\n\n`;
            
            texto += `👑 **𝒇𝒐𝒖𝒏𝒅𝒆𝒓:**\n╰─> @${creador.split('@')[0]}\n\n`;
            
            texto += `🆔 **𝒄𝒐́𝒅𝒊𝒈𝒐 𝒅𝒆 𝒆𝒏𝒍𝒂𝒄𝒆:**\n╰─> ${metadata.id}\n`;
            
            texto += `───────────────────────\n`;
            texto += `🚀 **𝒔𝒕𝒂𝒕𝒖𝒔:** 𝒊𝒏𝒇𝒐𝒓𝒎𝒂𝒄𝒊𝒐́𝒏 𝒔𝒊𝒏𝒄𝒓𝒐𝒏𝒊𝒛𝒂𝒅𝒂\n`;
            texto += `🏌🏽‍♂️ _𝒃𝒚 𝒋𝒉𝒐𝒏-𝒃𝒐𝒕 𝒑𝒓𝒆𝒎𝒊𝒖𝒎 𝒔𝒚𝒔𝒕𝒆𝒎_`;

            await sock.sendMessage(from, { 
                text: texto, 
                mentions: [creador],
                contextInfo: {
                    externalAdReply: {
                        title: "🛰️ 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕: 𝒄𝒐𝒏𝒕𝒓𝒐𝒍 𝒕𝒐𝒕𝒂𝒍",
                        body: "𝒅𝒂𝒕𝒐𝒔 𝒅𝒆𝒍 𝒈𝒓𝒖𝒑𝒐 𝒆𝒙𝒕𝒓𝒂𝒊́𝒅𝒐𝒔 🚀",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: msg });

            await sock.sendMessage(from, { react: { text: "🏌🏽‍♂️", key: msg.key } });

        } catch (e) { 
            console.log("Error en infogp:", e);
        }
    }
};
