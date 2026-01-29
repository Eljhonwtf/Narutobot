module.exports = {
    name: 'kick',
    description: '𝒆𝒍𝒊𝒎𝒊𝒏𝒂𝒄𝒊𝒐́𝒏 𝒕𝒂́𝒄𝒕𝒊𝒄𝒂 𝒅𝒆 𝒖𝒔𝒖𝒂𝒓𝒊𝒐𝒔',
    async run(sock, msg, body, args, isOwner) {
        const from = msg.key.remoteJid;
        const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

        // 1. VERIFICACIÓN DE ENTORNO
        if (!from.endsWith('@g.us')) {
            return sock.sendMessage(from, { 
                text: "『 🚀 **𝒂𝒗𝒊𝒔𝒐 𝒅𝒆𝒍 𝒔𝒊𝒔𝒕𝒆𝒎𝒂** 🏌🏽‍♂️ 』\n\n¿Viste que eres tonto? Este comando solo funciona en grupos. ⚠️" 
            }, { quoted: msg });
        }

        try {
            const groupMetadata = await sock.groupMetadata(from);
            const participants = groupMetadata.participants;
            
            // 2. VERIFICACIÓN DE RANGO DEL BOT
            const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
            const isBotAdmin = participants.find(p => p.id === botNumber)?.admin !== null;
            if (!isBotAdmin) return sock.sendMessage(from, { 
                text: "『 ⚠️ **𝒆𝒓𝒓𝒐𝒓 𝒅𝒆 𝒑𝒆𝒓𝒎𝒊𝒔𝒐𝒔** 🚀 』\n\nNecesito ser *administrador* para ejecutar la limpieza. 🏌🏽‍♂️" 
            }, { quoted: msg });

            // 3. VERIFICACIÓN DE AUTORIDAD (ADMIN O OWNER)
            const sender = msg.key.participant || msg.key.remoteJid;
            const isAdmin = participants.find(p => p.id === sender)?.admin !== null;
            
            if (!isAdmin && !isOwner) {
                return sock.sendMessage(from, { 
                    text: "『 🚫 **𝒂𝒄𝒄𝒆𝒔𝒐 𝒅𝒆𝒏𝒆𝒈𝒂𝒅𝒐** 🏌🏽‍♂️ 』\n\nSolo los *administradores* o el *jefe* pueden usar este comando. 🚀" 
                }, { quoted: msg });
            }

            // 4. IDENTIFICACIÓN DEL OBJETIVO
            let usuario = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || 
                          msg.message.extendedTextMessage?.contextInfo?.participant;

            if (!usuario) return sock.sendMessage(from, { 
                text: "『 ⚠️ **𝒐𝒃𝒋𝒆𝒕𝒊𝒗𝒐 𝒏𝒐 𝒅𝒆𝒕𝒆𝒄𝒕𝒂𝒅𝒐** 🚀 』\n\nMenciona al usuario que deseas eliminar o responde a su mensaje. 🏌🏽‍♂️" 
            }, { quoted: msg });

            // 5. EJECUCIÓN DEL PROTOCOLO KICK
            await sock.groupParticipantsUpdate(from, [usuario], "remove");

            // 6. DISEÑO DE CONFIRMACIÓN DE EXTERMINIO (HÍBRIDO)
            let kickMsg = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒆𝒙𝒕𝒆𝒓𝒎𝒊𝒏𝒂𝒕𝒊𝒐𝒏** 🏌🏽‍♂️ 』\n\n`;
            kickMsg += `┌──『 🔒 **𝒆𝒔𝒕𝒂𝒅𝒐 𝒅𝒆𝒍 𝒔𝒆𝒄𝒕𝒐𝒓** 』\n`;
            kickMsg += `│ 🚫 Estado: Usuario eliminado\n`;
            kickMsg += `│ 🧹 Acción: Limpieza completada\n`;
            kickMsg += `│ 🛡️ Autoridad: Admin System\n`;
            kickMsg += `└─────────────────────────\n\n`;
            kickMsg += `🚀 **𝒔𝒚𝒔𝒕𝒆𝒎:** El objetivo ha sido retirado del sector.\n`;
            kickMsg += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

            await sock.sendMessage(from, { 
                text: kickMsg,
                contextInfo: {
                    externalAdReply: {
                        title: "🛰️ 𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒄𝒊𝒐́𝒏 𝒄𝒆𝒏𝒕𝒓𝒂𝒍 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕",
                        body: "Modo Dios: Ejecutando limpieza 🚀",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        showAdAttribution: true
                    }
                }
            }, { quoted: msg });

            await sock.sendMessage(from, { react: { text: "🏌🏽‍♂️", key: msg.key } });

        } catch (err) {
            console.log(err);
            await sock.sendMessage(from, { 
                text: "『 ❌ **𝒆𝒓𝒓𝒐𝒓 𝒅𝒆 𝒔𝒊𝒔𝒕𝒆𝒎𝒂** 🚀 』\n\nNo se pudo completar la expulsión. 🏌🏽‍♂️" 
            }, { quoted: msg });
        }
    }
};
