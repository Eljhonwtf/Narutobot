module.exports = {
    name: 'ping',
    description: '𝒗𝒆𝒓𝒊𝒇𝒊𝒄𝒂𝒄𝒊𝒐́𝒏 𝒄𝒐𝒏 𝒂𝒏𝒊𝒎𝒂𝒄𝒊𝒐́𝒏 𝒅𝒆 𝒄𝒂𝒓𝒈𝒂',
    run: async (sock, msg, body, args) => {
        const from = msg.key.remoteJid;
        const start = Date.now();

        // 1. REACCIÓN INICIAL
        await sock.sendMessage(from, { react: { text: "⏳", key: msg.key } });

        // 2. ENVIAR MENSAJE DE CARGA
        const { key } = await sock.sendMessage(from, { 
            text: `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎** 』\n\n> 📥 **𝒆𝒏𝒗𝒊𝒂𝒏𝒅𝒐 𝒑𝒂𝒒𝒖𝒆𝒕𝒆𝒔 𝒅𝒆 𝒅𝒂𝒕𝒐𝒔...** g 🏌🏽‍♂️` 
        }, { quoted: msg });

        // 3. ANIMACIÓN DE ESPERA (2 SEGUNDOS)
        await new Promise(resolve => setTimeout(resolve, 2000));

        const end = Date.now();
        const latencia = end - start;

        // 4. DISEÑO FINAL (MENSAJE EDITADO)
        let pingMsg = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒏𝒆𝒕𝒘𝒐𝒓𝒌 𝒔𝒕𝒂𝒕𝒖𝒔** 🏌🏽‍♂️ 』\n\n`;
        pingMsg += `┌──『 🛰️ **𝒑𝒐𝒏𝒈! 𝒔𝒚𝒔𝒕𝒆𝒎 𝒐𝒏𝒍𝒊𝒏𝒆** 』\n`;
        pingMsg += `│ ⏳ **𝒍𝒂𝒕𝒆𝒏𝒄𝒊𝒂:** ${latencia} 𝒎𝒔\n`;
        pingMsg += `│ ⚡ **𝒆𝒔𝒕𝒂𝒅𝒐:** 𝒐𝒑𝒆𝒓𝒂𝒕𝒊𝒗𝒐\n`;
        pingMsg += `│ 📡 **𝒏𝒖́𝒄𝒍𝒆𝒐:** 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒗3\n`;
        pingMsg += `└─────────────────────────\n\n`;
        pingMsg += `🚀 **𝒔𝒚𝒔𝒕𝒆𝒎:** 𝒂𝒏𝒂́𝒍𝒊𝒔𝒊𝒔 𝒄𝒐𝒎𝒑𝒍𝒆𝒕𝒂𝒅𝒐 𝒄𝒐𝒏 𝒆́𝒙𝒊𝒕𝒐.\n`;
        pingMsg += `🏌🏽‍♂️ _𝒔𝒊𝒏𝒄𝒓𝒐𝒏𝒊𝒛𝒂𝒅𝒐 𝒄𝒐𝒏 𝒋𝒉𝒐𝒏 𝒔𝒚𝒔𝒕𝒆𝒎_`;

        // EDITAR EL MENSAJE ANTERIOR
        await sock.sendMessage(from, { 
            text: pingMsg, 
            edit: key 
        });

        // REACCIÓN FINAL
        await sock.sendMessage(from, { react: { text: "⚡", key: msg.key } });
    }
};
