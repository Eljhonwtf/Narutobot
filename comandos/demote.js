module.exports = {
    name: 'demote',
    description: 'Quitar administrador a un usuario',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        try {
            if (!from.endsWith('@g.us')) return;

            // 1. Verificación de permisos
            const metadata = await sock.groupMetadata(from);
            const participants = metadata.participants;
            const sender = msg.key.participant || msg.key.remoteJid;
            const isAdmin = participants.find(p => p.id === sender)?.admin !== null;

            if (!isAdmin && !isOwner) {
                return await sock.sendMessage(from, { text: "❌ Solo los administradores pueden quitar el rango." }, { quoted: msg });
            }

            // 2. ¿A quién le quitamos admin?
            const target = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || 
                          msg.message.extendedTextMessage?.contextInfo?.participant;

            if (!target) {
                return await sock.sendMessage(from, { text: "⚠️ Menciona a alguien o responde a su mensaje para quitarle el admin." }, { quoted: msg });
            }

            // 3. Ejecutar la baja
            await sock.groupParticipantsUpdate(from, [target], "demote");

            // 4. Diseño Híbrido
            let txt = `『 🚀 **𝒂𝒅𝒎𝒊𝒏 𝒓𝒆𝒕𝒊𝒓𝒂𝒅𝒐** 🏌🏽‍♂️ 』\n\n`;
            txt += `👤 **Usuario:** @${target.split('@')[0]}\n`;
            txt += `🚫 **Acción:** Ya no tiene poder en el grupo.\n\n`;
            txt += `🚀 _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕_`;

            await sock.sendMessage(from, { text: txt, mentions: [target] }, { quoted: msg });
            await sock.sendMessage(from, { react: { text: "📉", key: msg.key } });

        } catch (e) {
            console.log(e);
            await sock.sendMessage(from, { text: "❌ El bot necesita ser Admin para quitar rangos." }, { quoted: msg });
        }
    }
};
