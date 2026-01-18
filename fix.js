const fs = require('fs');
const path = require('path');

module.exports = {
    run: async (sock, msg, body, args, isOwner) => {
        if (!isOwner) return; // Solo tú puedes limpiar la lista

        const filePath = path.join(__dirname, '../fallas.txt');
        
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Borra el archivo
            await sock.sendMessage(msg.key.remoteJid, { text: "🗑️ Lista de fallas eliminada. ¡Todo limpio, jefe!" });
        } else {
            await sock.sendMessage(msg.key.remoteJid, { text: "No hay nada que limpiar." });
        }
    }
};
