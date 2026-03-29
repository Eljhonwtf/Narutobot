module.exports = {
    run: async (sock, msg, body, args, isOwner) => {
        const from = msg.key.remoteJid;
        const isQuoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;

        if (!isQuoted) return sock.sendMessage(from, { text: "⚠️ Responde al mensaje que quieres borrar." });

        const key = {
            remoteJid: from,
            fromMe: false,
            id: msg.message.extendedTextMessage.contextInfo.stanzaId,
            participant: msg.message.extendedTextMessage.contextInfo.participant
        };

        await sock.sendMessage(from, { delete: key });
    }
};
