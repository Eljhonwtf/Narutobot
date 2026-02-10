const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'menu',
    alias: ['help', 'comandos'],
    category: 'util',
    run: async (sock, msg, body, args) => {
        const from = msg.key.remoteJid;
        const pushName = msg.pushName || "Usuario";

        // --- LÓGICA DE CONTEO ---
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
        
        // --- MULTIMEDIA ---
        const gifUrl = "https://media4.giphy.com/media/CchzkJJ6UrCw/giphy.mp4";

        // --- LISTA DE COMANDOS (Tus 32 comandos exactos) ---
        const listaComandos = [
            "IA", "admins", "antilink", "autodm", "bc", "bug", "delete", "demote",
            "doxeo", "ext", "fix", "info", "infogp", "join", "kick", "link",
            "listcm", "listgp", "menu", "out", "perfil", "ping", "ppt", "promote",
            "resetlink", "setdesc", "setname", "tagall", "tiktok", "tr", "unreg", "update"
        ];

        // --- CONSTRUCCIÓN DEL DISEÑO ---
        let menuTxt = `『 🚀 *𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎 𝒄𝒐𝒓𝒆* 🏌🏽‍♂️ 』\n\n`;

        // Sección Stats
        menuTxt += `┌──『 📊 *𝒔𝒕𝒂𝒕𝒔* 』\n`;
        menuTxt += `│ 📂 Total: ${totalComandos} archivos\n`; // Usa el conteo real del bot
        menuTxt += `│ ⚡ Estado: Online\n`;
        menuTxt += `└─────────────────────────\n\n`;

        // Sección Inventario (Generación automática de la lista)
        menuTxt += `┌──『 🛠️ *𝒊𝒏𝒗𝒆𝒏𝒕𝒂𝒓𝒊𝒐* 』\n`;
        listaComandos.forEach((cmd, index) => {
            menuTxt += `│ ${index + 1}. /${cmd}\n`;
        });
        menuTxt += `└─────────────────────────\n\n`;

        // Footer
        menuTxt += `🚀 *𝒔𝒚𝒔𝒕𝒆𝒎:* Escaneo completado.\n`;
        menuTxt += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_`;

        // --- ENVÍO DEL MENSAJE ---
        try {
            await sock.sendMessage(from, {
                video: { url: gifUrl },
                caption: menuTxt,
                gifPlayback: true,
                contextInfo: {
                    externalAdReply: {
                        title: "☄️ 𝐍𝐀𝐑𝐔𝐓𝐎𝐁𝐎𝐓 𝐒𝐘𝐒𝐓𝐄𝐌 ☄️",
                        body: "Obito - System Admin",
                        thumbnailUrl: "https://w0.peakpx.com/wallpaper/211/68/HD-wallpaper-naruto-kyuubi-mode-naruto-anime-artist-artwork-digital-art.jpg", 
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        sourceUrl: "https://github.com/Eljhonwtf/Narutobot"
                    },
                    mentionedJid: [msg.participant || from]
                }
            }, { quoted: msg });

        } catch (error) {
            console.log("❌ Error enviando video:", error);
            await sock.sendMessage(from, { text: menuTxt }, { quoted: msg });
        }
    }
};
