module.exports = {
    name: 'link',
    description: 'generación de enlace de acceso',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

        try {
            if (!from.endsWith('@g.us')) return;

            // 1. REACCIÓN DE PROCESANDO
            await sock.sendMessage(from, { react: { text: "🛰️", key: msg.key } });

            // 2. VERIFICACIÓN DE RANGO
            const metadata = await sock.groupMetadata(from);
            const isAdmin = metadata.participants.find(p => p.id === (msg.key.participant || msg.key.remoteJid))?.admin || isOwner;
            
            if (!isAdmin) {
                return await sock.sendMessage(from, { 
                    text: `『 🚫 **𝒂𝒄𝒄𝒆𝒔𝒐 𝒅𝒆𝒏𝒆𝒈𝒂𝒅𝒐** 』\n\nSolo los *administradores* pueden solicitar el enlace. 🚀` 
                }, { quoted: msg });
            }

            // 3. EXTRACCIÓN DEL CÓDIGO
            const code = await sock.groupInviteCode(from);
            const link = `https://chat.whatsapp.com/${code}`;

            // 4. DISEÑO HÍBRIDO TÁCTICO
            let linkMsg = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒂𝒄𝒄𝒆𝒔𝒔 𝒍𝒊𝒏𝒌** 🏌🏽‍♂️ 』\n\n`;
            linkMsg += `┌──『 🔗 **𝒆𝒏𝒍𝒂𝒄𝒆 𝒅𝒆 𝒂𝒄𝒄𝒆𝒔𝒐** 』\n`;
            linkMsg += `│\n`;
            linkMsg += `│ ${link}\n`;
            linkMsg += `│\n`;
            linkMsg += `└─────────────────────────\n\n`;
            linkMsg += `🚀 **𝒔𝒚𝒔𝒕𝒆𝒎:** Enlace extraído correctamente.\n`;
            linkMsg += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

            // 5. ENVÍO SEGURO (TEXTO PURO + QUOTED)
            // Nota: Se envía sin externalAdReply para evitar el bloqueo de seguridad de WhatsApp sobre links.
            await sock.sendMessage(from, { 
                text: linkMsg,
                contextInfo: {
                    externalAdReply: {
                        title: "🛰️ NARUTOBOT NETWORK",
                        body: "Acceso al sector autorizado",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        showAdAttribution: true
                    }
                }
            }, { quoted: msg });

            await sock.sendMessage(from, { react: { text: "✅", key: msg.key } });

        } catch (e) {
            console.log(e);
            // Si falla el envío con imagen, enviamos solo texto para no dejarte colgado
            try {
                const code = await sock.groupInviteCode(from);
                await sock.sendMessage(from, { text: `🚀 *Enlace:* https://chat.whatsapp.com/${code}` }, { quoted: msg });
            } catch (err) {
                await sock.sendMessage(from, { 
                    text: `『 ❌ **𝒆𝒓𝒓𝒐𝒓 𝒅𝒆 𝒔𝒊𝒔𝒕𝒆𝒎𝒂** 』\n\nNo pude generar el enlace. Verifica que el bot sea *Administrador*.` 
                }, { quoted: msg });
            }
        }
    }
};
