module.exports = {
    name: 'profile',
    description: 'Ver la información del usuario',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

        try {
            // 1. ¿A quién vamos a ver? (Citado, Mencionado o uno mismo)
            const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
            const quoted = msg.message.extendedTextMessage?.contextInfo?.participant;
            const target = mentioned || quoted || (msg.key.participant || msg.key.remoteJid);
            
            // 2. REACCIÓN DE INICIO
            await sock.sendMessage(from, { react: { text: "👤", key: msg.key } });

            const userTag = `@${target.split('@')[0]}`;
            const isTargetOwner = target.includes('584142577312'); // Tu número

            // 3. DISEÑO HÍBRIDO CON LENGUAJE NORMAL
            let profileMsg = `『 🚀 **𝒑𝒆𝒓𝒇𝒊𝒍 𝒅𝒆 𝒖𝒔𝒖𝒂𝒓𝒊𝒐** 🏌🏽‍♂️ 』\n\n`;
            
            profileMsg += `┌──『 👤 **𝒅𝒂𝒕𝒐𝒔** 』\n`;
            profileMsg += `│ 👤 Usuario: ${userTag}\n`;
            profileMsg += `│ 🆔 Número: ${target.split('@')[0]}\n`;
            profileMsg += `│ 🛡️ Rango: ${isTargetOwner ? 'Dueño del Bot 👑' : 'Usuario 🏌🏽‍♂️'}\n`;
            profileMsg += `└─────────────────────────\n\n`;

            profileMsg += `┌──『 📊 **𝒆𝒔𝒕𝒂𝒅𝒐** 』\n`;
            profileMsg += `│ ⚡ Estatus: Activo\n`;
            profileMsg += `│ 🔒 Seguridad: ${isTargetOwner ? 'Máxima' : 'Normal'}\n`;
            profileMsg += `│ 🏆 Nivel: ${isTargetOwner ? 'Infinito' : 'Básico'}\n`;
            profileMsg += `└─────────────────────────\n\n`;

            profileMsg += `🚀 **𝒃𝒐𝒕:** Información cargada correctamente.\n`;
            profileMsg += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕_`;

            // 4. ENVÍO SEGURO CON IMAGEN (Para que no se bloquee)
            await sock.sendMessage(from, { 
                image: { url: thumbUrl },
                caption: profileMsg,
                mentions: [target]
            }, { quoted: msg });

        } catch (e) {
            console.error(e);
            await sock.sendMessage(from, { 
                text: `『 ❌ **𝒆𝒓𝒓𝒐𝒓** 』\n\nNo pude ver el perfil de ese usuario.` 
            }, { quoted: msg });
        }
    }
};
