const os = require('os');

module.exports = {
    name: 'info',
    description: '𝒎𝒐𝒏𝒊𝒕𝒐𝒓𝒆𝒐 𝒕𝒆́𝒄𝒏𝒊𝒄𝒐 𝒅𝒆𝒍 𝒔𝒆𝒓𝒗𝒊𝒅𝒐𝒓',
    async run(sock, msg, body, args, isOwner) {
        const from = msg.key.remoteJid;

        // --- SISTEMA DE SEGURIDAD BIOMÉTRICA ---
        if (!isOwner) {
            await sock.sendMessage(from, { react: { text: "🚫", key: msg.key } });
            return await sock.sendMessage(from, { 
                text: `『 🚀 **𝒂𝒄𝒄𝒆𝒔𝒐 𝒅𝒆𝒏𝒆𝒈𝒂𝒅𝒐** 🏌🏽‍♂️ 』\n\n𝒔𝒐𝒍𝒐 𝒆𝒍 𝒋𝒆𝒇𝒆 𝒋𝒉𝒐𝒏 𝒕𝒊𝒆𝒏𝒆 𝒂𝒖𝒕𝒐𝒓𝒊𝒛𝒂𝒄𝒊𝒐́𝒏 𝒑𝒂𝒓𝒂 𝒗𝒆𝒓 𝒍𝒂 𝒕𝒆𝒍𝒆𝒎𝒆𝒕𝒓𝒊́𝒂 𝒅𝒆𝒍 𝒔𝒆𝒓𝒗𝒊𝒅𝒐𝒓. 🔒` 
            }, { quoted: msg });
        }

        // --- CÁLCULOS DE RENDIMIENTO ---
        const uptime = process.uptime();
        const hrs = Math.floor(uptime / 3600);
        const mins = Math.floor((uptime % 3600) / 60);
        const secs = Math.floor(uptime % 60);

        const usedMem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);

        // --- DISEÑO DE DASHBOARD VIRTUAL ---
        let infoMsg = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒕𝒂𝒕𝒖𝒔 𝒄𝒆𝒏𝒕𝒆𝒓** 🏌🏽‍♂️ 』\n\n`;
        
        infoMsg += `┌──『 💻 **𝒉𝒐𝒔𝒕 𝒊𝒏𝒇𝒐𝒓𝒎𝒂𝒕𝒊𝒐𝒏** 』\n`;
        infoMsg += `│ 👤 **𝒐𝒘𝒏𝒆𝒓:** 584142577312\n`;
        infoMsg += `│ 🛰️ **𝒑𝒍𝒂𝒕𝒂𝒇𝒐𝒓𝒎:** 𝒕𝒆𝒓𝒎𝒖𝒙 (𝒂𝒏𝒅𝒓𝒐𝒊𝒅)\n`;
        infoMsg += `│ ⚡ **𝒆𝒔𝒕𝒂𝒅𝒐:** 𝒐𝒑𝒆𝒓𝒂𝒕𝒊𝒗𝒐\n`;
        infoMsg += `└─────────────────────────\n\n`;

        infoMsg += `┌──『 📊 **𝒓𝒆𝒔𝒐𝒖𝒓𝒄𝒆 𝒖𝒔𝒂𝒈𝒆** 』\n`;
        infoMsg += `│ 🧠 **𝒖𝒔𝒐 𝒅𝒆 𝒓𝒂𝒎:** ${usedMem} 𝒎𝒃\n`;
        infoMsg += `│ 💾 **𝒕𝒐𝒕𝒂𝒍 𝒎𝒆𝒎𝒐𝒓𝒚:** ${totalMem} 𝒈𝒃\n`;
        infoMsg += `│ ⏳ **𝒖𝒑𝒕𝒊𝒎𝒆:** ${hrs}𝒉 ${mins}𝒎 ${secs}𝒔\n`;
        infoMsg += `└─────────────────────────\n\n`;

        infoMsg += `『 🚀 **𝒏𝒐𝒕𝒆:** 𝒆𝒍 𝒃𝒐𝒕 𝒆𝒔𝒕𝒂́ 𝒐𝒑𝒆𝒓𝒂𝒏𝒅𝒐 𝒂 𝒎𝒂́𝒙𝒊𝒎𝒂 𝒄𝒂𝒑𝒂𝒄𝒊𝒅𝒂𝒅. 🏌🏽‍♂️ 』\n`;
        infoMsg += `_𝒔𝒚𝒔𝒕𝒆𝒎 𝒃𝒚 𝒋𝒉𝒐𝒏 𝒔𝒚𝒔𝒕𝒆𝒎_`;

        await sock.sendMessage(from, { 
            text: infoMsg,
            contextInfo: {
                externalAdReply: {
                    title: "🛰️ 𝒕𝒆𝒍𝒆𝒎𝒆𝒕𝒓𝒊́𝒂 𝒅𝒆𝒍 𝒔𝒊𝒔𝒕𝒆𝒎𝒂 𝒂𝒄𝒕𝒊𝒗𝒂",
                    body: "𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒗2.0 - 2026 🚀",
                    thumbnailUrl: "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg",
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
        }, { quoted: msg });

        await sock.sendMessage(from, { react: { text: "📊", key: msg.key } });
    }
};
