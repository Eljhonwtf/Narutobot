const { exec } = require('child_process');

/**
 * Comando de Actualización y Reinicio Exclusivo
 * Propietario: 584142577312
 */
module.exports = async (conn, m, { command }) => {
    const ownerNumber = "584142577312"; 
    const updateImage = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";
    const senderNumber = m.sender.split('@')[0];

    // 1. Bloqueo de seguridad total
    if (senderNumber !== ownerNumber) {
        return m.reply("❌ Acceso denegado. Este comando es exclusivo para el dueño del bot.");
    }

    if (command === 'update') {
        try {
            await m.reply("🔄 **Iniciando Git Pull y Reinicio...**\nSincronizando archivos con el repositorio.");

            // 2. Ejecutar la actualización
            exec('git pull', async (err, stdout, stderr) => {
                if (err) {
                    return m.reply(`⚠️ **Error Git:**\n${err.message}`);
                }

                // 3. Enviar mensaje de éxito antes de apagar
                await conn.sendMessage(m.chat, { 
                    image: { url: updateImage }, 
                    caption: `✅ **Update Exitoso**\n\n` +
                             `**Log:** ${stdout || 'Sin cambios.'}\n` +
                             `**Owner:** +${ownerNumber}\n\n` +
                             `🚀 *El bot se reiniciará en 3 segundos para aplicar los cambios...*`
                }, { quoted: m });

                // 4. Reinicio forzado
                setTimeout(() => {
                    process.exit(); // Esto cierra el proceso; si usas PM2 o sh, se reinicia solo.
                }, 3000);
            });

        } catch (error) {
            console.error(error);
            m.reply("⚠️ Error crítico al actualizar.");
        }
    }
};
