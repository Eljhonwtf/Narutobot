module.exports = {
    name: 'tagall',
    description: 'Menciona a todos',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        try {
            if (!from.endsWith('@g.us')) return;

            const metadata = await sock.groupMetadata(from);
            const participants = metadata.participants;
            
            let txt = `『 🚀 **𝒂𝒕𝒆𝒏𝒄𝒊𝒐́𝒏 𝒕𝒐𝒅𝒐𝒔** 』\n\n`;
            txt += `🧐 **Nota:** ${args.join(' ') || 'Sin mensaje'}\n\n`;
            
            let mentions = [];
            for (let mem of participants) {
                txt += `🔹 @${mem.id.split('@')[0]}\n`;
                mentions.push(mem.id);
            }

            txt += `\n🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕_`;

            await sock.sendMessage(from, { text: txt, mentions: mentions }, { quoted: msg });
            await sock.sendMessage(from, { react: { text: "📢", key: msg.key } });

        } catch (e) {
            await sock.sendMessage(from, { text: "❌ Error" }, { quoted: msg });
        }
    }
};
