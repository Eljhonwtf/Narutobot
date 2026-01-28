const { execSync } = require('child_process');
const path = require('path');

module.exports = {
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        
        // ✅ Solo el owner puede usar este comando
        if (!isOwner) {
            await sock.sendMessage(from, { 
                text: "❌ Solo el owner puede usar este comando." 
            });
            return;
        }

        try {
            await sock.sendMessage(from, { 
                text: "⏳ Actualizando el bot... espera un momento..." 
            });

            // Ejecutar git pull
            const resultado = execSync('git pull', { 
                cwd: path.join(__dirname, '..'),
                encoding: 'utf-8'
            });

            await sock.sendMessage(from, { 
                text: `✅ *Bot actualizado con éxito*\n\n${resultado || 'Los archivos están al día'}` 
            });

            console.log('✅ Bot actualizado por:', msg.pushName);
        } catch (err) {
            await sock.sendMessage(from, { 
                text: `❌ Error al actualizar:\n\n${err.message}` 
            });
            console.log('❌ Error en comando update:', err);
        }
    }
};