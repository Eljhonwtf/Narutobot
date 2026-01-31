const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'menu',
    description: 'Menú principal - NarutoBot System',
    run: async (sock, msg, body, args, isOwner) => {
        try {
            const from = msg.key.remoteJid;
            const userName = msg.pushName || 'Usuario';

            // Fuente elegante curva
            const script = (t) => t.toLowerCase().split('').map(c => ({
                'a':'𝒶','b':'𝒷','c':'𝒸','d':'𝒹','e':'𝑒','f':'𝒻','g':'𝑔','h':'𝒽','i':'𝒾','j':'𝒿',
                'k':'𝓀','l':'𝓁','m':'𝓂','n':'𝓃','o':'𝑜','p':'𝓅','q':'𝓆','r':'𝓇','s':'𝓈','t':'𝓉',
                'u':'𝓊','v':'𝓋','w':'𝓌','x':'𝓍','y':'𝓎','z':'𝓏'
            }[c] || c)).join('');

            // Conteo de comandos
            const contarComandos = (dir) => {
                let total = 0;
                if (!fs.existsSync(dir)) return 0;
                const archivos = fs.readdirSync(dir);
                for (const archivo of archivos) {
                    const ruta = path.join(dir, archivo);
                    if (fs.statSync(ruta).isDirectory()) {
                        total += contarComandos(ruta);
                    } else if (archivo.endsWith('.js')) {
                        total++;
                    }
                }
                return total;
            };

            const totalComandos = contarComandos(path.join(__dirname, '../comandos'));
            const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

            // CONSTRUCCIÓN DEL MENÚ
            let menuTxt = `*${script("RINNEGAN")}*\n\n`;
            menuTxt += `Pais: 𝑽𝒆𝒏𝒆𝒛𝒖𝒆𝒍𝒂 🇻🇪\n`;
            menuTxt += `Prefijo: 𝑴𝒖𝒍𝒕𝒊 𝒑𝒓𝒆𝒇𝒊𝒋𝒐\n`;
            menuTxt += `Status: 𝑶𝒏𝒍𝒊𝒏𝒆\n`;
            menuTxt += `${totalComandos} Comandos\n\n`;
            menuTxt += `𝑯𝒐𝒍𝒂, *${userName}* Bienvenido al sistema\n\n`;

            // SECCIÓN: ADMINISTRACIÓN
            menuTxt += `*${script("ADMINISTRACION")}*\n\n`;
            
            menuTxt += `✧ ⚔︎ † \` \` \` /admins \` \` \` \n`;
            menuTxt += `│ _Menciona a los administradores._\n\n`;

            menuTxt += `✧ ⚔︎ † \` \` \` /antilink \` \` \` \n`;
            menuTxt += `│ _Activa/Desactiva el anti-enlaces._\n\n`;

            menuTxt += `✧ ⚔︎ † \` \` \` /kick \` \` \` \n`;
            menuTxt += `│ _Expulsa a un usuario del grupo._\n\n`;

            menuTxt += `✧ ⚔︎ † \` \` \` /promote \` \` \` \n`;
            menuTxt += `│ _Sube el rango de un usuario._\n\n`;

            menuTxt += `✧ ⚔︎ † \` \` \` /demote \` \` \` \n`;
            menuTxt += `│ _Baja el rango de un usuario._\n\n`;

            menuTxt += `✧ ⚔︎ † \` \` \` /tagall \` \` \` \n`;
            menuTxt += `│ _Menciona a todos los miembros._\n\n`;

            // SECCIÓN: UTILIDADES
            menuTxt += `*${script("UTILIDADES")}*\n\n`;

            menuTxt += `✧ 🛰︎ † \` \` \` /ping \` \` \` \n`;
            menuTxt += `│ _Muestra la velocidad del bot._\n\n`;

            menuTxt += `✧ 🛰︎ † \` \` \` /ia \` \` \` \n`;
            menuTxt += `│ _Consultar con la IA Gemini._\n\n`;

            menuTxt += `Sistema escaneado ✓\n`;
            menuTxt += `_${script("narutobot system")}_ 🍥`;

            // Envío del mensaje
            await sock.sendMessage(from, {
                // El .replace elimina los espacios que usamos para que el código no se rompa aquí
                text: menuTxt.replace(/` ` `/g, '```'), 
                contextInfo: {
                    externalAdReply: {
                        title: "𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝑺𝒚𝒔𝒕𝒆𝒎 𝑽1",
                        body: "𝑱𝒉𝒐𝒏 𝑮𝒖𝒆𝒓𝒓𝒂 🏴‍☠️",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        sourceUrl: "[https://github.com/jhonsystem](https://github.com/jhonsystem)"
                    },
                    mentionedJid: [msg.key.participant || from]
                }
            }, { quoted: msg });

        } catch (error) {
            console.log("Error en comando menu:", error);
            await sock.sendMessage(from, { text: '❌ Error al cargar el menú.' }, { quoted: msg });
        }
    }
};
