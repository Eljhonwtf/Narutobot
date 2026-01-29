module.exports = {
    name: 'link',
    description: '𝒈𝒆𝒏𝒆𝒓𝒂𝒄𝒊𝒐́𝒏 𝒅𝒆 𝒆𝒏𝒍𝒂𝒄𝒆 𝒅𝒆 𝒂𝒄𝒄𝒆𝒔𝒐',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        try {
            // 1. VERIFICACIÓN DE ENTORNO
            if (!from.endsWith('@g.us')) return;

            // 2. VERIFICACIÓN DE RANGO
            const metadata = await sock.groupMetadata(from);
            const isAdmin = metadata.participants.find(p => p.id === (msg.key.participant || msg.key.remoteJid))?.admin || isOwner;
            
            if (!isAdmin) {
                return await sock.sendMessage(from, { 
                    text: `『 🚫 **𝒂𝒄𝒄𝒆𝒔𝒐 𝒅𝒆𝒏𝒆𝒈𝒂𝒅𝒐** 🏌🏽‍♂️ 』\n\nSolo los *administradores* tienen permiso para extraer el enlace del sector. 🚀` 
                }, { quoted: msg });
            }

            // 3. EXTRACCIÓN DEL CÓDIGO (Requiere que el Bot sea Admin)
            const code = await sock.groupInviteCode(from);
            const link = `https://chat.whatsapp.com/${code}`;

            // --- DISEÑO HÍBRIDO (SIN FOTO PARA MÁXIMA VELOCIDAD) ---
            let linkMsg = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒂𝒄𝒄𝒆𝒔𝒔 𝒍𝒊𝒏𝒌** 🏌🏽‍♂️ 』\n\n`;
            linkMsg += `┌──『 🔗 **𝒆𝒏𝒍𝒂𝒄𝒆 𝒅𝒆 𝒂𝒄𝒄𝒆𝒔𝒐** 』\n`;
            linkMsg += `│\n`;
            linkMsg += `│ ${link}\n`;
            linkMsg += `│\n`;
            linkMsg += `└─────────────────────────\n\n`;
            linkMsg += `🚀 **𝒔𝒚𝒔𝒕𝒆𝒎:** Código generado con éxito.\n`;
            linkMsg += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

            // 4. ENVÍO SEGURO
            await sock.sendMessage(from, { 
                text: linkMsg,
                contextInfo: {
                    externalAdReply: {
                        title: "🛰️ NARUTOBOT NETWORK",
                        body: "Enlace de invitación oficial",
                        mediaType: 1,
                        showAdAttribution: true
                    }
                }
            }, { quoted: msg });

            await sock.sendMessage(from, { react: { text: "🔗", key: msg.key } });

        } catch (e) {
            console.log(e);
            await sock.sendMessage(from, { 
                text: `『 ❌ **𝒆𝒓𝒓𝒐𝒓 𝒅𝒆 𝒔𝒊𝒔𝒕𝒆𝒎𝒂** 🚀 』\n\nNo se pudo generar el enlace. Asegúrate de que el bot sea *Administrador*. 🏌🏽‍♂️` 
            }, { quoted: msg });
        }
    }
};
