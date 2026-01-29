module.exports = {
    name: 'tagall',
    description: 'Mencionar a todos los miembros del grupo',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        try {
            // 1. VERIFICACIÓN DE ENTORNO
            if (!from.endsWith('@g.us')) return;

            // 2. REACCIÓN DE INICIO
            await sock.sendMessage(from, { react: { text: "📣", key: msg.key } });

            // 3. VERIFICACIÓN DE RANGO (Solo Admins o el Jefe)
            const metadata = await sock.groupMetadata(from);
            const participants = metadata.participants;
            const sender = msg.key.participant || msg.key.remoteJid;
            const isAdmin = participants.find(p => p.id === sender)?.admin !== null;

            if (!isAdmin && !isOwner) {
                return await sock.sendMessage(from, { 
                    text: "❌ Solo los administradores pueden usar este comando." 
                }, { quoted: msg });
            }

            // 4. CONSTRUIR LA LISTA DE MENCIONES
            let txt = `『 🚀 **𝒂𝒕𝒆𝒏𝒄𝒊𝒐́𝒏 𝒂 𝒕𝒐𝒅𝒐𝒔** 🏌🏽‍♂️ 』\n\n`;
            txt += `📝 **Mensaje:** ${args.length > 0 ? args.join(' ') : 'Sin mensaje'}\n\n`;
            
            let mentions = [];
            participants.forEach(mem => {
                txt += `🔹 @${mem.id.split('@')[0]}\n`;
                mentions.push(mem.id);
            });

            txt += `\n🚀 _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕_`;

            // 5. ENVÍO SEGURO (Sin publicidad para que no falle)
            await sock.sendMessage(from, { 
                text: txt, 
                mentions: mentions 
            }, { quoted: msg });

        } catch (e) {
            console.log(e);
            await sock.sendMessage(from, { 
                text: "❌ No pude mencionar a todos. Inténtalo de nuevo." 
            }, { quoted: msg });
        }
    }
};
