module.exports = {
    name: 'join',
    description: 'Une al bot a un grupo mediante un enlace',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

        try {
            // 1. Validación de Seguridad: Solo el dueño (584142577312) puede usarlo
            if (!isOwner) {
                return await sock.sendMessage(from, { 
                    text: "❌ *ACCESO DENEGADO*\n\nSolo el dueño del sistema tiene autorización para desplegar el bot en nuevos sectores." 
                }, { quoted: msg });
            }

            // 2. Verificar si se proporcionó un enlace
            const link = args[0];
            if (!link || !link.includes('chat.whatsapp.com/')) {
                return await sock.sendMessage(from, { 
                    text: "⚠️ *ERROR DE PARÁMETROS*\n\nDebes proporcionar un enlace de invitación válido.\n\nEjemplo: */join https://chat.whatsapp.com/XXXXX*" 
                }, { quoted: msg });
            }

            // 3. Extraer el código del enlace y unirse
            const code = link.split('https://chat.whatsapp.com/')[1];
            const response = await sock.groupAcceptInvite(code);

            // 4. Confirmación visual
            await sock.sendMessage(from, { 
                text: `✅ *INFILTRACIÓN EXITOSA*\n\nEl bot se ha unido al grupo solicitado.\n\n*ID:* ${response}\n\n_Sincronizado con Jhon-Bot System_`,
                contextInfo: {
                    externalAdReply: {
                        title: "ADMINISTRACIÓN CENTRAL",
                        body: "Despliegue de unidad completado 🚀",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: msg });

            await sock.sendMessage(from, { react: { text: "✅", key: msg.key } });

        } catch (e) {
            console.error(e);
            await sock.sendMessage(from, { 
                text: "❌ *FALLO EN LA OPERACIÓN*\n\nNo pude unirme al grupo. El enlace puede estar vencido o el bot fue expulsado previamente." 
            }, { quoted: msg });
        }
    }
};
