// Comando .update (Solo para el Propietario)
case 'update': {
    const ownerNumber = "584142577312"; // Tu número registrado
    const updateImage = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

    // Verificación de seguridad
    const senderNumber = m.sender.split('@')[0];
    if (senderNumber !== ownerNumber) {
        return m.reply("❌ Acceso denegado. Este comando solo puede ser ejecutado por el Propietario.");
    }

    // Función asíncrona para evitar el error de la consola
    const runUpdate = async () => {
        try {
            await m.reply("🔄 **Iniciando actualización del sistema...**\nPor favor, espera un momento.");
            
            // Aquí va la lógica de actualización (ej. git pull)
            // await exec("git pull"); 

            await conn.sendMessage(m.chat, { 
                image: { url: updateImage }, 
                caption: `✅ **Actualización Exitosa**\n\nEl sistema se ha actualizado correctamente.\n\n**Owner:** +${ownerNumber}\n**Créditos:** Sistema de Gestión Exclusivo` 
            }, { quoted: m });
            
        } catch (e) {
            console.log(e);
            m.reply("⚠️ Error durante la actualización.");
        }
    };

    runUpdate();
    break;
}
