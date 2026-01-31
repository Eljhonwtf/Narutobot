const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'menu',
    description: 'Menú principal - Naruto Bot System',
    run: async (sock, msg, body, args, isOwner) => {
        try {
            const from = msg.key.remoteJid;
            const userName = msg.pushName || 'Shinobi';

            // Fuente curva elegante
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

            // Thumbnail Kyubi mode brutal (ojos rojos, aura naranja intensa)
            const thumbUrl = "https://i.postimg.cc/L80zmXVt/13171525-3713-4cd2-b376-44cfdae256a7-(1).jpg";

            const menuTxt = `
🦊 *${script("naruto bot")}* 🦊

Venezuela 🇻🇪  •  Multi Prefix  •  Online ✅
${totalComandos} Comandos cargados

¡Dattebayo, *${userName}*! 🍥

*CONTROL DE GRUPOS*

✦ \`† /admins\`
Menciona a los administradores

✦ `† /antilink\`
Activa/desactiva anti-enlaces

✦ \`† /kick\`
Expulsa usuario

✦ \`† /add\`
Agrega usuario al grupo

✦ \`† /promote\` | \`† /demote\`
Subir o bajar rango

✦ \`† /tagall\` | \`† /hidetag\`
Menciona a todos (visible/oculto)

✦ \`† /delete\`
Elimina mensaje citado

✦ \`† /resetlink\`
Resetea enlace del grupo

✦ \`† /link\`
Obtiene enlace actual

✦ \`† /setname\` | \`† /setdesc\`
Cambia nombre o descripción

✦ \`† /infogp\`
Información del grupo

✦ \`† /join\` | \`† /out\`
Bot entra o sale de grupo

*UTILIDADES & SISTEMA*

✦ \`† /ping\`  Velocidad del bot
✦ \`† /ia\`   Chat con IA
✦ \`† /info\`  Info del bot
✦ \`† /menu\`  Este menú
✦ \`† /listcm\` Comandos ocultos
✦ \`† /listgp\` Grupos del bot
✦ \`† /perfil\` Perfil usuario
✦ \`† /tr\`   Traductor
✦ \`† /update\` Actualizar bot
✦ \`† /fix\`   Reparar sesión
✦ \`† /ext\`   Extensiones

*ZONA MIX*

✦ \`† /ppt\`  Piedra, papel o tijera
✦ \`† /tiktok\` Descargar TikTok
✦ \`† /doxeo\` Bromas
✦ \`† /bug\`  Comandos de ataque
✦ \`† /bc\`  Broadcast global
✦ \`† /autodm\` Mensajes automáticos
✦ \`† /unreg\` Eliminar registro

_${script("narutobot system")} • Power by Jhon_ 🏴‍☠️`;

            await sock.sendMessage(from, {
                text: menuTxt,
                contextInfo: {
                    externalAdReply: {
                        title: "Naruto Bot System V1",
                        body: "Jhon Guerra 🏴‍☠️",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        sourceUrl: "https://github.com/jhonsystem"
                    }
                }
            }, { quoted: msg });

        } catch (error) {
            console.error("Error en menú:", error);
            await sock.sendMessage(from, { text: '❌ Error al cargar el menú.' }, { quoted: msg });
        }
    }
};