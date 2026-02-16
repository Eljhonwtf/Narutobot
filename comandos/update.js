const { exec } = require('child_process');

module.exports = {
    name: 'update',
    aliases: ['actualizar'],
    run: async (sock, msg, body, args) => {
        const from = msg.key.remoteJid;
        const sender = msg.sender.split('@')[0];
        
        // Configuración Personalizada
        const mainOwner = "584142577312"; //
        const updateImage = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg"; //
        
        // LISTA BLANCA: Agrega aquí futuros números de confianza
        const allowedOwners = [mainOwner, 'OTRO_NUMERO']; 

        // Bloqueo de seguridad
        if (!allowedOwners.includes(sender)) {
            return sock.sendMessage(from, { text: '❌ *Solo el dueño (+584142577312) puede usar este comando.*' }); //
        }

        await sock.sendMessage(from, { text: '🔄 *Sincronizando con GitHub y reiniciando núcleo...*' });

        exec('git pull', async (err, stdout) => {
            if (err) return sock.sendMessage(from, { text: `⚠️ Error: ${err.message}` });

            await sock.sendMessage(from, {
                image: { url: updateImage }, //
                caption: `✅ **ACTUALIZACIÓN COMPLETADA**\n\n> **Log:** ${stdout}\n> **Owner:** +${sender}\n\n🚀 *Reiniciando automáticamente gracias al script start.sh...*`,
                contextInfo: { externalAdReply: { title: 'NARUTO SYSTEM UPDATE', body: 'By Jhon ✨', mediaType: 1, thumbnailUrl: updateImage }} //
            }, { quoted: msg });

            // El bot se apaga, y el start.sh lo vuelve a prender al segundo
            setTimeout(() => { process.exit(); }, 3000);
        });
    }
};
