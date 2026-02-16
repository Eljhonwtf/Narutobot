const ytdl = require('ytdl-core');
const fs = require('fs');

module.exports = {
  name: 'play',
  run: async (sock, msg, body, args) => {
    const from = msg.key.remoteJid;
    const url = args[0];
    if (!url) return;

    try {
        await sock.sendMessage(from, { text: '📥 *Descargando audio...*' }, { quoted: msg });
        
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
        const fileName = `./${title}.mp3`;

        // Descarga el audio
        const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' })
            .pipe(fs.createWriteStream(fileName));

        stream.on('finish', async () => {
            await sock.sendMessage(from, { 
                audio: { url: fileName }, 
                mimetype: 'audio/mp4',
                fileName: `${title}.mp3`
            }, { quoted: msg });
            
            fs.unlinkSync(fileName); // Borra el archivo después de enviar
        });
    } catch (e) {
        console.log(e);
        sock.sendMessage(from, { text: '❌ Error al descargar el audio.' });
    }
  }
};
