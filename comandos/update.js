// Verificación de Propietario y Ejecución de Actualización
const ownerNumber = "584142577312";
const updateImage = "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg";

if (sender.number !== ownerNumber) {
    return reply("❌ Acceso denegado. Este comando es exclusivo para el dueño del bot.");
}

// Lógica de Actualización
reply("🔄 Iniciando proceso de actualización del sistema...");
await system.fetchLatestUpdates(); 

// Respuesta de Éxito con Créditos e Imagen
sendMedia(updateImage, {
    caption: `✅ **Update Finalizado con Éxito**\n\n` +
             `El bot ha sido actualizado a la versión más reciente.\n\n` +
             `**Créditos:** Configuración personalizada para +${ownerNumber}`
});
