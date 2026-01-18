const os = require('os');

module.exports = {
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const nombre = msg.pushName || "Usuario";

        // Calculamos el tiempo de actividad del servidor
        const uptime = process.uptime();
        const horas = Math.floor(uptime / 3600);
        const minutos = Math.floor((uptime % 3600) / 60);
        const segundos = Math.floor(uptime % 60);

        // Información de la RAM
        const ramTotal = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        const ramLibre = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);

        let statusTexto = `✨ *𝐄𝐒𝐓𝐀𝐃𝐎 𝐃𝐄𝐋 𝐁𝐎𝐓* ✨\n\n`;
        statusTexto += `👤 *Hola:* ${nombre}\n`;
        statusTexto += `⏳ *Uptime:* ${horas}h ${minutos}m ${segundos}s\n`;
        statusTexto += `📡 *Plataforma:* ${os.platform()} ${os.arch()}\n`;
        statusTexto += `🔋 *RAM:* ${ramTotal - ramLibre}GB / ${ramTotal}GB\n`;
        statusTexto += `⭐ *Prefijo:* [  /  ]\n\n`;

        if (isOwner) {
            statusTexto += `👑 *MODO DUEÑO:* Activo ✅\n`;
            statusTexto += `🛠️ *Servidor:* Estable\n`;
            statusTexto += `💻 *Node.js:* ${process.version}\n`;
        } else {
            statusTexto += `🔰 *Rango:* Usuario Estándar\n`;
        }

        statusTexto += `\n_Desarrollado por Jhon_ 👨‍💻`;

        await sock.sendMessage(from, { 
            text: statusTexto,
            contextInfo: {
                externalAdReply: {
                    title: "JHON-BOT SYSTEM INFO",
                    body: "Estado actual del servidor",
                    renderLargerThumbnail: false,
                    thumbnailUrl: "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg", // Tu imagen de Naruto
                    mediaType: 1
                }
            }
        }, { quoted: msg });
    }
};
