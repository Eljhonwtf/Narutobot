module.exports = {
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        let target = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        
        if (!target) {
            return await sock.sendMessage(from, { text: "⚠️ Etiqueta a la víctima. No puedo insultar a los fantasmas. 👻" }, { quoted: msg });
        }

        const targetNumber = target.split('@')[0];
        const ownerNumber = "584142577312"; 

        // PROTECCIÓN AL JEFE
        if (targetNumber === ownerNumber) {
            await sock.sendMessage(from, { react: { text: "🤡", key: msg.key } });
            return await sock.sendMessage(from, { 
                text: `¿Pero tú eres tonto? Con Jhon no se juega. ¡Mírate, pareces un chiste mal contado! 🤡`,
                mentions: [msg.key.participant || from] 
            }, { quoted: msg });
        }

        // LISTA DE 50 INSULTOS
        const insultos = [
            "Eres el error 404 de la naturaleza: Cerebro no encontrado. 🧠❌",
            "Tienes la cara como un pie después de un maratón. 👣",
            "Si la estupidez doliera, vivirías gritando. 🔊",
            "Eres tan inútil como la 'G' en 'Gnomo'. 🤡",
            "¿Tu mamá sabe que te escapaste del zoológico? 🦍",
            "Tienes menos luces que un callejón a las 3 AM. 🕯️",
            "Eres como un semáforo después de las 12: nadie te respeta. 🚥",
            "Eres tan feo que cuando naciste el doctor le pegó a tu mamá. 🤢",
            "Tu cara es la razón por la que Naruto se fue de la aldea. 🥷💨",
            "Tienes el coeficiente intelectual de una maceta vacía. 🪴",
            "Eres más lento que el internet de CANTV en lluvia. 🐌",
            "Tu único talento es dar vergüenza ajena. 🤦‍♂️",
            "Eres como un cenicero en una moto: estorbas y no sirves. 🏍️",
            "Si te dan dos neuronas, chocan por falta de espacio. 🧠",
            "Tienes la personalidad de una servilleta usada. 📄",
            "Eres tan feo que haces llorar a las cebollas. 🧅",
            "Tu nacimiento fue un error de sistema que Dios olvidó borrar. 💻",
            "Eres como un helado de cebolla: nadie te quiere cerca. 🍦",
            "Te falta tanto cerebro que si fueras más tonto, nacerías planta. 🌻",
            "Eres la prueba de que Dios tiene sentido del humor. 🤡",
            "Tu cara parece un mapa de Marte por tantos huecos. 🌋",
            "Eres más aburrido que un documental de piedras. 🪨",
            "Tienes menos futuro que un espía con hipo. 🕵️‍♂️",
            "¿Te caíste de la cuna o te lanzaron contra la pared? 👶💥",
            "Eres tan pobre que no tienes ni vergüenza. 💸",
            "Tu opinión vale lo mismo que un billete de monopolio. 💵",
            "Eres como el lunes: nadie te quiere. 🗓️",
            "Tienes la gracia de una piedra en el zapato. 👟",
            "¿Eres tonto por elección o por herencia? 🧬",
            "Eres el resultado de un condón que se rindió. 🎈",
            "Tienes cara de que tu mamá te bañaba con la manguera de lejos. 🚿",
            "Eres más falso que un billete de 3 dólares. 💵",
            "Tu cerebro es como una isla desierta: no hay nadie. 🏝️",
            "Eres tan feo que tu reflejo se suicidó. 🪞",
            "Tienes menos carisma que una puerta cerrada. 🚪",
            "¿Te dan cuerda para ser así de estúpido o ya vienes con pilas? 🔋",
            "Eres como una moneda de un centavo: no vales nada y estorbas. 🪙",
            "Tu cara es un poema... pero de terror. 📖",
            "Eres más inútil que un paraguas de malla. ☂️",
            "Si pusieras tu cerebro en una cuchara, sobraría espacio. 🥄",
            "Eres la razón por la que el champú trae instrucciones. 🧴",
            "¿En tu casa te quieren o solo te aguantan por lástima? 🏠",
            "Tienes menos ritmo que una gotera. 💧",
            "Eres como un Wi-Fi sin clave: cualquiera te usa y no sirves. 📶",
            "Tu cara es un insulto a la vista. 👁️",
            "Eres tan básico que tu tipo de sangre es agua de chorro. 🚰",
            "Si te muerdes la lengua, te mueres envenenado. 🐍",
            "Eres el póster oficial del método anticonceptivo. 🚫",
            "¿Te peinas con un rastrillo o es que el viento te odia? 🌬️",
            "Eres un desperdicio de oxígeno profesional. 🌬️❌"
        ];

        const randomInsulto = insultos[Math.floor(Math.random() * insultos.length)];

        // ENVÍO
        await sock.sendMessage(from, { react: { text: "🔥", key: msg.key } });
        await sock.sendMessage(from, { 
            text: `Hey @${targetNumber}...\n\n${randomInsulto}`, 
            mentions: [target] 
        }, { quoted: msg });
    }
};
