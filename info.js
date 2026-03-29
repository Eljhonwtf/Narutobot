const os = require('os');

module.exports = {
    name: 'info',
    description: 'Muestra el estado del sistema y del bot',
    async run(sock, msg, body, args, isOwner) {
        const from = msg.key.remoteJid;

        // --- VALIDACIÓN DE DUEÑO ---
        if (!isOwner) {
            return await sock.sendMessage(from, { 
                text: "❌ *Acceso Denegado*\n_Solo Jhon🏴‍☠️ puede ver las estadísticas del servidor._" 
            }, { quoted: msg });
        }

        // Calculando tiempo de actividad
        const uptime = process.uptime();
        const hrs = Math.floor(uptime / 3600);
        const mins = Math.floor((uptime % 3600) / 60);
        const secs = Math.floor(uptime % 60);

        // Uso de memoria
        const usedMem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);

        const texto = `🌜 *ESTADO DEL SISTEMA*\n\n` +
                      `• *Dueño:* 584142577312\n` +
                      `• *Uso de RAM:* ${usedMem} MB\n` +
                      `• *Memoria Total:* ${totalMem} GB\n` +
                      `• *Activo hace:* ${hrs}h ${mins}m ${secs}s\n` +
                      `• *Plataforma:* Termux (Android)\n\n` +
                      `_El bot está operando con normalidad._`;

        await sock.sendMessage(from, { text: texto }, { quoted: msg });
    }
};
