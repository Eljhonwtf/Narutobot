const gtts = require('gtts');
const fs = require('fs');
const { join } = require('path');

module.exports = {
    name: 'voz',
    description: '𝒔𝒊𝒏𝒕𝒆𝒕𝒊𝒛𝒂𝒄𝒊𝒐́𝒏 𝒅𝒆 𝒗𝒐𝒛 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒑𝒓𝒆𝒎𝒊𝒖𝒎',
    run: async (sock, msg, body, args) => {
        const from = msg.key.remoteJid;
        const text = args.join(" ");

        // 1. VALIDACIÓN DE ENTRADA
        if (!text) {
            return await sock.sendMessage(from, { 
                text: `『 ⚠️ **𝒆𝒓𝒓𝒐𝒓 𝒅𝒆 𝒔𝒊𝒔𝒕𝒆𝒎𝒂** 🚀 』\n\n𝒅𝒆𝒃𝒆𝒔 𝒊𝒏𝒈𝒓𝒆𝒔𝒂𝒓 𝒖𝒏 𝒕𝒆𝒙𝒕𝒐 𝒑𝒂𝒓𝒂 𝒍𝒂 𝒔𝒊𝒏𝒕𝒆𝒕𝒊𝒛𝒂𝒄𝒊𝒐́𝒏.\n\n🏌🏽‍♂️ **𝒆𝒋𝒆𝒎𝒑𝒍𝒐:**\n*/𝒗𝒐𝒛 𝒉𝒐𝒍𝒂, 𝒔𝒐𝒚 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕*` 
            }, { quoted: msg });
        }

        try {
            // 2. REACCIÓN Y ANIMACIÓN DE CARGA
            await sock.sendMessage(from, { react: { text: "⏳", key: msg.key } });
            
            const { key } = await sock.sendMessage(from, { 
                text: `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎** 』\n\n> 🎙️ **𝒈𝒆𝒏𝒆𝒓𝒂𝒏𝒅𝒐 𝒇𝒓𝒆𝒄𝒖𝒆𝒏𝒄𝒊𝒂 𝒅𝒆 𝒗𝒐𝒛...** 🏌🏽‍♂️` 
            }, { quoted: msg });

            // 3. PROCESAMIENTO TÉCNICO
            const speech = new gtts(text, 'es');
            const filePath = join(__dirname, `../temp_audio_${Date.now()}.mp3`);

            // Simulación de carga de 2 segundos para el toque "Bestia"
            await new Promise(resolve => setTimeout(resolve, 2000));

            speech.save(filePath, async (err) => {
                if (err) throw err;

                // 4. ACTUALIZAR ESTADO A ÉXITO
                await sock.sendMessage(from, { 
                    text: `『 ✅ **𝒔𝒊𝒏𝒕𝒆𝒕𝒊𝒛𝒂𝒄𝒊𝒐́𝒏 𝒄𝒐𝒎𝒑𝒍𝒆𝒕𝒂𝒅𝒂** 🚀 』\n\n> 🔊 **𝒆𝒏𝒗𝒊𝒂𝒏𝒅𝒐 𝒏𝒐𝒕𝒂 𝒅𝒆 𝒗𝒐𝒛...** 🏌🏽‍♂️`, 
                    edit: key 
                });

                // 5. ENVIAR AUDIO Y LIMPIAR
                await sock.sendMessage(from, { 
                    audio: { url: filePath }, 
                    mimetype: 'audio/mp4', 
                    ptt: true 
                }, { quoted: msg });

                fs.unlinkSync(filePath);
                await sock.sendMessage(from, { react: { text: "🔊", key: msg.key } });
            });

        } catch (e) {
            console.log("Error en comando voz:", e);
            await sock.sendMessage(from, { 
                text: `『 ❌ **𝒄𝒓𝒊𝒕𝒊𝒄𝒂𝒍 𝒆𝒓𝒓𝒐𝒓** 🚀 』\n\n𝒇𝒂𝒍𝒍𝒐 𝒆𝒏 𝒍𝒐𝒔 𝒄𝒐𝒏𝒕𝒓𝒐𝒍𝒂𝒅𝒐𝒓𝒆𝒔 𝒅𝒆 𝒂𝒖𝒅𝒊𝒐. 🏌🏽‍♂️` 
            });
        }
    }
};
