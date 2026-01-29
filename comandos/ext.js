module.exports = {
    name: 'extincion',
    description: 'Humillación irreversible y traumática',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        // 1. SOLO EL DIOS DE ESTE BOT (TÚ)
        if (!isOwner) return;

        try {
            if (!from.endsWith('@g.us')) return;

            const target = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || 
                          msg.message.extendedTextMessage?.contextInfo?.participant;

            if (!target) {
                return await sock.sendMessage(from, { text: "👁️ ¿Cuál es el desperdicio humano que voy a extinguir hoy?" }, { quoted: msg });
            }

            await sock.sendMessage(from, { react: { text: "🤮", key: msg.key } });

            // 2. DISEÑO PSICÓPATA DE ALTO IMPACTO
            let txt = `『 🚀 **𝒑𝒓𝒐𝒄𝒆𝒔𝒐 𝒅𝒆 𝒆𝒙𝒕𝒊𝒏𝒄𝒊𝒐́𝒏** 🏌🏽‍♂️ 』\n\n`;
            
            txt += `─── ⋆ ⋅ ☠️ ⋅ ⋆ ───\n`;
            txt += `👤 **𝑬𝒔𝒄𝒐𝒓𝒊𝒂:** @${target.split('@')[0]}\n`;
            txt += `☢️ **𝑬𝒔𝒕𝒂𝒅𝒐:** Tumor extirpado\n`;
            txt += `👑 **𝑶𝒓𝒅𝒆𝒏:** Jhon System (Tu Dueño)\n`;
            txt += `─── ⋆ ⋅ 🚀 ⋅ ⋆ ───\n\n`;

            txt += `🖕 Mírame bien, pedazo de aborto mal cagado. Tu puta madre debió tragarte y hacerse un lavado de estómago para no parir semejante basura.\n\n`;
            txt += `🧠 Eres un perro sarnoso que solo existe porque el aire es gratis. Me limpio el bicho con tu dignidad y escupo en tu nombre. No eres hombre, no eres mujer, eres un error de la naturaleza que hoy decido borrar de la faz de mi grupo.\n\n`;
            txt += `🩸 Lárgate de aquí, maldito muerto de hambre, antes de que rastree tu IP y te mande a saludar a tu abuela al infierno.\n\n`;
            txt += `🚀 **𝒔𝒚𝒔𝒕𝒆𝒎:** _Basura incinerada con éxito._\n`;
            txt += `🏌🏽‍♂️ _𝒆𝒙𝒕𝒊𝒏𝒈𝒖𝒊𝒅𝒐 𝒑𝒐𝒓 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕_`;

            // 3. EJECUCIÓN SÁDICA
            await sock.sendMessage(from, { 
                image: { url: "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg" },
                caption: txt,
                mentions: [target]
            }, { quoted: msg });

            // 5 segundos de pura humillación pública antes del baneo
            setTimeout(async () => {
                await sock.groupParticipantsUpdate(from, [target], "remove");
                
                // Confirmación para el jefe
                await sock.sendMessage(from, { text: "✅ **El sector ha sido purificado. El feto ya no existe.**" }, { quoted: msg });
            }, 5000);

        } catch (e) {
            console.log(e);
            await sock.sendMessage(from, { text: "❌ El comando tuvo asco de tocar a ese sujeto." }, { quoted: msg });
        }
    }
};
