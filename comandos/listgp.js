module.exports = {
    name: 'listgroups',
    description: 'Lista de todos los grupos donde está el bot',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        // 1. REACCIÓN DE INICIO
        await sock.sendMessage(from, { react: { text: "📝", key: msg.key } });

        // Solo el dueño puede ver esta lista por seguridad
        if (!isOwner) return;

        try {
            const groups = await sock.groupFetchAllParticipating();
            const arrayGroups = Object.values(groups);
            
            // --- DISEÑO HÍBRIDO (Títulos pro / Texto normal) ---
            let txt = `『 🚀 **𝒍𝒊𝒔𝒕𝒂 𝒅𝒆 𝒈𝒓𝒖𝒑𝒐𝒔** 🏌🏽‍♂️ 』\n\n`;
            
            txt += `┌──『 📊 **𝒓𝒆𝒔𝒖𝒎𝒆𝒏** 』\n`;
            txt += `│ 📂 Grupos totales: ${arrayGroups.length}\n`;
            txt += `│ ⚡ Estado: Conectado\n`;
            txt += `└─────────────────────────\n\n`;

            txt += `┌──『 📝 **𝒈𝒓𝒖𝒑𝒐𝒔 𝒂𝒄𝒕𝒊𝒗𝒐𝒔** 』\n`;
            
            arrayGroups.forEach((g, i) => {
                txt += `│ [${i + 1}] ──> ${g.subject}\n`;
                txt += `│ ID: ${g.id}\n`;
                if (i < arrayGroups.length - 1) {
                    txt += `│ ──────────────────────\n`;
                }
            });

            txt += `└─────────────────────────\n\n`;
            txt += `🚀 **𝒃𝒐𝒕:** Lista generada correctamente.\n`;
            txt += `🏌🏽‍♂️ _𝒃𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕_`;

            // 2. ENVÍO SEGURO (Sin adornos raros para que no falle)
            await sock.sendMessage(from, { text: txt }, { quoted: msg });

        } catch (e) {
            console.error(e);
            await sock.sendMessage(from, { 
                text: `『 ❌ **𝒆𝒓𝒓𝒐𝒓** 』\n\nNo pude sacar la lista de grupos. Revisa la consola.` 
            }, { quoted: msg });
        }
    }
};
