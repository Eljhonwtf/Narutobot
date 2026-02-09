const fs = require('fs');
const path = require('path');

module.exports = {
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        // 1. BLOQUEO CHISTOSO PARA LOS "SAPEADORES"
        if (!isOwner) {
            await sock.sendMessage(from, { react: { text: "🤡", key: msg.key } });
            
            const frases = [
                "¿Pero tú eres tonto o muerdes el agua? Mis secretos solo los ve Jhon. 🤡",
                "¡Cuidado! 🚨 Intentaste entrar a la base de datos de comandos. ¡A dormir!",
                "Error 404: Permisos de Jhon no encontrados. ¡No seas curioso! 🧠❌",
                "¿Quieres ver mis tripas? Solo el Jefe tiene el bisturí. 😂",
                "¡Alerta! Un civil intentando hackear la aldea. 🥷🚫"
            ];
            const randomFrase = frases[Math.floor(Math.random() * frases.length)];
            
            return await sock.sendMessage(from, { text: randomFrase }, { quoted: msg });
        }

        // 2. LÓGICA PARA EL DUEÑO
        try {
            const dirPath = path.join(__dirname); // Carpeta de comandos
            const archivos = fs.readdirSync(dirPath).filter(file => file.endsWith('.js'));
            
            await sock.sendMessage(from, { react: { text: "📂", key: msg.key } });

            let lista = `📂 *LISTA COMPLETA DE COMANDOS*\n\n`;
            lista += `🚀 *Total Instalados:* ${archivos.length}\n`;
            lista += `───────────────────────\n`;

            archivos.forEach((file, index) => {
                // Quitamos el .js para que se vea más limpio
                const nombreCmd = file.replace('.js', '');
                lista += `  ${index + 1}. † /${nombreCmd}\n`;
            });

            lista += `───────────────────────\n`;
            lista += `_Sincronizado con Jhon-Bot System_`;

            await sock.sendMessage(from, { 
                text: lista,
                contextInfo: {
                    externalAdReply: {
                        title: "SISTEMA DE ARCHIVOS",
                        body: `Archivos: ${archivos.length} detectados`,
                        thumbnailUrl: "https://i.postimg.cc/Bbd8Zhn0/1c2380631fcd4e45a2488437d9dc7520.jpg",
                        mediaType: 1,
                        renderLargerThumbnail: false
                    }
                }
            }, { quoted: msg });

        } catch (err) {
            console.log("Error en listcmd:", err);
            await sock.sendMessage(from, { text: "❌ Error al leer la carpeta de comandos." });
        }
    }
};
