const fs = require('fs');

module.exports = {
    run: async (sock, msg, body, args) => {
        try {
            const from = msg.key.remoteJid;
            const input = args.join(" ");

            // 1. Reacción de inicio
            await sock.sendMessage(from, { react: { text: "📝", key: msg.key } });

            let db = {};
            if (fs.existsSync('./usuarios.json')) {
                try {
                    db = JSON.parse(fs.readFileSync('./usuarios.json'));
                } catch (e) { db = {}; }
            }

            // 2. BLOQUEO SI YA EXISTE (Con frases chistosas)
            if (db[from]) {
                await sock.sendMessage(from, { react: { text: "🤡", key: msg.key } });
                const frases = [
                    `¿Pero tú eres tonto? Ya te llamas *${db[from].nombre}*. 🤡`,
                    "¡Epa! Ya estás en la aldea. ¿Te dio amnesia ninja? 🧠❌",
                    "No puedes registrarte dos veces. ¡A usar el bot! 😴"
                ];
                const randomFrase = frases[Math.floor(Math.random() * frases.length)];
                return await sock.sendMessage(from, { text: randomFrase }, { quoted: msg });
            }

            // 3. Validar Formato
            if (!input || !input.includes('|')) {
                return await sock.sendMessage(from, { 
                    text: "🏮 *¡ALTO AHÍ!* 🏮\n\nUsa: */reg Nombre|País*\nEjemplo: */reg Jhon|Venezuela*" 
                }, { quoted: msg });
            }

            const [nombre, pais] = input.split('|').map(item => item.trim());

            // 4. OBTENER FOTO DE PERFIL DEL USUARIO
            let ppUrl;
            try {
                ppUrl = await sock.profilePictureUrl(from, 'image');
            } catch (e) {
                // Si no tiene foto, usamos la de Naruto de respaldo
                ppUrl = 'https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg';
            }

            // 5. Guardar datos
            db[from] = {
                nombre: nombre,
                pais: pais,
                fecha_reg: new Date().toLocaleDateString('es-ES'),
                id: from.split('@')[0]
            };
            fs.writeFileSync('./usuarios.json', JSON.stringify(db, null, 2));

            // 6. MENSAJE DE BIENVENIDA CON SU FOTO
            let mensajeExito = `✨ *¡NUEVO NINJA REGISTRADO!* ✨\n\n`;
            mensajeExito += `👤 *Nombre:* ${nombre}\n`;
            mensajeExito += `🌎 *País:* ${pais}\n`;
            mensajeExito += `📆 *Fecha:* ${db[from].fecha_reg}\n\n`;
            mensajeExito += `¡Bienvenido a la aldea! Ya puedes usar */menu*`;

            await sock.sendMessage(from, { 
                image: { url: ppUrl }, // AQUÍ MANDA LA FOTO DEL USUARIO
                caption: mensajeExito,
                footer: "† Jhon-Bot System †",
                contextInfo: {
                    externalAdReply: {
                        title: "BIENVENIDO A LA ALDEA",
                        body: `Ninja: ${nombre}`,
                        thumbnailUrl: ppUrl, // También en la miniatura de arriba
                        mediaType: 1,
                        renderLargerThumbnail: false
                    }
                }
            }, { quoted: msg });

            await sock.sendMessage(from, { react: { text: "✅", key: msg.key } });

        } catch (e) {
            console.log("Error en reg:", e);
            await sock.sendMessage(from, { text: "⚠️ Error en el pergamino de registro." });
        }
    }
};
