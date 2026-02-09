const axios = require('axios');

module.exports = {
    run: async (sock, msg, body, args) => {
        try {
            const from = msg.key.remoteJid;
            
            // Detectar si el usuario respondió a un mensaje o escribió el texto
            const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
            let textToTranslate = args.join(" ");
            
            if (quoted) {
                textToTranslate = quoted.conversation || quoted.extendedTextMessage?.text;
            }

            if (!textToTranslate) {
                return await sock.sendMessage(from, { 
                    text: `† *Uso:* Escribe /tr [texto] o responde a un mensaje con /tr\n\n† *Ejemplo:* /tr Hello my friend` 
                }, { quoted: msg });
            }

            // API de traducción gratuita y rápida
            const res = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=${encodeURIComponent(textToTranslate)}`);
            
            const translation = res.data[0][0][0];
            const detectedLang = res.data[2]; // Idioma detectado

            let textoFinal = `☩ ─── [ *TRADUCTOR* ] ─── ☩\n\n`;
            textoFinal += `† *Original (${detectedLang}):* ${textToTranslate}\n`;
            textoFinal += `† *Español:* ${translation}\n\n`;
            textoFinal += `───────────────────────`;

            await sock.sendMessage(from, { text: textoFinal }, { quoted: msg });

        } catch (e) {
            console.log("Error en Traductor:", e);
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ No pude traducir ese texto.' });
        }
    }
};
