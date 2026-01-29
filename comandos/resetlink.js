module.exports = {
    name: 'resetlink',
    description: '𝒓𝒆𝒗𝒐𝒄𝒂𝒄𝒊𝒐́𝒏 𝒚 𝒂𝒄𝒕𝒖𝒂𝒍𝒊𝒛𝒂𝒄𝒊𝒐́𝒏 𝒅𝒆𝒍 𝒆𝒏𝒍𝒂𝒄𝒆 𝒅𝒆𝒍 𝒔𝒆𝒄𝒕𝒐𝒓',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        // URL de la imagen restaurada
        const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

        try {
            // 1. VALIDACIÓN DE ENTORNO
            if (!from.endsWith('@g.us')) return;

            // 2. VERIFICACIÓN DE AUTORIDAD
            const metadata = await sock.groupMetadata(from);
            const isAdmin = metadata.participants.find(p => p.id === (msg.key.participant || from))?.admin || isOwner;
            
            if (!isAdmin) {
                return await sock.sendMessage(from, { 
                    text: `『 🚫 **𝒂𝒄𝒄𝒆𝒔𝒐 𝒅𝒆𝒏𝒆𝒈𝒂𝒅𝒐** 🏌🏽‍♂️ 』\n\n𝒔𝒐𝒍𝒐 𝒍𝒐𝒔 *𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒅𝒐𝒓𝒆𝒔* 𝒕𝒊𝒆𝒏𝒆𝒏 𝒂𝒖𝒕𝒐𝒓𝒊𝒛𝒂𝒄𝒊𝒐́𝒏 𝒑𝒂𝒓𝒂 𝒓𝒆𝒔𝒕𝒂𝒖𝒓𝒂𝒓 𝒍𝒂 𝒔𝒆𝒈𝒖𝒓𝒊𝒅𝒂𝒅 𝒅𝒆𝒍 𝒔𝒆𝒄𝒕𝒐𝒓. 🚀` 
                }, { quoted: msg });
            }

            // 3. EJECUCIÓN: REVOCAR ENLACE
            await sock.groupRevokeInvite(from);
            
            // 4. DISEÑO DE RESPUESTA: INTERFAZ DE SEGURIDAD CON FOTO
            let resetMsg = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒆𝒄𝒖𝒓𝒊𝒕𝒚 𝒖𝒑𝒅𝒂𝒕𝒆** 🏌🏽‍♂️ 』\n\n`;
            resetMsg += `┌──『 🔒 **𝒑𝒓𝒐𝒕𝒐𝒄𝒐𝒍𝒐 𝒅𝒆 𝒔𝒆𝒈𝒖𝒓𝒊𝒅𝒂𝒅** 』\n`;
            resetMsg += `│ ✅ **𝒆𝒔𝒕𝒂𝒅𝒐:** 𝒆𝒏𝒍𝒂𝒄𝒆 𝒓𝒆𝒗𝒐𝒄𝒂𝒅𝒐\n`;
            resetMsg += `│ 🛡️ **𝒂𝒄𝒄𝒊𝒐́𝒏:** 𝒏𝒖𝒆𝒗𝒐 𝒄𝒐́𝒅𝒊𝒈𝒐 𝒈𝒆𝒏𝒆𝒓𝒂𝒅𝒐\n`;
            resetMsg += `│ 🛰️ **𝒔𝒚𝒔𝒕𝒆𝒎:** 𝒂𝒄𝒄𝒆𝒔𝒐 𝒂𝒏𝒕𝒆𝒓𝒊𝒐𝒓 𝒃𝒍𝒐𝒒𝒖𝒆𝒂𝒅𝒐\n`;
            resetMsg += `└─────────────────────────\n\n`;
            resetMsg += `🚀 **𝒔𝒚𝒔𝒕𝒆𝒎:** 𝒍𝒂 𝒔𝒆𝒈𝒖𝒓𝒊𝒅𝒂𝒅 𝒅𝒆𝒍 𝒈𝒓𝒖𝒑𝒐 𝒉𝒂 𝒔𝒊𝒅𝒐 𝒂𝒄𝒕𝒖𝒂𝒍𝒊𝒛𝒂𝒅𝒂.\n`;
            resetMsg += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒑𝒓𝒆𝒎𝒊𝒖𝒎 𝒔𝒚𝒔𝒕𝒆𝒎_`;

            await sock.sendMessage(from, { 
                text: resetMsg,
                contextInfo: {
                    externalAdReply: {
                        title: "🛰️ 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒆𝒄𝒖𝒓𝒊𝒕𝒚 𝒄𝒆𝒏𝒕𝒆𝒓",
                        body: "𝒑𝒓𝒐𝒕𝒐𝒄𝒐𝒍𝒐 𝒅𝒆 𝒓𝒆𝒔𝒆𝒕𝒆𝒐 𝒄𝒐𝒎𝒑𝒍𝒆𝒕𝒂𝒅𝒐 🚀",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        showAdAttribution: true
                    }
                }
            }, { quoted: msg });

            await sock.sendMessage(from, { react: { text: "🔒", key: msg.key } });

        } catch (e) {
            await sock.sendMessage(from, { 
                text: `『 ❌ **𝒆𝒓𝒓𝒐𝒓 𝒅𝒆 𝒔𝒊𝒔𝒕𝒆𝒎𝒂** 🚀 』\n\n𝒂𝒔𝒆𝒈𝒖́𝒓𝒂𝒕𝒆 𝒅𝒆 𝒒𝒖𝒆 𝒆𝒍 𝒃𝒐𝒕 𝒔𝒆𝒂 *𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒅𝒐𝒓* 𝒑𝒂𝒓𝒂 𝒓𝒆𝒔𝒆𝒕𝒆𝒂𝒓 𝒆𝒍 𝒔𝒆𝒄𝒕𝒐𝒓. 🏌🏽‍♂️` 
            }, { quoted: msg });
        }
    }
};
