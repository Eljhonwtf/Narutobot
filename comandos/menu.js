const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'menu',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const pushName = msg.pushName || 'Usuario';
        
        // --- Stats Reales ---
        const contarComandos = (dir) => {
            let total = 0;
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
        
        // --- Tu Imagen ---
        const thumbUrl = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg"; 

        // --- INICIO DEL MENÚ ---
        let menuTxt = `*𝑨𝑫𝑴𝑰𝑵𝑰𝑺𝑻𝑹𝑨𝑪𝑰𝑶𝑵 𝑪𝑬𝑵𝑻𝑹𝑨𝑳*\n`;
        menuTxt += `_Narutobot System_ 🍥\n\n`;
        
        menuTxt += `Hola! Soy *Narutobot* 🍥\n`;
        menuTxt += `¡Bienvenido, *Jhon* 🏴‍☠️!\n\n`;

        // --- INFO SISTEMA (Con tachado en bordes y negrita en datos) ---
        menuTxt += `~╭━━━╼〔~ 📜 *𝑰𝑵𝑭𝑶 𝑺𝑰𝑺𝑻𝑬𝑴𝑨* ~〕╼━━━~\n`;
        menuTxt += `🍥\n`;
        menuTxt += `~┃~ ✎ *Pais:* Venezuela 🇻🇪\n`;
        menuTxt += `~┃~ ✎ *Prefijo:* Multi\n`;
        menuTxt += `~┃~ ✎ *Estado:* Activo ✅\n`;
        menuTxt += `~┃~ ✎ *Archivos:* ${totalComandos}\n`;
        menuTxt += `~╰━━━━━━━━━━━━━━━━━━━━━━━~\n\n`;

        // --- SECCIÓN 1: ADMIN ---
        menuTxt += `~│~ ✎ *𝑨𝑫𝑴𝑰𝑵𝑰𝑺𝑻𝑹𝑨𝑪𝑰𝑶𝑵 𝑫𝑬 𝑮𝑹𝑼𝑷𝑶𝑺*\n`;
        menuTxt += `~│~\n`;
        menuTxt += `⚔️ */admins*\n`;
        menuTxt += `~│~ _Menciona a los administradores._\n`;
        menuTxt += `⚔️ */antilink*\n`;
        menuTxt += `~│~ _Activa/Desactiva anti-enlaces._\n`;
        menuTxt += `⚔️ */kick*\n`;
        menuTxt += `~│~ _Expulsar usuario del grupo._\n`;
        menuTxt += `⚔️ */add*\n`;
        menuTxt += `~│~ _Añadir usuario al grupo._\n`;
        menuTxt += `⚔️ */promote*\n`;
        menuTxt += `~│~ _Dar rango de administrador._\n`;
        menuTxt += `⚔️ */demote*\n`;
        menuTxt += `~│~ _Quitar rango de administrador._\n`;
        menuTxt += `⚔️ */tagall*\n`;
        menuTxt += `~│~ _Menciona a todos los miembros._\n`;
        menuTxt += `⚔️ */hidetag*\n`;
        menuTxt += `~│~ _Mención oculta (sin etiqueta)._\n`;
        menuTxt += `⚔️ */delete*\n`;
        menuTxt += `~│~ _Elimina mensaje del bot/usuario._\n`;
        menuTxt += `⚔️ */resetlink*\n`;
        menuTxt += `~│~ _Restablece el enlace del grupo._\n`;
        menuTxt += `⚔️ */link*\n`;
        menuTxt += `~│~ _Obtener enlace del grupo._\n`;
        menuTxt += `⚔️ */setname*\n`;
        menuTxt += `~│~ _Cambiar nombre del grupo._\n`;
        menuTxt += `⚔️ */setdesc*\n`;
        menuTxt += `~│~ _Cambiar descripción del grupo._\n`;
        menuTxt += `⚔️ */infogp*\n`;
        menuTxt += `~│~ _Ver información del grupo._\n`;
        menuTxt += `⚔️ */join*\n`;
        menuTxt += `~│~ _Unir bot a un grupo._\n`;
        menuTxt += `⚔️ */out*\n`;
        menuTxt += `~│~ _Sacar bot del grupo._\n`;
        menuTxt += `~│~\n`;

        // --- SECCIÓN 2: UTILIDADES ---
        menuTxt += `» ~°9•(🛰️)• ÷~ *𝑼𝑻𝑰𝑳𝑰𝑫𝑨𝑫𝑬𝑺 & 𝑺𝒀𝑺𝑻𝑬𝑴* ~÷~\n`;
        menuTxt += `~│~\n`;
        menuTxt += `🛰️ */ping*\n`;
        menuTxt += `~│~ _Ver velocidad de respuesta._\n`;
        menuTxt += `🛰️ */ia*\n`;
        menuTxt += `~│~ _Inteligencia Artificial (Gemini)._\n`;
        menuTxt += `🛰️ */info*\n`;
        menuTxt += `~│~ _Información del creador/bot._\n`;
        menuTxt += `🛰️ */menu*\n`;
        menuTxt += `~│~ _Mostrar este panel._\n`;
        menuTxt += `🛰️ */listcm*\n`;
        menuTxt += `~│~ _Lista simple de comandos._\n`;
        menuTxt += `🛰️ */listgp*\n`;
        menuTxt += `~│~ _Lista de grupos donde estoy._\n`;
        menuTxt += `🛰️ */perfil*\n`;
        menuTxt += `~│~ _Ver tu perfil de usuario._\n`;
        menuTxt += `🛰️ */tr*\n`;
        menuTxt += `~│~ _Traductor de textos._\n`;
        menuTxt += `🛰️ */update*\n`;
        menuTxt += `~│~ _Actualizar sistema del bot._\n`;
        menuTxt += `🛰️ */fix*\n`;
        menuTxt += `~│~ _Corregir errores de base de datos._\n`;
        menuTxt += `🛰️ */ext*\n`;
        menuTxt += `~│~ _Gestionar extensiones/plugins._\n`;
        menuTxt += `~│~\n`;

        // --- SECCIÓN 3: DIVERSIÓN ---
        menuTxt += `» ~°9•(🎮)• ÷~ *𝒁𝑶𝑵𝑨 𝑴𝑰𝑿* ~÷~\n`;
        menuTxt += `~│~\n`;
        menuTxt += `🎮 */ppt*\n`;
        menuTxt += `~│~ _Piedra, Papel o Tijera._\n`;
        menuTxt += `🎮 */tiktok*\n`;
        menuTxt += `~│~ _Descargar video de TikTok._\n`;
        menuTxt += `🎮 */doxeo*\n`;
        menuTxt += `~│~ _Broma de doxeo falso._\n`;
        menuTxt += `🎮 */bug*\n`;
        menuTxt += `~│~ _Reportar un fallo al dueño._\n`;
        menuTxt += `🎮 */bc*\n`;
        menuTxt += `~│~ _Broadcast (Mensaje a todos)._\n`;
        menuTxt += `🎮 */autodm*\n`;
        menuTxt += `~│~ _Respuesta automática al privado._\n`;
        menuTxt += `🎮 */unreg*\n`;
        menuTxt += `~│~ _Eliminar tu registro._\n`;
        menuTxt += `~│~\n`;

        menuTxt += `🚀 *𝒔𝒚𝒔𝒕𝒆𝒎:* Escaneo completado.\n`;
        menuTxt += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

        await sock.sendMessage(from, { 
            image: { url: thumbUrl }, 
            caption: menuTxt,
            mentions: [msg.key.participant || from]
        }, { quoted: msg });
    }
};
