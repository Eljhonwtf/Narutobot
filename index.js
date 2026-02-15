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
const dbDir = path.join(__dirname, 'database');
const dbPath = path.join(dbDir, 'welcome-system.json');

if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, JSON.stringify({}, null, 2));

// --- COLORES AGRESIVOS ---
const red = '\x1b[31m';
const white = '\x1b[37m';
const reset = '\x1b[0m';

const buscarComando = (dir, name) => {
    if (!fs.existsSync(dir)) return null;
    const archivos = fs.readdirSync(dir);
    for (const archivo of archivos) {
        const rutaFull = path.join(dir, archivo);
        if (fs.statSync(rutaFull).isDirectory()) {
            const resultado = buscarComando(rutaFull, name);
            if (resultado) return resultado;
        } else if (archivo.toLowerCase() === `${name.toLowerCase()}.js`) {
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
        browser: ['Warlord System', 'Chrome', '1.0.0'],
        printQRInTerminal: true
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const statusCode = (lastDisconnect.error instanceof Boom) ? lastDisconnect.error.output.statusCode : 0;
            if (statusCode !== DisconnectReason.loggedOut) iniciarBot();
        } else if (connection === 'open') {
            console.log(`\n${red}⚔️  WARLORD SYSTEM CONECTADO ⚔️${reset}`);
        }
    });

    // --- LOGICA DE BIENVENIDA (Tu código original) ---
    sock.ev.on('group-participants.update', async (update) => {
        const { id, participants, action } = update;
        try {
            const db = JSON.parse(fs.readFileSync(dbPath));
            if (!db[id] || !db[id].status) return;
            const groupMetadata = await sock.groupMetadata(id);
            for (const participant of participants) {
                let ppUrl;
                try { ppUrl = await sock.profilePictureUrl(participant, 'image'); } 
                catch { ppUrl = 'https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg'; }
                const userTag = `@${participant.split('@')[0]}`;
                if (action === 'add') {
                    await sock.sendMessage(id, { image: { url: ppUrl }, caption: `Bienvenido ${userTag} a ${groupMetadata.subject}`, mentions: [participant] });
                }
            }
        } catch (e) { console.log("Error en bienvenida: ", e) }
    });

    sock.ev.on('messages.upsert', async (chatUpdate) => {
        const msg = chatUpdate.messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const from = msg.key.remoteJid;
        const pushName = msg.pushName || 'Usuario';
        const sender = msg.key.participant || msg.key.remoteJid;
        
        // --- LIMPIEZA CRÍTICA DEL NÚMERO ---
        const senderLimpio = sender.replace(/[^0-9]/g, '');
        const isOwner = senderLimpio === '584142577312'; 

        const body = (msg.message.conversation || msg.message.extendedTextMessage?.text || msg.message.imageMessage?.caption || "");
        
        // --- LOGS A LA IZQUIERDA ---
        const hora = new Date().toLocaleTimeString();
        console.log(`${red}╭───────────────────────────${reset}`);
        console.log(`${red}│${white} 🕒 HORA: ${hora}`);
        console.log(`${red}│${white} 👤 NAME: ${pushName}${isOwner ? ` ${red}[BOSS]` : ''}`);
        console.log(`${red}│${white} 💬 MSG : ${body}`);
        console.log(`${red}╰───────────────────────────${reset}`);

        const prefixes = ['/', '!', '.', '#'];
        const prefix = prefixes.find(p => body.startsWith(p));

        if (prefix) {
            const args = body.slice(prefix.length).trim().split(/\s+/);
            const commandName = args.shift().toLowerCase();
            const commandPath = buscarComando(path.join(__dirname, 'comandos'), commandName);

            if (commandPath) {
                try {
                    delete require.cache[require.resolve(commandPath)];
                    const command = require(commandPath);
                    // Pasamos isOwner correctamente a tus comandos avanzados
                    await command.run(sock, msg, body, args, isOwner);
                } catch (e) { console.log(e); }
            } else {
                await sock.sendMessage(from, { text: `❌ Comando *${commandName}* no reconocido.` }, { quoted: msg });
            }
        }
    });
}

iniciarBot();
