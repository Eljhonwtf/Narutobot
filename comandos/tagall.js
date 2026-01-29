module.exports = {
    name: 'tagall',
    description: 'Mencionar a todos los miembros del grupo',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        try {
            if (!from.endsWith('@g.us')) return;

            // 1. REACCIÓN DE INICIO
            await sock.sendMessage(from, { react: { text: "📢", key: msg.key } });

            // 2. VERIFICACIÓN DE RANGO
            const metadata = await sock.groupMetadata(from);
            const participants = metadata.participants;
            const sender = msg.key.participant || msg.key.remoteJid;
            const isAdmin = participants.find(p => p.id === sender)?.admin !== null;

            if (!isAdmin && !isOwner) {
                return await sock.sendMessage(from, { 
                    text: "❌ *Acceso Denegado:* Solo administradores." 
                }, { quoted: msg });
            }

            // 3. CONSTRUCCIÓN DEL DISEÑO (Símbolos y Estética)
            let mensajeExtra = args.length > 0 ? args.join(' ') : 'Sin mensaje específico';
            
            let txt = `┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n`;
            txt += `┃   『 🚀 **𝒂𝒕𝒆𝒏𝒄𝒊𝒐́𝒏 𝒈𝒆𝒏𝒆𝒓𝒂𝒍** 🏌🏽‍♂️ 』   ┃\n`;
            txt += `┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n\n`;
            
            txt += `📢 **𝑨𝒗𝒊𝒔𝒐:** ${mensajeExtra}\n\n`;
            txt += `┏━━『 👥 **𝒎𝒊𝒆𝒎𝒃𝒓𝒐𝒔** 』\n`;
            
            let mentions = [];
            participants.forEach((mem, i) => {
                txt += `┃ 🔹 @${mem.id.split('@')[0]}\n`;
                mentions.push(mem.id);
            });

            txt += `┗━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
            txt += `🚀 **𝒃𝒐𝒕:** _Notificación global enviada._\n`;
            txt += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕_`;

            // 4. ENVÍO CON MENCIONES Y QUOTED
            await sock.sendMessage(from, { 
                text: txt, 
                mentions: mentions 
            }, { quoted: msg });

        } catch (e) {
            console.log(e);
            await sock.sendMessage(from, { 
                text: "❌ Error al procesar el llamado general." 
            }, { quoted: msg });
        }
    }
};
