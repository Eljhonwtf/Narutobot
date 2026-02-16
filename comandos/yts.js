const yts = require('yt-search');

module.exports = {
    name: 'yts',
    aliases: ['ytbuscar', 'ytsearch'],
    run: async (sock, msg, body, args) => {
        const from = msg.key.remoteJid;
        const text = args.join(" ");
        
        // Configuración de Identidad (Datos Guardados)
        const owner = "584142577312"; 
        const botImg = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

        if (!text) return sock.sendMessage(from, { text: '⚔️ *Escribe el nombre de la canción, Jefe.*' }, { quoted: msg });

        try {
            const search = await yts(text);
            const list = search.all.slice(0, 7); // 7 resultados para que no sea spam

            if (list.length === 0) return sock.sendMessage(from, { text: '❌ Sin registros en la base de datos.' }, { quoted: msg });

            // DISEÑO WARLORD SYSTEM
            let teks = `┏━━━━━━━━━━━━━━━━━━━━━━━━┓\n`;
            teks += `┃  🏮  **WARLORD YOUTUBE** 🏮  ┃\n`;
            teks += `┗━━━━━━━━━━━━━━━━━━━━━━━━┛\n\n`;
            teks += `  ◈ **OWNER:** +${owner}\n`;
            teks += `  ◈ **SEARCH:** ${text.toUpperCase()}\n`;
            teks += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

            list.forEach((v, i) => {
                if (v.type === 'video') {
                    teks += `┏──『 *0${i + 1}* 』──⟢\n`;
                    teks += `┃ 🎶 *TÍTULO:* ${v.title}\n`;
                    teks += `┃ 🕝 *TIEMPO:* ${v.timestamp}\n`;
                    teks += `┃ 📥 *AUDIO:* .play ${v.url}\n`;
                    teks += `┃ 🎥 *VIDEO:* .playvideo ${v.url}\n`;
                    teks += `┗━━━━━━━━━━━━━━━━━━━━━━━⟢\n\n`;
                }
            });

            teks += `  © **NarutoBot 2026** | **By Jhon** ✨`;

            // Envío con ContextInfo para que se vea profesional
            await sock.sendMessage(from, {
                image: { url: list[0].thumbnail || botImg },
                caption: teks,
                contextInfo: {
                    externalAdReply: {
                        title: 'SYSTEM SEARCH ACTIVE ⚡',
                        body: `Admin: +${owner}`,
                        mediaType: 1,
                        thumbnailUrl: botImg,
                        sourceUrl: `https://wa.me/${owner}`
                    }
                }
            }, { quoted: msg });

        } catch (e) {
            console.error(e);
            sock.sendMessage(from, { text: '⚠️ Fallo en la conexión del núcleo.' }, { quoted: msg });
        }
    }
};
