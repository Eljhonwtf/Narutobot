const fs = require('fs');

module.exports = {
    run: async (sock, msg, body, args) => {
        try {
            const from = msg.key.remoteJid;
            
            // 1. Leer la base de datos
            let db = {};
            if (fs.existsSync('./usuarios.json')) {
                db = JSON.parse(fs.readFileSync('./usuarios.json', 'utf-8'));
            }

            // 2. Verificar si existe
            if (!db[from]) {
                return await sock.sendMessage(from, { 
                    text: "❌ No estás registrado. ¿Cómo piensas borrar algo que no existe? 🤡" 
                }, { quoted: msg });
            }

            const nombreUsuario = db[from].nombre;

            // 3. Intentar obtener la foto de perfil del usuario
            let ppUrl;
            try {
                ppUrl = await sock.profilePictureUrl(from, 'image');
            } catch (e) {
                // Si no tiene foto o es privada, usamos la de Naruto
                ppUrl = 'https://i.postimg.cc/Bbd8Zhn0/1c2380631fcd4e45a2488437d9dc7520.jpg';
            }

            // 4. Eliminar de la base de datos
            delete db[from];
            fs.writeFileSync('./usuarios.json', JSON.stringify(db, null, 2));

            // 5. Reacción y envío de despedida con SU foto
            await sock.sendMessage(from, { react: { text: "👋", key: msg.key } });

            await sock.sendMessage(from, {
                image: { url: ppUrl },
                caption: `👋 *ADIÓS, NINJA DESERTOR*\n\n*${nombreUsuario}*, tus registros han sido eliminados de la base de datos de Jhon-Bot.\n\nSi te arrepientes, puedes volver con */reg*.`,
                footer: "† Jhon-Bot System †",
                contextInfo: {
                    externalAdReply: {
                        title: "SISTEMA DE BAJAS",
                        body: `Usuario eliminado: ${nombreUsuario}`,
                        thumbnailUrl: ppUrl,
                        mediaType: 1,
                        renderLargerThumbnail: false
                    }
                }
            }, { quoted: msg });

        } catch (err) {
            console.log("Error en unreg:", err);
            await sock.sendMessage(msg.key.remoteJid, { text: "⚠️ Error al procesar tu baja." });
        }
    }
};
