module.exports = {
    run: async (sock, msg, body, args) => {
        const from = msg.key.remoteJid;
        let target = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.key.participant || from;
        let user = target.split('@')[0];

        // Reacción de calavera para meter presión
        await sock.sendMessage(from, { react: { text: "💀", key: msg.key } });

        // --- ARRAYS DE DATOS DE "ALTO PELIGRO" ---
        const random = (l) => l[Math.floor(Math.random() * l.length)];

        const ips = ["186.14.25.102", "190.202.13.44", "45.230.192.1", "161.22.1.99", "200.12.55.120"];
        const wifi = ["CANTV-WiFi-7231", "Inter-Fibra-Giga", "Netuno_Vip", "WiFi_Del_Gobierno", "iPhone_de_la_Victima"];
        const casas = ["Casa de platabanda (sin frisar)", "Edificio con vigilancia burlada", "Quinta de lujo (objetivo marcado)", "Apartamento con puerta de madera debil"];
        const deudas = ["$1,500 en el Banco", "3 meses de renta", "Le debe al del abasto", "$500 en la Dark Web", "Prestamo gota a gota (Peligro)"];
        const historial = ["Cómo borrar antecedentes", "Contratar sicario barato", "Venta de organos precio", "Fotos de la vecina", "Pack de Naruto"];
        const delitos = ["Hurto de señal WiFi", "Amnesia ninja", "Exceso de fealdad", "Intento de hackeo al Bot de Jhon", "Venta de chucherias vencidas"];
        const niveles = ["🔴 CRÍTICO", "🟠 ALTO", "🟡 MEDIO", "🔥 INMINENTE"];
        const sangre = ["A+", "O- (Raro/Valioso)", "B+", "AB-"];
        const bancos = ["Banesco (Vacio)", "Mercantil", "Venezuela (Bloqueado)", "Zelle (Sin fondos)", "Binance"];

        // Generar coordenadas
        const lat = (Math.random() * (10.51 - 10.45) + 10.45).toFixed(6);
        const lon = (Math.random() * (-66.95 - -66.85) - 66.85).toFixed(6);

        // --- CONSTRUCCIÓN DEL MENSAJE ÉPICO ---
        let dox = `⚠️ *ALERTA DE SEGURIDAD NACIONAL* ⚠️\n`;
        dox += `🔓 *SISTEMA VULNERADO POR JHON-BOT*\n`;
        dox += `───────────────────────\n\n`;
        dox += `👤 *OBJETIVO:* @${user}\n`;
        dox += `☣️ *NIVEL DE PELIGRO:* ${random(niveles)}\n`;
        dox += `💉 *TIPO DE SANGRE:* ${random(sangre)}\n\n`;
        
        dox += `📂 *DATOS FILTRADOS:*\n`;
        dox += `📍 *COORDENADAS:* ${lat}, ${lon}\n`;
        dox += `🏠 *VIVIENDA:* ${random(casas)}\n`;
        dox += `🌐 *IP PÚBLICA:* ${random(ips)}\n`;
        dox += `📡 *RED:* ${random(wifi)}\n`;
        dox += `📱 *DISPOSITIVO:* ${Math.random() > 0.5 ? 'Android (Vulnerable)' : 'iOS (Rastreado)'}\n\n`;
        
        dox += `💰 *FINANZAS:*\n`;
        dox += `🏦 *BANCO:* ${random(bancos)}\n`;
        dox += `📉 *DEUDA:* ${random(deudas)}\n\n`;
        
        dox += `⚖️ *REGISTRO CRIMINAL:*\n`;
        dox += `📝 *DELITO:* ${random(delitos)}\n`;
        dox += `🕵️ *ÚLTIMA BUSQUEDA:* "${random(historial)}"\n`;
        
        dox += `\n───────────────────────\n`;
        dox += `🛰️ *ESTADO:* POSICIÓN MARCADA PARA EXTRACCIÓN.\n`;
        dox += `🦾 _Jhon-Bot System - Control Total_`;

        await sock.sendMessage(from, { 
            text: dox, 
            mentions: [target],
            contextInfo: {
                externalAdReply: {
                    title: "☢️ OPERACIÓN: DARK WEB ☢️",
                    body: "Subiendo archivos a la Deep Web...",
                    thumbnailUrl: "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: msg });
    }
};
