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
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

const sessionPath = path.join(__dirname, 'sesion_bot');
const dbPath = path.join(__dirname, 'database', 'welcome-system.json');
const chatsPath = path.join(__dirname, 'chats.json');

// --- BUSCADOR DE COMANDOS ---
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
            console.log('\n\x1b[32m✅ Narutobot listo para el combate.\x1b[0m');
        }
    });

    // --- EVENTOS DE GRUPO (BIENVENIDA/DESPEDIDA) ---
    sock.ev.on('group-participants.update', async (update) => {
        const { id, participants, action } = update;
        if (!fs.existsSync(dbPath)) return;
        const db = JSON.parse(fs.readFileSync(dbPath));
        if (!db[id] || !db[id].status) return;

        for (const participant of participants) {
            let ppUrl;
            try { ppUrl = await sock.profilePictureUrl(participant, 'image'); } 
            catch { ppUrl = 'https://files.catbox.moe/t089d8.jpg'; }

            const userTag = `@${participant.split('@')[0]}`;
            const groupMetadata = await sock.groupMetadata(id);

            if (action === 'add') {
                let text = db[id].welcomeText || `Bienvenido ${userTag} a ${groupMetadata.subject}`;
                text = text.replace('@user', userTag).replace('@group', groupMetadata.subject);
                
                await sock.sendMessage(id, { 
                    image: { url: ppUrl }, 
                    caption: `╔════════════════════╗\n  ◈ *𝐍𝐄𝐖 𝐌𝐄𝐌𝐁𝐄𝐑* ◈\n╚════════════════════╝\n\n${text}`, 
                    mentions: [participant] 
                });
            } else if (action === 'remove') {
                let text = db[id].byeText || `Adiós ${userTag}`;
                text = text.replace('@user', userTag).replace('@group', groupMetadata.subject);
                
                await sock.sendMessage(id, { 
                    image: { url: ppUrl }, 
                    caption: `╔════════════════════╗\n    ◈ *𝐆𝐎𝐎𝐃 𝐁𝐘𝐄* ◈\n╚════════════════════╝\n\n${text}`, 
                    mentions: [participant] 
                });
            }
        }
    });

    sock.ev.on('messages.upsert', async (chatUpdate) => {
        const msg = chatUpdate.messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const from = msg.key.remoteJid;
        const body = (msg.message.conversation || msg.message.extendedTextMessage?.text || "").toLowerCase();
        
        // --- DETECTAR PREFIJOS ---
        const prefixes = ['/', '!', '.', '#'];
        const prefix = prefixes.find(p => body.startsWith(p));

        if (prefix) {
            const args = body.slice(prefix.length).trim().split(/\s+/);
            const commandName = args.shift().toLowerCase();
            const isOwner = msg.key.participant?.includes('584142577312') || from.includes('584142577312');

            const commandPath = buscarComando(path.join(__dirname, 'comandos'), commandName);
            if (commandPath) {
                const command = require(commandPath);
                await command.run(sock, msg, body, args, isOwner);
            }
        }
    });
}

iniciarBot();
