module.exports = {
    name: 'setdesc',
    description: '𝒓𝒆𝒄𝒐𝒏𝒇𝒊𝒈𝒖𝒓𝒂𝒄𝒊𝒐́𝒏 𝒅𝒆𝒍 𝒏𝒖́𝒄𝒍𝒆𝒐 𝒊𝒏𝒇𝒐𝒓𝒎𝒂𝒕𝒊𝒗𝒐',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

        try {
            // 1. VERIFICACIÓN DE ENTORNO
            if (!from.endsWith('@g.us')) return;

            // 2. VERIFICACIÓN DE AUTORIDAD (ADMINS O JEFE)
            const metadata = await sock.groupMetadata(from);
            const isAdmin = metadata.participants.find(p => p.id === (msg.key.participant || msg.key.remoteJid))?.admin || isOwner;
            
            if (!isAdmin) {
                return await sock.sendMessage(from, { 
                    text: `『 🚫 **𝒂𝒄𝒄𝒆𝒔𝒐 𝒅𝒆𝒏𝒆𝒈𝒂𝒅𝒐** 🏌🏽‍♂️ 』\n\n𝒔𝒐𝒍𝒐 𝒍𝒐𝒔 *𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒅𝒐𝒓𝒆𝒔* 𝒕𝒊𝒆𝒏𝒆𝒏 𝒆𝒍 𝒄𝒐𝒏𝒕𝒓𝒐𝒍 𝒅𝒆 𝒍𝒂 𝒃𝒊𝒐𝒔 𝒅𝒆𝒍 𝒔𝒆𝒄𝒕𝒐𝒓. 🚀` 
                }, { quoted: msg });
            }

            // 3. VALIDACIÓN DE CONTENIDO
            const newDesc = args.join(" ");
            if (!newDesc) {
                return await sock.sendMessage(from, { 
                    text: `『 ⚠️ **𝒆𝒓𝒓𝒐𝒓 𝒅𝒆 𝒅𝒂𝒕𝒐𝒔** 🚀 』\n\n𝒅𝒆𝒃𝒆𝒔 𝒊𝒏𝒈𝒓𝒆𝒔𝒂𝒓 𝒍𝒂 𝒏𝒖𝒆𝒗𝒂 𝒊𝒏𝒇𝒐𝒓𝒎𝒂𝒄𝒊𝒐́𝒏 𝒑𝒂𝒓𝒂 𝒆𝒍 𝒔𝒆𝒄𝒕𝒐𝒓.\n\n🏌🏽‍♂️ **𝒆𝒋𝒆𝒎𝒑𝒍𝒐:**\n*/𝒔𝒆𝒕𝒅𝒆𝒔𝒄 𝒃𝒊𝒆𝒏𝒗𝒆𝒏𝒊𝒅𝒐𝒔 𝒂𝒍 𝒄𝒍𝒂𝒏*` 
                }, { quoted: msg });
            }

            // 4. EJECUCIÓN: ACTUALIZAR DESCRIPCIÓN
            await sock.groupUpdateDescription(from, newDesc);

            // 5. DISEÑO DE RESPUESTA: INTERFAZ DE ACTUALIZACIÓN
            let descMsg = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒅𝒂𝒕𝒂 𝒖𝒑𝒅𝒂𝒕𝒆** 🏌🏽‍♂️ 』\n\n`;
            descMsg += `┌──『 📝 **𝒊𝒏𝒇𝒐𝒓𝒎𝒂𝒄𝒊𝒐́𝒏 𝒂𝒄𝒕𝒖𝒂𝒍𝒊𝒛𝒂𝒅𝒂** 』\n`;
            descMsg += `│ ✅ **𝒆𝒔𝒕𝒂𝒅𝒐:** 𝒃𝒊𝒐𝒔 𝒎𝒐𝒅𝒊𝒇𝒊𝒄𝒂𝒅𝒂\n`;
            descMsg += `│ 🛡️ **𝒔𝒆𝒄𝒕𝒐𝒓:** 𝒅𝒆𝒔𝒄𝒓𝒊𝒑𝒄𝒊𝒐́𝒏 𝒂𝒄𝒕𝒊𝒗𝒂\n`;
            descMsg += `│ ⚙️ **𝒔𝒚𝒔𝒕𝒆𝒎:** 𝒄𝒂𝒎𝒃𝒊𝒐𝒔 𝒂𝒑𝒍𝒊𝒄𝒂𝒅𝒐𝒔\n`;
            descMsg += `└─────────────────────────\n\n`;
            descMsg += `🚀 **𝒔𝒚𝒔𝒕𝒆𝒎:** 𝒍𝒂 𝒏𝒖𝒆𝒗𝒂 𝒅𝒆𝒔𝒄𝒓𝒊𝒑𝒄𝒊𝒐́𝒏 𝒉𝒂 𝒔𝒊𝒅𝒐 𝒊𝒏𝒚𝒆𝒄𝒕𝒂𝒅𝒂.\n`;
            descMsg += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒑𝒓𝒆𝒎𝒊𝒖𝒎 𝒔𝒚𝒔𝒕𝒆𝒎_`;

            await sock.sendMessage(from, { 
                text: descMsg,
                contextInfo: {
                    externalAdReply: {
                        title: "🛰️ 𝒏𝒖́𝒄𝒍𝒆𝒐 𝒊𝒏𝒇𝒐𝒓𝒎𝒂𝒕𝒊𝒗𝒐: 𝒂𝒄𝒕𝒖𝒂𝒍𝒊𝒛𝒂𝒅𝒐",
                        body: "𝒅𝒂𝒕𝒐𝒔 𝒅𝒆𝒍 𝒔𝒆𝒄𝒕𝒐𝒓 𝒎𝒐𝒅𝒊𝒇𝒊𝒄𝒂𝒅𝒐𝒔 🚀",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        showAdAttribution: true
                    }
                }
            }, { quoted: msg });

            await sock.sendMessage(from, { react: { text: "📝", key: msg.key } });

        } catch (e) {
            console.log(e);
            await sock.sendMessage(from, { 
                text: `『 ❌ **𝒆𝒓𝒓𝒐𝒓 𝒅𝒆 𝒔𝒊𝒔𝒕𝒆𝒎𝒂** 🚀 』\n\n𝒏𝒐 𝒔𝒆 𝒑𝒖𝒅𝒐 𝒂𝒄𝒕𝒖𝒂𝒍𝒊𝒛𝒂𝒓 𝒍𝒂 𝒊𝒏𝒇𝒐. ¿𝒆𝒍 𝒃𝒐𝒕 𝒕𝒊𝒆𝒏𝒆 𝒓𝒂𝒏𝒈𝒐 𝒅𝒆 𝒂𝒅𝒎𝒊𝒏? 🏌🏽‍♂️` 
            });
        }
    }
};
