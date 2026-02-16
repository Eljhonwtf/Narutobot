const yts = require('yt-search');
const ytdl = require('@distube/ytdl-core'); // Usamos la librería corregida
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'play',
    alias: ['reproducir', 'p', 'music'],
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        if (!args.length) {
            return sock.sendMessage(from, { 
                text: '❌ *ERROR:* Escribe el nombre de la canción.\n> Ejemplo: .play Naruto Blue Bird' 
            }, { quoted: msg });
        }

        try {
            // 1. BUSCAR VIDEO
            const query = args.join(' ');
            const search = await yts(query);
            const video = search.all[0];

            if (!video) {
                return sock.sendMessage(from, { text: '⚠️ No encontré esa canción.' }, { quoted: msg });
            }

            // 2. FICHA TÉCNICA
            const infoMsg = `
┏━━━━〔 🎵 *NARUTO MUSIC* 〕━━━━┓
┃
┃ 🏷️ *TÍTULO:* ${video.title}
┃ ⏱️ *TIEMPO:* ${video.timestamp}
┃ 📅 *FECHA:* ${video.ago}
┃ 👤 *AUTOR:* ${video.author.name}
┃ 🔗 *URL:* ${video.url}
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
> _⏳ Descargando audio... espera un momento._`;

            // Enviar imagen con info
            await sock.sendMessage(from, { 
                image: { url: video.thumbnail }, 
                caption: infoMsg 
            }, { quoted: msg });

            // 3. DESCARGAR AUDIO
            const nombreArchivo = `temp_${Date.now()}.mp3`;
            const rutaArchivo = path.join(__dirname, `../${nombreArchivo}`);

            // Usamos cookies vacías o generamos un agente simple para evitar bloqueos
            const stream = ytdl(video.url, { 
                quality: 'highestaudio',
                filter: 'audioonly'
            });

            const fileStream = fs.createWriteStream(rutaArchivo);
            
            stream.pipe(fileStream);

            fileStream.on('finish', async () => {
                // 4. ENVIAR ARCHIVO
                await sock.sendMessage(from, { 
                    audio: { url: rutaArchivo }, 
                    mimetype: 'audio/mp4', 
                    ptt: false, 
                    fileName: `${video.title}.mp3`
                }, { quoted: msg });

                // 5. LIMPIEZA
                fs.unlinkSync(rutaArchivo);
            });

            fileStream.on('error', (err) => {
                console.error(err);
                sock.sendMessage(from, { text: '❌ Error al guardar el archivo.' }, { quoted: msg });
            });

        } catch (e) {
            console.error("Error en Play:", e);
            await sock.sendMessage(from, { text: `❌ *FALLO:* YouTube rechazó la conexión. Intenta de nuevo.` }, { quoted: msg });
        }
    }
};
