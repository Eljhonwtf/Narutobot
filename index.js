const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    DisconnectReason, 
    fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const pino = require('pino');

const sessionPath = path.join(__dirname, 'sesion_bot');
const dbPath = path.join(__dirname, 'database', 'welcome-system.json');

const buscarComando = (dir, name) => {
    if (!fs.existsSync(dir)) return null;
    const archivos = fs.readdirSync(dir);
    for (const archivo of archivos) {
        const rutaFull = path.join(dir, archivo);
        if (fs.statSync(rutaFull).isDirectory()) {
            const resultado = buscarComando(rutaFull, name);
            if (resultado) return resultado;
        } else if (archivo === `${name}.js`) {
            return rutaFull;
        }
    }
    return null;
};

async function iniciarBot() {
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: state,
        logger: pino({ level: 'silent' }),
        browser: ['Narutobot MD', 'Chrome', '1.0.0'],
        printQRInTerminal: true
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error instanceof Boom) ? 
                lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut : true;
            if (shouldReconnect) iniciarBot();
        } else if (connection === 'open') {
            console.log('\n\x1b[32m✅ Narutobot conectado y listo.\x1b[0m');
        }
    });

    // --- EVENTO DE BIENVENIDA CORREGIDO ---
    sock.ev.on('group-participants.update', async (update) => {
        const { id, participants, action } = update;
        if (!fs.existsSync(dbPath)) return;
        const db = JSON.parse(fs.readFileSync(dbPath));
        if (!db[id] || !db[id].status) return;

        const groupMetadata = await sock.groupMetadata(id);

        for (const participant of participants) {
            let ppUrl;
            try { ppUrl = await sock.profilePictureUrl(participant, 'image'); } 
            catch { ppUrl = 'https://files.catbox.moe/t089d8.jpg'; }

            const userTag = `@${participant.split('@')[0]}`;

            if (action === 'add') {
                let text = db[id].welcomeText || `Bienvenido ${userTag} a ${groupMetadata.subject}`;
                text = text.replace('@user', userTag).replace('@group', groupMetadata.subject);
                
                await sock.sendMessage(id, { 
                    image: { url: ppUrl }, 
                    caption: `╔════════════════════╗\n  ◈ *𝐍𝐄𝐖 𝐌𝐄𝐌𝐁𝐄𝐑* ◈\n╚════════════════════╝\n\n${text}\n\n🚩 *Narutobot System*`, 
                    mentions: [participant] 
                });
            }
            // Agrega aquí el 'remove' si deseas despedidas también
        }
    });

    sock.ev.on('messages.upsert', async (chatUpdate) => {
        const msg = chatUpdate.messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const from = msg.key.remoteJid;
        const body = (msg.message.conversation || msg.message.extendedTextMessage?.text || msg.message.imageMessage?.caption || "").toLowerCase();
        
        const prefixes = ['/', '!', '.', '#'];
        const prefix = prefixes.find(p => body.startsWith(p));

        if (prefix) {
            const args = body.slice(prefix.length).trim().split(/\s+/);
            const commandName = args.shift().toLowerCase();
            const sender = msg.key.participant || msg.key.remoteJid;
            const isOwner = sender.includes('584142577312');

            const commandPath = buscarComando(path.join(__dirname, 'comandos'), commandName);
            
            if (commandPath) {
                try {
                    const command = require(commandPath);
                    // Pasamos sock, msg, etc. El comando debe usar { quoted: msg } internamente
                    await command.run(sock, msg, body, args, isOwner);
                } catch (e) {
                    console.log(e);
                }
            } else {
                // --- RESPUESTA PARA COMANDO NO ENCONTRADO ---
                const errorTxt = `❌ *COMANDO NO ENCONTRADO*\n\nEl comando *${prefix}${commandName}* no existe o está mal escrito.\n\n💡 Usa */menu* para ver la lista de jutsus disponibles.`;
                await sock.sendMessage(from, { text: errorTxt }, { quoted: msg });
            }
        }
    });
}

iniciarBot();
