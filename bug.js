const fs = require('fs');
const path = require('path');

module.exports = {
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const report = args.join(" ");
        const filePath = path.join(__dirname, '../fallas.txt');

        // Si escribes solo "/bug", el bot muestra la lista de fallas (Solo para ti)
        if (!report) {
            if (!isOwner) return sock.sendMessage(from, { text: "❌ Describe el fallo. Ejemplo: */bug el comando play no descarga*" });
            
            if (!fs.existsSync(filePath)) return sock.sendMessage(from, { text: "✅ No hay fallas reportadas aún." });
            
            const lista = fs.readFileSync(filePath, 'utf-8');
            return sock.sendMessage(from, { text: `📝 *LISTA DE FALLAS REPORTADAS:*\n\n${lista}` });
        }

        // Guardar el reporte
        const fecha = new Date().toLocaleString();
        const nuevoReporte = `[${fecha}] Reportado por ${msg.key.participant || from}: ${report}\n`;
        
        fs.appendFileSync(filePath, nuevoReporte);

        await sock.sendMessage(from, { text: "✅ *Reporte enviado.* Jhon revisará este comando pronto. ¡Gracias!" });
        await sock.sendMessage(from, { react: { text: "📦", key: msg.key } });
    }
};
