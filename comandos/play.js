const yts = require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'play',
    alias: ['reproducir', 'p', 'music'],
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        
        // 1. Validar que haya texto para buscar
        if (!args.length) {
            return sock.sendMessage(from, { 
                text: '❌ *ERROR:* Debes escribir el nombre de la canción.\n\nEjemplo:\n> .play Naruto Blue Bird' 
            }, { quoted: msg });
        }

        try {
            // 2. Buscar en YouTube
            const query = args.join(' ');
            const search = await yts(query);
            const video = search.all[0]; // Tomamos el primer resultado

            if (!video) {
                return sock.sendMessage(from, { text: '⚠️ No encontré ninguna canción con ese nombre.' }, { quoted: msg });
            }

            // 3. Enviar ficha técnica (Info de la canción)
            const fichaTecnica = `
┏━━━━〔 🎵 *NARUTO PLAYER* 〕━━━━┓
┃
┃ 🏷️ *TÍTULO:* ${video.title}
┃ ⏱️ *DURACIÓN:* ${video.timestamp}
┃ 📅 *SUBIDO:* ${video.ago}
┃ 👁️ *VISTAS:* ${video.views}
┃ 👤 *AUTOR:* ${video.author.name}
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
> _📥 Descargando chakra de audio..._`;

            // Enviamos la imagen del video con la info
            await sock.sendMessage(from, { 
                image: { url: video.thumbnail }, 
                caption: fichaTecnica 
            }, { quoted: msg });

            // 4. Descargar el Audio
            const nombreArchivo = `temp_${Date.now()}.mp3`;
            const rutaArchivo = path.join(__dirname, `../${nombreArchivo}`);
            
            const stream = ytdl(video.url, { quality: 'highestaudio' });
            
            stream.pipe(fs.createWriteStream(rutaArchivo))
                .on('finish', async () => {
                    // 5. Enviar el archivo de audio
                    await sock.sendMessage(from, { 
                        audio: { url: rutaArchivo }, 
                        mimetype: 'audio/mp4', 
                        ptt: false, // Pon 'true' si quieres que se envíe como nota de voz
                        fileName: `${video.title}.mp3`
                    }, { quoted: msg });

                    // 6. Limpiar (Borrar archivo temporal)
                    fs.unlinkSync(rutaArchivo);
                })
                .on('error', (err) => {
                    console.error('Error al descargar:', err);
                    sock.sendMessage(from, { text: '❌ Ocurrió un error interno al procesar el audio.' }, { quoted: msg });
                });

        } catch (e) {
            console.error(e);
            await sock.sendMessage(from, { text: `❌ *FALLO CRÍTICO:* ${e.message}` }, { quoted: msg });
        }
    }
};
