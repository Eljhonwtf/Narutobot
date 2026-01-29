module.exports = {
    name: 'listgroups',
    description: '𝒎𝒂𝒑𝒆𝒐 𝒅𝒆 𝒔𝒆𝒄𝒕𝒐𝒓𝒆𝒔 𝒚 𝒈𝒓𝒖𝒑𝒐𝒔 𝒂𝒄𝒕𝒊𝒗𝒐𝒔',
    run: async (sock, msg, body, args, isOwner) => {
        // PROTOCOLO DE PRIVACIDAD DEL JEFE
        if (!isOwner) return;

        const from = msg.key.remoteJid;
        const groups = await sock.groupFetchAllParticipating();
        const arrayGroups = Object.values(groups);
        
        // --- DISEÑO DE INTERFAZ DE VIGILANCIA ---
        let txt = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒈𝒍𝒐𝒃𝒂𝒍 𝒏𝒆𝒕𝒘𝒐𝒓𝒌** 🏌🏽‍♂️ 』\n\n`;
        
        txt += `┌──『 📡 **𝒆𝒔𝒕𝒂𝒅𝒐 𝒅𝒆 𝒍𝒂 𝒓𝒆𝒅** 』\n`;
        txt += `│ 📂 **𝒔𝒆𝒄𝒕𝒐𝒓𝒆𝒔 𝒅𝒆𝒕𝒆𝒄𝒕𝒂𝒅𝒐𝒔:** ${arrayGroups.length}\n`;
        txt += `│ ⚡ **𝒄𝒐𝒏𝒆𝒙𝒊𝒐́𝒏:** 𝒆𝒔𝒕𝒂𝒃𝒍𝒆\n`;
        txt += `└─────────────────────────\n\n`;

        txt += `┌──『 🏛️ **𝒍𝒊𝒔𝒕𝒂𝒅𝒐 𝒅𝒆 𝒔𝒆𝒄𝒕𝒐𝒓𝒆𝒔** 』\n`;
        
        arrayGroups.forEach((g, i) => {
            // Estructura de bloque por grupo
            txt += `│ [${i + 1}] ──> ${g.subject}\n`;
            txt += `│ 🆔 : ${g.id}\n`;
            txt += `│ 🛡️ ──────────────────────\n`;
        });

        txt += `└─────────────────────────\n\n`;
        txt += `🚀 **𝒔𝒚𝒔𝒕𝒆𝒎:** 𝒕𝒐𝒅𝒐𝒔 𝒍𝒐𝒔 𝒔𝒆𝒄𝒕𝒐𝒓𝒆𝒔 𝒃𝒂𝒋𝒐 𝒗𝒊𝒈𝒊𝒍𝒂𝒏𝒄𝒊𝒂.\n`;
        txt += `🏌🏽‍♂️ _𝒔𝒊𝒏𝒄𝒓𝒐𝒏𝒊𝒛𝒂𝒅𝒐 𝒄𝒐𝒏 𝒋𝒉𝒐𝒏 𝒔𝒚𝒔𝒕𝒆𝒎_`;

        await sock.sendMessage(from, { 
            text: txt,
            contextInfo: {
                externalAdReply: {
                    title: "🛰️ 𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒄𝒊𝒐́𝒏 𝒄𝒆𝒏𝒕𝒓𝒂𝒍 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕",
                    body: `𝒓𝒆𝒑𝒐𝒓𝒕𝒆: ${arrayGroups.length} 𝒔𝒆𝒄𝒕𝒐𝒓𝒆𝒔 𝒂𝒄𝒕𝒊𝒗𝒐𝒔 🚀`,
                    mediaType: 1,
                    showAdAttribution: true,
                    renderLargerThumbnail: false // Diseño limpio sin foto
                }
            }
        }, { quoted: msg });

        await sock.sendMessage(from, { react: { text: "🛰️", key: msg.key } });
    }
};
