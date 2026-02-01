const fs = require('fs');
const path = require('path');

module.exports = {
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        // 1. BLOQUEO CHISTOSO PARA LOS "CURIOSOS"
        if (!isOwner) {
            await sock.sendMessage(from, { react: { text: "🤡", key: msg.key } });
            
            const frases = [
                "¿Pero tú eres tonto o intentas inflar un globo con la oreja? Solo Jhon accede a la data. 🤡",
                "¡Epa! 🚨 ¿Buscando información confidencial? A dormir, que esto es de Jhon.",
                "Error 404: Autorización no encontrada. ¡Vete a jugar con tierra! 🧠❌",
                "¿Quieres mi base de datos? Primero nace de nuevo y llámate Jhon. 😴",
                "Tocar aquí es como tocar un cable de alta tensión... ¡Zas! No eres el dueño. ⚡🚫"
            ];
            const randomFrase = frases[Math.floor(Math.random() * frases.length)];
            
            return await sock.sendMessage(from, { text: randomFrase }, { quoted: msg });
        }

        // 2. LÓGICA PARA EL JEFE
        const dbPath = path.join(__dirname, '../usuarios.json');

        if (!fs.existsSync(dbPath)) {
            return await sock.sendMessage(from, { text: "❌ Jefe, el archivo usuarios.json aún no existe." });
        }

        await sock.sendMessage(from, { react: { text: "📂", key: msg.key } });

        await sock.sendMessage(from, { 
            document: fs.readFileSync(dbPath), 
            mimetype: 'application/json', 
            fileName: 'usuarios_backup.json',
            caption: "✅ Aquí tiene la base de datos de usuarios, Jefe Jhon."
        }, { quoted: msg });
    }
};
