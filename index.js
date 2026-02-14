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

// --- ASEGURAR QUE LA BASE DE DATOS EXISTA ---
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, JSON.stringify({}, null, 2));

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
        printQRInTerminal: true // Puedes ignorar el aviso de deprecated, aún funciona
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const statusCode = (lastDisconnect.error instanceof Boom) ? lastDisconnect.error.output.statusCode : 0;
            if (statusCode !== DisconnectReason.loggedOut) {
                iniciarBot();
            }
        } else if (connection === 'open') {
            console.log('\n\x1b[32m✅ Narutobot conectado con éxito!\x1b[0m');
        }
    });

    // --- LOGICA DE BIENVENIDA ---
    sock.ev.on('group-participants.update', async (update) => {
        const { id, participants, action } = update;
        const db = JSON.parse(fs.readFileSync(dbPath));
        if (!db[id] || !db[id].status) return;

        const groupMetadata = await sock.groupMetadata(id);
        for (const participant of participants) {
            let ppUrl;
            try { ppUrl = await sock.profilePictureUrl(participant, 'image'); } 
            catch { ppUrl = 'https://files.catbox.moe/xr2m6u.jpg'; }

            const userTag = `@${participant.split('@')[0]}`;
            const sourceInfo = {
                externalAdReply: {
                    title: 'Narutobot System ✨',
                    body: 'Hecho con amor por Jhon ✨',
                    mediaType: 1,
                    thumbnailUrl: 'https://files.catbox.moe/xr2m6u.jpg',
                    sourceUrl: 'https://github.com/JhonGuerra'
                }
            };

            if (action === 'add') {
                let wel = `❀ *Bienvenido* a *${groupMetadata.subject}*\n✰ ${userTag}\n\n${db[id].welcomeText || '¡Disfruta tu estadía!'}\n\n> 🚩 *Narutobot System*`;
                await sock.sendMessage(id, { image: { url: ppUrl }, caption: wel, mentions: [participant], contextInfo: sourceInfo });
            } else if (action === 'remove') {
                let bye = `❀ *Adiós* de *${groupMetadata.subject}*\n✰ ${userTag}\n\n${db[id].byeText || '¡Te esperamos pronto!'}\n\n> 🚩 *Narutobot System*`;
                await sock.sendMessage(id, { image: { url: ppUrl }, caption: bye, mentions: [participant], contextInfo: sourceInfo });
            }
        }
    });

    sock.ev.on('messages.upsert', async (chatUpdate) => {
        const msg = chatUpdate.messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const from = msg.key.remoteJid;
        const pushName = msg.pushName || 'Usuario';
        const sender = msg.key.participant || msg.key.remoteJid;
        const body = (msg.message.conversation || msg.message.extendedTextMessage?.text || msg.message.imageMessage?.caption || "").toLowerCase();
        
        const isOwner = sender.includes('584142577312');

        // --- AQUÍ REGRESAN TUS CONSOLE.LOG ---
        const hora = new Date().toLocaleTimeString();
        const colorOwner = isOwner ? '\x1b[33m[OWNER]\x1b[0m' : '\x1b[36m[USER]\x1b[0m';
        console.log(`\n\x1b[35m══════════════════════════════════════════\x1b[0m`);
        console.log(`\x1b[37m[${hora}]\x1b[0m ${colorOwner} \x1b[32m${pushName}\x1b[0m`);
        console.log(`\x1b[37mMensaje:\x1b[0m ${body}`);
        console.log(`\x1b[35m══════════════════════════════════════════\x1b[0m`);

        const prefixes = ['/', '!', '.', '#'];
        const prefix = prefixes.find(p => body.startsWith(p));

        if (prefix) {
            const args = body.slice(prefix.length).trim().split(/\s+/);
            const commandName = args.shift().toLowerCase();
            const commandPath = buscarComando(path.join(__dirname, 'comandos'), commandName);

            if (commandPath) {
                try {
                    const command = require(commandPath);
                    await command.run(sock, msg, body, args, isOwner);
                } catch (e) { console.log(e); }
            } else {
                const errorTxt = `❌ *JUTSU DESCONOCIDO*\n\nEl comando *${prefix}${commandName}* no existe.`;
                await sock.sendMessage(from, { text: errorTxt }, { quoted: msg });
            }
        }
    });
}

iniciarBot();
