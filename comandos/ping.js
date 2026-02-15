module.exports = {
    name: 'ping',
    description: 'Reporte de latencia instantánea',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        
        // Marca de tiempo para latencia
        const inicio = Date.now();
        
        // Datos de sistema
        const tiempoActivo = process.uptime();
        const horas = Math.floor(tiempoActivo / 3600);
        const minutos = Math.floor((tiempoActivo % 3600) / 60);
        const ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

        // Reacción inmediata de procesando
        await sock.sendMessage(from, { react: { text: "⚡", key: msg.key } });

        // Diseño de Reporte de Combate (Texto)
        let report = `   ⚔️ *WARLORD SYSTEM STATUS* ⚔️\n`;
        report += `   ─────────────────────────\n\n`;
        report += `   🚀 *LATENCIA:* ${Date.now() - inicio} _ms_\n`;
        report += `   📟 *RAM:* ${ram} _MB_\n`;
        report += `   ⏳ *UPTIME:* ${horas}h ${minutos}m\n`;
        report += `   👤 *RANGO:* ${isOwner ? 'SUPREMO (BOSS)' : 'USUARIO'}\n`;
        report += `   📡 *ESTADO:* NÚCLEO ESTABLE\n\n`;
        report += `   ─────────────────────────\n`;
        report += `   © *WARLORD-DOMINATION* | 2026`;

        // Envío directo del texto
        await sock.sendMessage(from, { 
            text: report 
        }, { quoted: msg });
    }
};
