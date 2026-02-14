const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'listcm',
    description: 'Inventario de comandos',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        // 1. REACCIÓN DE CONFIRMACIÓN
        await sock.sendMessage(from, { react: { text: "🛰️", key: msg.key } });

        // Solo el Owner puede ver el inventario real de archivos
        if (!isOwner) return;

        try {
            const folderPath = path.join(__dirname, '../comandos'); // Ruta más segura

            if (!fs.existsSync(folderPath)) {
                return await sock.sendMessage(from, { text: "❌ Error: Carpeta 'comandos' no encontrada." }, { quoted: msg });
            }

            // Función para leer archivos incluso en subcarpetas
            const getFiles = (dir, files_ = []) => {
                const files = fs.readdirSync(dir);
                for (const i in files) {
                    const name = path.join(dir, files[i]);
                    if (fs.statSync(name).isDirectory()) {
                        getFiles(name, files_);
                    } else if (name.endsWith('.js')) {
                        files_.push(files[i]);
                    }
                }
                return files_;
            };

            const allFiles = getFiles(folderPath);

            // 2. CONSTRUCCIÓN DEL MENSAJE (Diseño Narutobot)
            let txt = `『 🚀 **𝑵𝑨𝑹𝑼𝑻𝑶𝑩𝑶𝑻 𝑺𝒀𝑺𝑻𝑬𝑴** 🏌🏽‍♂️ 』\n\n`;

            txt += `┌──『 📊 **𝑺𝑻𝑨𝑻𝑺** 』\n`;
            txt += `│ 📂 Total: ${allFiles.length} Jutsus\n`;
            txt += `│ ⚡ Estado: Operativo\n`;
            txt += `└─────────────────────────\n\n`;

            txt += `┌──『 🛠️ **𝑰𝑵𝑽𝑬𝑵𝑻𝑨𝑹𝑰𝑶** 』\n`;

            allFiles.forEach((file, i) => {
                txt += `│ ${i + 1}. #${file.replace('.js', '')}\n`;
            });

            txt += `└─────────────────────────\n\n`;
            txt += `> 🚀 **System:** Escaneo de archivos completado.\n`;
            txt += `> 🏌🏽‍♂️ _Hecho con amor por Jhon ✨_`;

            // 3. ENVÍO CON EL RECUADRO DE CRÉDITOS (SourceInfo)
            await sock.sendMessage(from, { 
                text: txt,
                contextInfo: {
                    externalAdReply: {
                        title: 'Narutobot System Core',
                        body: 'Inventario de Archivos Local',
                        mediaType: 1,
                        thumbnailUrl: 'https://files.catbox.moe/xr2m6u.jpg', 
                        sourceUrl: 'https://github.com/JhonGuerra'
                    }
                }
            }, { quoted: msg });

        } catch (e) {
            console.log(e);
            await sock.sendMessage(from, { text: "❌ Error interno al escanear: " + e.message }, { quoted: msg });
        }
    }
};
