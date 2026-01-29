const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'bug',
    description: '𝒓𝒆𝒑𝒐𝒓𝒕𝒆 𝒅𝒆 𝒇𝒂𝒍𝒍𝒂𝒔 𝒅𝒆𝒍 𝒔𝒊𝒔𝒕𝒆𝒎𝒂',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const report = args.join(" ");
        const filePath = path.join(__dirname, '../fallas.txt');

        // 1. LÓGICA DE VISUALIZACIÓN (SOLO PARA EL DUEÑO)
        if (!report) {
            if (!isOwner) return sock.sendMessage(from, { 
                text: "❌ 𝒅𝒆𝒔𝒄𝒓𝒊𝒃𝒆 𝒆𝒍 𝒇𝒂𝒍𝒍𝒐. 𝒆𝒋𝒆𝒎𝒑𝒍𝒐: */𝒃𝒖𝒈 𝒆𝒍 𝒄𝒐𝒎𝒂𝒏𝒅𝒐 𝒑𝒍𝒂𝒚 𝒏𝒐 𝒅𝒆𝒔𝒄𝒂𝒓𝒈𝒂* 🚀" 
            });
            
            if (!fs.existsSync(filePath)) return sock.sendMessage(from, { 
                text: "✅ 𝒏𝒐 𝒉𝒂𝒚 𝒇𝒂𝒍𝒍𝒂𝒔 𝒓𝒆𝒑𝒐𝒓𝒕𝒂𝒅𝒂𝒔 𝒂𝒖́𝒏. 🏌🏽‍♂️" 
            });
            
            const lista = fs.readFileSync(filePath, 'utf-8');
            // Convertimos la lista guardada al estilo de fuente para mostrarla
            return sock.sendMessage(from, { 
                text: `📝 *𝒍𝒊𝒔𝒕𝒂 𝒅𝒆 𝒇𝒂𝒍𝒍𝒂𝒔 𝒓𝒆𝒑𝒐𝒓𝒕𝒂𝒅𝒂𝒔:*\n\n${lista}` 
            });
        }

        // 2. GUARDADO DE REPORTES CON ESTILO
        const fecha = new Date().toLocaleString();
        const user = msg.key.participant || from;
        const nuevoReporte = `🔹 [${fecha}] 𝒖𝒔𝒖𝒂𝒓𝒊𝒐: ${user}\n📝 𝒇𝒂𝒍𝒍𝒂: ${report}\n----------------------------\n`;
        
        fs.appendFileSync(filePath, nuevoReporte);

        await sock.sendMessage(from, { 
            text: "✅ *𝒓𝒆𝒑𝒐𝒓𝒕𝒆 𝒆𝒏𝒗𝒊𝒂𝒅𝒐.* 𝒆𝒍 𝒋𝒆𝒇𝒆 𝒓𝒆𝒗𝒊𝒔𝒂𝒓𝒂́ 𝒆𝒔𝒕𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐 𝒑𝒓𝒐𝒏𝒕𝒐. ¡𝒈𝒓𝒂𝒄𝒊𝒂𝒔! 🏌🏽‍♂️🚀" 
        });
        
        await sock.sendMessage(from, { react: { text: "🚀", key: msg.key } });
    }
};
