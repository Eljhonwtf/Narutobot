
const fs = require('fs');

module.exports = {
    name: 'menu',
    description: 'Menú Naruto Bot VIP - Modo Bestia',
    run: async (sock, msg, body, args, isOwner) => {
        try {
            const from = msg.key.remoteJid;
            // Thumbnail agresivo y masculino (Naruto modo Kyubi/bestia, oscuro y potente)
            const thumbUrl = "https://i.postimg.cc/3JwzB1jY/naruto-kyubi-aggressive.jpg"; 
            // Si quieres otro, aquí alternativas fuertes:
            // "https://i.postimg.cc/Z5rK1vYk/naruto-sasuke-fight.jpg"
            // "https://i.postimg.cc/9QdP9dYj/naruto-dark-mode.jpg"

            // Función para letra curva (mantenida)
            const script = (t) => t.toLowerCase().split('').map(c => ({
                'a':'𝒶','b':'𝒷','c':'𝒸','d':'𝒹','e':'𝑒','f':'𝒻','g':'𝑔','h':'𝒽','i':'𝒾','j':'𝒿',
                'k':'𝓀','l':'𝓁','m':'𝓂','n':'𝓃','o':'𝑜','p':'𝒫','q':'𝓆','r':'𝓇','s':'𝓈','t':'𝓉',
                'u':'𝓊','v':'𝓋','w':'𝓌','x':'𝓍','y':'𝓎','z':'𝓏'
            }[c] || c)).join('');

            const menu = `
💀🔥 *${script("NARUTO BOT")}* 🔥💀
*DOMINIO TOTAL ACTIVADO*

🇻🇪 VENEZUELA • PREFIX MULTI • ACTIVO ✅

▬▬▬⚔️ COMANDOS ⚔️▬▬▬

🩸 *${script("CONTROL DE GRUPOS")}*
† /admins • Menciona admins
† /antilink • Anti-enlaces ON/OFF
† /ban • Banear usuario
† /kick • Expulsar
† /promote | /demote • Subir/bajar rango
† /tagall | /hidetag • Mencionar todos
† /delete • Borrar mensaje
† /resetlink • Reset enlace
† /join | /out • Entrar/salir grupo

🔥 *${script("HERRAMIENTAS")}*
† /ping • Velocidad
† /info | /infogp • Info bot/grupo
† /link • Enlace grupo
† /listgp • Lista grupos
† /setname | /setinfo • Cambiar datos
† /autodm • Mensajes auto
† /bc • Broadcast

💀 *${script("DESTRUCCIÓN")}*
† /sticker • Convertir sticker
† /doxeo | /bug • Ataques/bromas
† /insultar • Insulto random
† /ppt • Piedra/papel/tijera
† /tr • Traducir

🖤 *${script("ZONA VIP")}*
† /perfil | /reg • Registro/gestión
† /unreg | /user • Eliminar/ver user
† /top • Ranking
† /fix • Reparar sesión
† /listcm • Comandos ocultos
† /menu • Este menú

▬▬▬💀 *${script("NARUTO BOT SYSTEM")}* 💀▬▬▬`;

            await sock.sendMessage(from, { 
                text: menu,
                contextInfo: {
                    externalAdReply: {
                        title: "⚔️ MODO BESTIA ACTIVADO ⚔️",
                        body: "Power by Jhon", 
                        thumbnailUrl: thumbUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        sourceUrl: "https://wa.me/584142577312"
                    }
                }
            }, { quoted: msg });

            await sock.sendMessage(from, { react: { text: "💀", key: msg.key } });

        } catch (e) {
            console.log("Error en menú:", e);
            await sock.sendMessage(from, { text: '❌ Error crítico.' }, { quoted: msg });
        }
    }
};
