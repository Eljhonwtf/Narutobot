const axios = require('axios');

module.exports = {
    name: 'ia',
    alias: ['bot', 'narutoia', 'preguntar'],
    category: 'fun',
    run: async (sock, msg, body, args) => {
        const from = msg.key.remoteJid;
        const text = args.join(" ");

        if (!text) return sock.sendMessage(from, { text: `✨ *𝐇𝐎𝐋𝐀, 𝐒𝐎𝐘 𝐍𝐀𝐑𝐔𝐓𝐎-𝐈𝐀*\n\n> Hazme una pregunta para ayudarte.\n\n*Ejemplo:* \n.ia ¿Cómo ser un gran ninja?` }, { quoted: msg });

        // Mensaje de espera con estilo
        await sock.sendMessage(from, { text: `⏳ *𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 está pensando...*` }, { quoted: msg });

        try {
            // Llamada a la API de Luminai
            const response = await axios.post('https://Luminai.my.id', {
                content: text,
                user: msg.pushName || 'Usuario'
            });

            const res = response.data.result;

            const mensajeIA = `✨ *𝐈𝐍𝐓𝐄𝐋𝐈𝐆𝐄𝐍𝐂𝐈𝐀 𝐍𝐀𝐑𝐔𝐓𝐎𝐁𝐎𝐓* ✨\n\n` +
                `${res}\n\n` +
                `┏━━━━〔 👤 *𝐂𝐎𝐍𝐒𝐔𝐋𝐓𝐀* 〕━━━━┓\n` +
                `💻 *Usuario:* ${msg.pushName}\n` +
                `⚙️ *Motor:* Luminai-System\n` +
                `┗━━━━━━━━━━━━━━━━━━━━┛`;

            await sock.sendMessage(from, { text: mensajeIA }, { quoted: msg });

        } catch (err) {
            console.error(err);
            await sock.sendMessage(from, { text: `❌ *𝐄𝐑𝐑𝐎𝐑 𝐃𝐄 𝐂𝐎𝐍𝐄𝐗𝐈𝐎́𝐍*\n\nLo siento, mi chakra está bajo en este momento. Inténtalo más tarde.` });
        }
    }
};
