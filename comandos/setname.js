module.exports = {
    name: 'setname',
    description: '𝒓𝒆𝒅𝒆𝒇𝒊𝒏𝒊𝒄𝒊𝒐́𝒏 𝒅𝒆 𝒊𝒅𝒆𝒏𝒕𝒊𝒅𝒂𝒅 𝒅𝒆𝒍 𝒔𝒆𝒄𝒕𝒐𝒓',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

        try {
            // 1. VERIFICACIÓN DE ENTORNO
            if (!from.endsWith('@g.us')) return;

            // 2. VERIFICACIÓN DE AUTORIDAD
            const metadata = await sock.groupMetadata(from);
            const isAdmin = metadata.participants.find(p => p.id === (msg.key.participant || msg.key.remoteJid))?.admin || isOwner;

            if (!isAdmin) {
                return await sock.sendMessage(from, { 
                    text: `『 🚫 **𝒂𝒄𝒄𝒆𝒔𝒐 𝒅𝒆𝒏𝒆𝒈𝒂𝒅𝒐** 🏌🏽‍♂️ 』\n\n𝒔𝒐𝒍𝒐 𝒍𝒐𝒔 *𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒅𝒐𝒓𝒆𝒔* 𝒕𝒊𝒆𝒏𝒆𝒏 𝒆𝒍 𝒑𝒐𝒅𝒆𝒓 𝒅𝒆 𝒓𝒆𝒃𝒂𝒖𝒕𝒊𝒛𝒂𝒓 𝒆𝒍 𝒔𝒆𝒄𝒕𝒐𝒓. 🚀` 
                }, { quoted: msg });
            }

            // 3. VALIDACIÓN DE PARÁMETROS
            const nuevoNombre = args.join(" ");
            if (!nuevoNombre) {
                return await sock.sendMessage(from, { 
                    text: `『 ⚠️ **𝒆𝒓𝒓𝒐𝒓 𝒅𝒆 𝒔𝒊𝒔𝒕𝒆𝒎𝒂** 🚀 』\n\n𝒅𝒆𝒃𝒆𝒔 𝒊𝒏𝒈𝒓𝒆𝒔𝒂𝒓 𝒍𝒂 𝒏𝒖𝒆𝒗𝒂 𝒆𝒕𝒊𝒒𝒖𝒆𝒕𝒂 𝒅𝒆 𝒊𝒅𝒆𝒏𝒕𝒊𝒅𝒂𝒅.\n\n🏌🏽‍♂️ **𝒆𝒋𝒆𝒎𝒑𝒍𝒐:**\n*/𝒔𝒆𝒕𝒏𝒂𝒎𝒆 𝒏𝒖𝒆𝒗𝒂 𝒆𝒓𝒂 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕*` 
                }, { quoted: msg });
            }

            // 4. EJECUCIÓN: ACTUALIZAR IDENTIDAD
            await sock.groupUpdateSubject(from, nuevoNombre);

            // 5. DISEÑO DE RESPUESTA: INTERFAZ DE IDENTIDAD
            let nameMsg = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒊𝒅𝒆𝒏𝒕𝒊𝒕𝒚 𝒔𝒚𝒔𝒕𝒆𝒎** 🏌🏽‍♂️ 』\n\n`;
            nameMsg += `┌──『 📝 **𝒊𝒅𝒆𝒏𝒕𝒊𝒅𝒂𝒅 𝒂𝒄𝒕𝒖𝒂𝒍𝒊𝒛𝒂𝒅𝒂** 』\n`;
            nameMsg += `│ ✅ **𝒆𝒔𝒕𝒂𝒅𝒐:** 𝒏𝒐𝒎𝒃𝒓𝒆 𝒎𝒐𝒅𝒊𝒇𝒊𝒄𝒂𝒅𝒐\n`;
            nameMsg += `│ 🏷️ **𝒏𝒖𝒆𝒗𝒐:** ${nuevoNombre}\n`;
            nameMsg += `│ 🛡️ **𝒔𝒚𝒔𝒕𝒆𝒎:** 𝒔𝒆𝒄𝒕𝒐𝒓 𝒔𝒊𝒏𝒄𝒓𝒐𝒏𝒊𝒛𝒂𝒅𝒐\n`;
            nameMsg += `└─────────────────────────\n\n`;
            nameMsg += `🚀 **𝒔𝒚𝒔𝒕𝒆𝒎:** 𝒍𝒂 𝒏𝒖𝒆𝒗𝒂 𝒊𝒅𝒆𝒏𝒕𝒊𝒅𝒂𝒅 𝒉𝒂 𝒔𝒊𝒅𝒐 𝒆𝒔𝒕𝒂𝒃𝒍𝒆𝒄𝒊𝒅𝒂.\n`;
            nameMsg += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒑𝒓𝒆𝒎𝒊𝒖𝒎 𝒔𝒚𝒔𝒕𝒆𝒎_`;

            await sock.sendMessage(from, { 
                text: nameMsg,
                contextInfo: {
                    externalAdReply: {
                        title: "🛰️ 𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒄𝒊𝒐́𝒏 𝒄𝒆𝒏𝒕𝒓𝒂𝒍 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕",
                        body: "𝒏𝒐𝒎𝒃𝒓𝒆 𝒅𝒆𝒍 𝒔𝒆𝒄𝒕𝒐𝒓 𝒓𝒆𝒄𝒐𝒏𝒇𝒊𝒈𝒖𝒓𝒂𝒅𝒐 🚀",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        showAdAttribution: true
                    }
                }
            }, { quoted: msg });

            await sock.sendMessage(from, { react: { text: "📝", key: msg.key } });

        } catch (e) {
            console.log("Error en setname:", e);
            await sock.sendMessage(from, { 
                text: `『 ❌ **𝒆𝒓𝒓𝒐𝒓 𝒅𝒆 𝒔𝒊𝒔𝒕𝒆𝒎𝒂** 🚀 』\n\n𝒇𝒂𝒍𝒍𝒐 𝒂𝒍 𝒂𝒄𝒕𝒖𝒂𝒍𝒊𝒛𝒂𝒓 𝒆𝒍 𝒏𝒐𝒎𝒃𝒓𝒆. 𝒗𝒆𝒓𝒊𝒇𝒊𝒄𝒂 𝒍𝒐𝒔 𝒑𝒆𝒓𝒎𝒊𝒔𝒐𝒔 𝒅𝒆𝒍 𝒃𝒐𝒕. 🏌🏽‍♂️` 
            });
        }
    }
};
