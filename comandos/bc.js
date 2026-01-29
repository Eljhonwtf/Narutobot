module.exports = {
    name: 'broadcast',
    description: '𝒅𝒊𝒇𝒖𝒔𝒊𝒐́𝒏 𝒈𝒍𝒐𝒃𝒂𝒍 𝒅𝒆𝒍 𝒋𝒆𝒇𝒆',
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;

        // 1. BLOQUEO PARA METICHES CON ESTILO
        if (!isOwner) {
            await sock.sendMessage(from, { react: { text: "🤡", key: msg.key } });

            const frases = [
                "¿𝒑𝒆𝒓𝒐 𝒕𝒖́ 𝒆𝒓𝒆𝒔 𝒕𝒐𝒏𝒕𝒐 𝒐 𝒃𝒂𝒓𝒓𝒆𝒔 𝒆𝒍 𝒅𝒆𝒔𝒊𝒆𝒓𝒕𝒐? 𝒔𝒐𝒍𝒐 𝒎𝒊 𝒅𝒖𝒆𝒏̃𝒐 𝒑𝒖𝒆𝒅𝒆 𝒖𝒔𝒂𝒓 𝒆𝒔𝒕𝒐. 🤡",
                "¡𝒂𝒍𝒆𝒓𝒕𝒂 𝒅𝒆 𝒊𝒏𝒕𝒓𝒖𝒔𝒐! 🚨 𝒊𝒏𝒕𝒆𝒏𝒕𝒂𝒔𝒕𝒆 𝒖𝒔𝒂𝒓 𝒖𝒏 𝒄𝒐𝒎𝒂𝒏𝒅𝒐 𝒅𝒆 𝒅𝒊𝒐𝒔 𝒔𝒊𝒆𝒏𝒅𝒐 𝒖𝒏 𝒔𝒊𝒎𝒑𝒍𝒆 𝒎𝒐𝒓𝒕𝒂𝒍. 🏌🏽‍♂️",
                "𝒆𝒓𝒓𝒐𝒓 404: 𝒏𝒆𝒖𝒓𝒐𝒏𝒂𝒔 𝒏𝒐 𝒆𝒏𝒄𝒐𝒏𝒕𝒓𝒂𝒅𝒂𝒔. 𝒔𝒐𝒍𝒐 𝒎𝒊 𝒋𝒆𝒇𝒆 𝒕𝒊𝒆𝒏𝒆 𝒑𝒆𝒓𝒎𝒊𝒔𝒐. 🧠❌",
                "¿𝒕𝒆 𝒈𝒖𝒔𝒕𝒂 𝒕𝒐𝒄𝒂𝒓 𝒍𝒐 𝒒𝒖𝒆 𝒏𝒐 𝒆𝒔 𝒕𝒖𝒚𝒐? ¡𝒂 𝒅𝒐𝒓𝒎𝒊𝒓! 𝒔𝒐𝒍𝒐 𝒆𝒍 𝒋𝒆𝒇𝒆 𝒎𝒂𝒏𝒅𝒂 𝒂𝒒𝒖𝒊́. 🚀"
            ];
            const randomFrase = frases[Math.floor(Math.random() * frases.length)];

            return await sock.sendMessage(from, { text: randomFrase }, { quoted: msg });
        }

        // 2. LÓGICA DE DIFUSIÓN (SOLO PARA EL DUEÑO)
        const texto = args.join(" ");
        if (!texto) return sock.sendMessage(from, { 
            text: "𝒋𝒆𝒇𝒆, 𝒑𝒐𝒓 𝒇𝒂𝒗𝒐𝒓 𝒆𝒔𝒄𝒓𝒊𝒃𝒆 𝒆𝒍 𝒎𝒆𝒏𝒔𝒂𝒋𝒆 𝒒𝒖𝒆 𝒒𝒖𝒊𝒆𝒓𝒆𝒔 𝒅𝒊𝒇𝒖𝒏𝒅𝒊𝒓. 🚀" 
        });

        await sock.sendMessage(from, { react: { text: "⚡", key: msg.key } });

        const chats = await sock.groupFetchAllParticipating(); 
        const ids = Object.keys(chats);

        await sock.sendMessage(from, { 
            text: `🚀 𝒆𝒏𝒗𝒊𝒂𝒏𝒅𝒐 𝒎𝒆𝒏𝒔𝒂𝒋𝒆 𝒎𝒂𝒔𝒊𝒗𝒐 𝒂 ${ids.length} 𝒈𝒓𝒖𝒑𝒐𝒔... 🏌🏽‍♂️` 
        });

        for (let id of ids) {
            await sock.sendMessage(id, { 
                text: `📢 *𝒄𝒐𝒎𝒖𝒏𝒊𝒄𝒂𝒅𝒐 𝒐𝒇𝒊𝒄𝒊𝒂𝒍*\n\n${texto}\n\n_𝒔𝒊𝒏𝒄𝒓𝒐𝒏𝒊𝒛𝒂𝒅𝒐 𝒄𝒐𝒏 𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒔𝒚𝒔𝒕𝒆𝒎_ 🚀`,
                contextInfo: {
                    externalAdReply: {
                        title: "† 𝒎𝒆𝒏𝒔𝒂𝒋𝒆 𝒅𝒆𝒍 𝒔𝒊𝒔𝒕𝒆𝒎𝒂 †",
                        body: "𝒅𝒊𝒇𝒖𝒔𝒊𝒐́𝒏 𝒈𝒍𝒐𝒃𝒂𝒍 𝒂𝒄𝒕𝒊𝒗𝒂 🏌🏽‍♂️",
                        thumbnailUrl: "https://i.postimg.cc/Bbd8Zhn0/1c2380631fcd4e45a2488437d9dc7520.jpg",
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            });
        }

        await sock.sendMessage(from, { 
            text: "✅ 𝒅𝒊𝒇𝒖𝒔𝒊𝒐́𝒏 𝒄𝒐𝒎𝒑𝒍𝒆𝒕𝒂𝒅𝒂 𝒄𝒐𝒏 𝒆́𝒙𝒊𝒕𝒐, 𝒋𝒆𝒇𝒆. 🏌🏽‍♂️🚀" 
        });
    }
};
