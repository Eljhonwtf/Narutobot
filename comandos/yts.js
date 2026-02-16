const yts = require('yt-search');

module.exports = {
  name: 'yts',
  run: async (sock, msg, body, args) => {
    const from = msg.key.remoteJid;
    const text = args.join(" ");
    const ownerNumber = "584142577312";
    const defaultImg = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

    if (!text) return sock.sendMessage(from, { text: '🔍 ¿Qué canción buscamos?' });

    try {
        const results = await yts(text);
        const videos = results.all.slice(0, 10);

        // Formato de lista interactiva
        const sections = [{
            title: "🎵 RESULTADOS DE MÚSICA",
            rows: videos.map((v, i) => ({
                title: v.title,
                rowId: `.play ${v.url}`, // AQUÍ: Llama al comando .play de arriba
                description: `[${v.timestamp}] - Toca para descargar`
            }))
        }];

        await sock.sendMessage(from, {
            text: `✨ *Buscador de ${ownerNumber}*\nSelecciona una canción de la lista para enviártela automáticamente.`,
            buttonText: "Click aquí para elegir ☁️",
            sections,
            footer: "Sistema de Audio Automático",
            contextInfo: {
                externalAdReply: {
                    title: 'YouTube Music Player',
                    mediaType: 1,
                    thumbnailUrl: defaultImg,
                    sourceUrl: "https://wa.me/584142577312"
                }
            }
        }, { quoted: msg });

    } catch (e) {
        sock.sendMessage(from, { text: '❌ Error en la búsqueda.' });
    }
  }
};
