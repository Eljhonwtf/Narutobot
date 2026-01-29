module.exports = {
    name: 'tagall',
    description: '𝒄𝒐𝒏𝒗𝒐𝒄𝒂𝒕𝒐𝒓𝒊𝒂 𝒈𝒆𝒏𝒆𝒓𝒂𝒍 𝒅𝒆 𝒖𝒏𝒊𝒅𝒂𝒅𝒆𝒔',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        try {
            if (!from.endsWith('@g.us')) return;

            const metadata = await sock.groupMetadata(from);
            const isAdmin = metadata.participants.find(p => p.id === (msg.key.participant || msg.key.remoteJid))?.admin || isOwner;
            
            if (!isAdmin) {
                return await sock.sendMessage(from, { 
                    text: `『 🚫 **𝒂𝒄𝒄𝒆𝒔𝒐 𝒅𝒆𝒏𝒆𝒈𝒂𝒅𝒐** 🏌🏽‍♂️ 』\n\n𝒔𝒐𝒍𝒐 𝒍𝒐𝒔 *𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒅𝒐𝒓𝒆𝒔* 𝒕𝒊𝒆𝒏𝒆𝒏 𝒂𝒖𝒕𝒐𝒓𝒊𝒅𝒂𝒅 𝒑𝒂𝒓𝒂 𝒆𝒍 𝒍𝒍𝒂𝒎𝒂𝒅𝒐. 🚀` 
                }, { quoted: msg });
            }

            const participants = metadata.participants.map(p => p.id);
            const nota = args.join(" ") || "𝒔𝒊𝒏 𝒏𝒐𝒕𝒂 𝒂𝒅𝒋𝒖𝒏𝒕𝒂";
            
            // --- DISEÑO: TERMINAL PURA (SIN FOTO) ---
            let texto = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒈𝒍𝒐𝒃𝒂𝒍 𝒕𝒂𝒈** 🏌🏽‍♂️ 』\n\n`;
            texto += `┌──『 📢 **𝒂𝒗𝒊𝒔𝒐 𝒅𝒆𝒍 𝒔𝒊𝒔𝒕𝒆𝒎𝒂** 』\n`;
            texto += `│ 📝 **𝒏𝒐𝒕𝒂:** ${nota}\n`;
            texto += `│ 👥 **𝒖𝒏𝒊𝒅𝒂𝒅𝒆𝒔:** ${participants.length}\n`;
            texto += `└─────────────────────────\n\n`;

            // Listado de usuarios con estética de terminal
            for (let mem of metadata.participants) {
                texto += `  🚀 @${mem.id.split('@')[0]}\n`;
            }

            texto += `\n🚀 **𝒔𝒕𝒂𝒕𝒖𝒔:** 𝒎𝒆𝒏𝒄𝒊𝒐́𝒏 𝒎𝒂𝒔𝒊𝒗𝒂 𝒆𝒋𝒆𝒄𝒖𝒕𝒂𝒅𝒂.\n`;
            texto += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

            await sock.sendMessage(from, { 
                text: texto,
                mentions: participants,
                contextInfo: {
                    externalAdReply: {
                        title: "🛰️ 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒏𝒆𝒕𝒘𝒐𝒓𝒌",
                        body: "𝒄𝒐𝒏𝒗𝒐𝒄𝒂𝒕𝒐𝒓𝒊𝒂 𝒈𝒆𝒏𝒆𝒓𝒂𝒍 𝒂𝒄𝒕𝒊𝒗𝒂𝒅𝒂 🔔",
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: false // Foto eliminada para mayor limpieza
                    }
                }
            }, { quoted: msg });

            await sock.sendMessage(from, { react: { text: "📢", key: msg.key } });

        } catch (e) { 
            await sock.sendMessage(from, { 
                text: `『 ❌ **𝒄𝒓𝒊𝒕𝒊𝒄𝒂𝒍 𝒆𝒓𝒓𝒐𝒓** 🚀 』\n\𝒏𝒐 𝒔𝒆 𝒑𝒖𝒅𝒐 𝒄𝒐𝒎𝒑𝒍𝒆𝒕𝒂𝒓 𝒆𝒍 𝒕𝒂𝒈𝒂𝒍𝒍. 🏌🏽‍♂️` 
            });
        }
    }
};
