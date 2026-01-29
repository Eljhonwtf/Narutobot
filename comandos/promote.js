module.exports = {
    name: 'promote',
    description: 'Dar administrador a un usuario',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        try {
            if (!from.endsWith('@g.us')) return;

            // 1. ¿Quién da la orden? (Solo Admins o el Jefe)
            const metadata = await sock.groupMetadata(from);
            const participants = metadata.participants;
            const sender = msg.key.participant || msg.key.remoteJid;
            const isAdmin = participants.find(p => p.id === sender)?.admin !== null;

            if (!isAdmin && !isOwner) {
                return await sock.sendMessage(from, { text: "❌ Solo los administradores pueden usar este comando." }, { quoted: msg });
            }

            // 2. ¿A quién le damos admin? (Mencionado o citado)
            const target = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || 
                          msg.message.extendedTextMessage?.contextInfo?.participant;

            if (!target) {
                return await sock.sendMessage(from, { text: "⚠️ Menciona a alguien o responde a su mensaje para darle admin." }, { quoted: msg });
            }

            // 3. Ejecutar el ascenso
            await sock.groupParticipantsUpdate(from, [target], "promote");

            // 4. Diseño Híbrido
            let txt = `『 🚀 **𝒏𝒖𝒆𝒗𝒐 𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒅𝒐𝒓** 🏌🏽‍♂️ 』\n\n`;
            txt += `👤 **Usuario:** @${target.split('@')[0]}\n`;
            txt += `✅ **Acción:** Ahora tiene poder en el grupo.\n\n`;
            txt += `🚀 _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕_`;

            await sock.sendMessage(from, { text: txt, mentions: [target] }, { quoted: msg });
            await sock.sendMessage(from, { react: { text: "🛡️", key: msg.key } });

        } catch (e) {
            console.log(e);
            await sock.sendMessage(from, { text: "❌ El bot necesita ser Admin para dar este rango." }, { quoted: msg });
        }
    }
};
