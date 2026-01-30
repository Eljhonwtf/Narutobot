const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'menu',
    description: 'Menú principal - NarutoBot System',
    run: async (sock, msg, body, args, isOwner) => {
        try {
            const from = msg.key.remoteJid;
            const userName = msg.pushName || 'Usuario';

            // Función para fuente curva (mathematical bold script)
            const script = (t) => t.toLowerCase().split('').map(c => ({
                'a':'𝒶','b':'𝒷','c':'𝒸','d':'𝒹','e':'𝑒','f':'𝒻','g':'𝑔','h':'𝒽','i':'𝒾','j':'𝒿',
                'k':'𝓀','l':'𝓁','m':'𝓂','n':'𝓃','o':'𝑜','p':'𝓅','q':'𝓆','r':'𝓇','s':'𝓈','t':'𝓉',
                'u':'𝓊','v':'𝓋','w':'𝓌','x':'𝓍','y':'𝓎','z':'𝓏'
            }[c] || c)).join('');

            // Conteo recursivo de comandos (.js) en la carpeta ../comandos
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

            // Thumbnail (puedes cambiar a uno Sasuke/Rinnegan más oscuro)
            const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";
            // Alternativas Sasuke: 
            // "https://wallpapers.com/images/hd/sharingan-live-uchiha-sasuke-purple-aesthetic-ogrq0pcqhxbvc4ax.jpg"
            // "https://wallpapers.com/images/hd/old-sasuke-v58x9vubu5sk63bp.jpg"

            // Menú completo (minimalista, elegante y compacto)
            const menuTxt = `
*${script("RINNEGAN")}*

Venezuela 🇻🇪
Multi Prefix
Online
${totalComandos} Comandos

Hola, *${userName}* 🍥
Bienvenido al sistema

*${script("POWER")}*

✦ /admins  ✦ /antilink  ✦ /kick
✦ /add   ✦ /promote  ✦ /demote
✦ /tagall  ✦ /hidetag  ✦ /delete
✦ /resetlink ✦ /link   ✦ /setname
✦ /setdesc  ✦ /infogp  ✦ /join  ✦ /out

*UTILIDADES & SYSTEM*

✦ /ping  ✦ /ia   ✦ /info
✦ /menu  ✦ /listcm ✦ /listgp
✦ /perfil ✦ /tr   ✦ /update
✦ /fix  ✦ /ext

*ZONA MIX*

✦ /ppt  ✦ /tiktok ✦ /doxeo
✦ /bug  ✦ /bc   ✦ /autodm
✦ /unreg

Sistema escaneado ✓
_${script("narutobot system")}_ 🍥`;

            // Envío con thumbnail grande y link
            await sock.sendMessage(from, {
                text: menuTxt,
                contextInfo: {
                    externalAdReply: {
                        title: "𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝑺𝒚𝒔𝒕𝒆𝒎 𝑽1",
                        body: "𝑱𝒉𝒐𝒏 𝑮𝒖𝒆𝒓𝒓𝒂 🏴‍☠️",
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        sourceUrl: "https://github.com/jhonsystem"
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