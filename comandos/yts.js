const yts = require('yt-search');

module.exports = {
  name: 'yts', // Nombre principal
  aliases: ['ytbuscar', 'ytsearch'], // Otros nombres que activan el comando
  run: async (sock, msg, body, args, isOwner) => {
    const from = msg.key.remoteJid;
    const text = args.join(" ");

    // 1. Validar que el usuario escribió algo
    if (!text) {
        return sock.sendMessage(from, { 
            text: '✨ *Por favor, ingresa una búsqueda para YouTube.*' 
        }, { quoted: msg });
    }

    // 2. Enviar mensaje de espera
    await sock.sendMessage(from, { text: '⏳ *Buscando en YouTube...*' }, { quoted: msg });

    try {
        // 3. Realizar la búsqueda
        const results = await yts(text);
        const video = results.all[0]; // Tomamos el primer resultado para la miniatura

        if (!video) return sock.sendMessage(from, { text: '❌ No encontré resultados.' }, { quoted: msg });

        // 4. Formatear el texto (Estilo Obito)
        let teks = `「✦」Resultados para: *${text}*\n\n`;
        
        // Mapeamos los primeros 5 resultados para no saturar el chat
        const list = results.all.slice(0, 5).map(v => {
            if (v.type === 'video') {
                return `> ☁️ *Título:* ${v.title}\n> 🍬 *Canal:* ${v.author.name}\n> 🕝 *Duración:* ${v.timestamp}\n> 📆 *Subido:* ${v.ago}\n> 👀 *Vistas:* ${v.views}\n> 🔗 *Link:* ${v.url}`;
            }
        }).filter(v => v).join('\n\n••••••••••••••••••••••••••••••••••••\n\n');

        teks += list;

        // 5. Créditos (SourceInfo)
        const contextInfo = {
            externalAdReply: {
                title: 'YouTube Search System',
                body: 'Hecho con amor por Jhon ✨',
                mediaType: 1,
                thumbnailUrl: video.thumbnail, 
                sourceUrl: video.url
            }
        };

        // 6. Enviar resultado con la miniatura del primer video
        await sock.sendMessage(from, { 
            image: { url: video.thumbnail }, 
            caption: teks,
            contextInfo
        }, { quoted: msg });

    } catch (e) {
        console.log(e);
        await sock.sendMessage(from, { text: '❌ Ocurrió un error en la búsqueda.' }, { quoted: msg });
    }
  }
};
