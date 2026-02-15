const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    DisconnectReason, 
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore
} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const path = require('path');
const pino = require('pino');
const readline = require('readline');
const qrcode = require('qrcode-terminal');

// --- DATOS DE AUTORIDAD ---
const ownerNumber = '584142577312'; 
const sessionPath = path.join(__dirname, 'sesion_bot');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

// --- PALETA DE COLORES ---
const f_orange = '\x1b[38;5;202m';
const f_yellow = '\x1b[38;5;214m';
const red = '\x1b[31m';
const white = '\x1b[37m';
const cyan = '\x1b[36m';
const green = '\x1b[32m';
const gray = '\x1b[90m';
const reset = '\x1b[0m';

const imprimirBanner = () => {
    console.clear();
    console.log(`${f_orange}   _  _   _   ___  _   _ _____ ___    ____   ___ _____ `);
    console.log(`${f_orange}  | \\| | /_\\ | _ \\| | | |_   _/ _ \\  | __ ) / _ \\_   _|`);
    console.log(`${f_yellow}  | .  |/ _ \\|   /| |_| | | || (_) | |  _ \\| (_) || |  `);
    console.log(`${f_yellow}  |_|\\_/_/ \\_\\_|_\\ \\___/  |_| \\___/  |____/ \\___/ |_|  `);
    console.log(`${red}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`${white}   [ 👑 HOKAGE: ${cyan}JHON${white} ]  [ ⚡ STATUS: ${green}ONLINE${white} ]  [ 🌀 V: 3.1 ]${reset}\n`);
};

const buscarComando = (dir, name) => {
    if (!fs.existsSync(dir)) return null;
    const archivos = fs.readdirSync(dir);
    for (const archivo of archivos) {
        const rutaFull = path.join(dir, archivo);
        if (fs.statSync(rutaFull).isDirectory()) {
            const res = buscarComando(rutaFull, name);
            if (res) return res;
        } else if (archivo.toLowerCase() === `${name.toLowerCase()}.js`) return rutaFull;
    }
    return null;
};

async function iniciarBot() {
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const { version } = await fetchLatestBaileysVersion();

    let usePairingCode = false;
    let phoneNumber = "";

    if (!state.creds.registered) {
        imprimirBanner();
        console.log(`${f_orange}┌──────────────────────────────────────────┐`);
        console.log(`${white}│  ${f_yellow}[1]${white} Vincular con Código QR             │`);
        console.log(`${white}│  ${f_yellow}[2]${white} Vincular con Código de 8 Dígitos   │`);
        console.log(`${f_orange}└──────────────────────────────────────────┘${reset}`);
        const opcion = await question(`\n${f_orange}➤ ELIGE TU CAMINO NINJA:${reset} `);

        if (opcion === '2') {
            usePairingCode = true;
            phoneNumber = await question(`${f_orange}➤ INGRESA TU NÚMERO (Ej: 584142577312):${reset} `);
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        }
    }

    const sock = makeWASocket({
        version,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" })),
        },
        logger: pino({ level: 'silent' }),
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        printQRInTerminal: false, // DESACTIVADO para quitar el aviso amarillo
    });

    // --- MANEJO DE VINCULACIÓN ---
    if (usePairingCode && !sock.authState.creds.registered) {
        if (!phoneNumber) {
            console.log(`${red}❌ Error: Número no proporcionado.${reset}`);
            process.exit();
        }
        setTimeout(async () => {
            let code = await sock.requestPairingCode(phoneNumber);
            code = code?.match(/.{1,4}/g)?.join("-") || code;
            console.log(`\n${white}╔════════════════════════════════════╗`);
            console.log(`${white}║  ${f_orange}CÓDIGO DE ACCESO:${reset} ${f_yellow}${code}${white}     ║`);
            console.log(`${white}╚════════════════════════════════════╝\n`);
        }, 3000);
    }

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        // Mostrar QR solo si se eligió la opción 1
        if (qr && !usePairingCode) {
            console.log(`${f_yellow}📷 Escanea el código QR para iniciar sesión:${reset}`);
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'open') {
            imprimirBanner();
            console.log(`${green}✅ ALDEA DE LA HOJA CONECTADA (WhatsApp Online)${reset}\n`);
        } else if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            console.log(`${red}⚠️ Conexión cerrada. Razón: ${reason}. Reintentando...${reset}`);
            
            if (reason !== DisconnectReason.loggedOut) {
                iniciarBot();
            } else {
                console.log(`${red}❌ Sesión cerrada. Borra la carpeta ${sessionPath} y vuelve a vincular.${reset}`);
                process.exit();
            }
        }
    });

    sock.ev.on('messages.upsert', async (chatUpdate) => {
        try {
            const m = chatUpdate.messages[0];
            if (!m.message || m.key.fromMe) return;

            const from = m.key.remoteJid;
            const sender = m.key.participant || m.key.remoteJid;
            const pushName = m.pushName || 'Shinobi';
            const senderNumber = sender.replace(/[^0-9]/g, '');
            
            const isOwner = senderNumber === ownerNumber;
            const isGroup = from.endsWith('@g.us');
            const body = m.message.conversation || m.message.extendedTextMessage?.text || m.message.imageMessage?.caption || "";
            
            // --- LOGS PROFESIONALES ---
            const hora = new Date().toLocaleTimeString();
            console.log(`${gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}`);
            console.log(`${f_orange}🕒 HORA   :${reset} ${white}${hora}`);
            console.log(`${f_orange}👤 NOMBRE :${reset} ${cyan}${pushName} ${isOwner ? `${red}[HOKAGE]` : `${gray}[NINJA]`}`);
            console.log(`${f_orange}📱 NÚMERO :${reset} ${green}${senderNumber}`);
            console.log(`${f_orange}💬 MSG    :${reset} ${white}${body}`);
            console.log(`${gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}`);

            const prefixes = ['/', '!', '.', '#', '$'];
            const prefix = prefixes.find(p => body.startsWith(p));

            if (prefix) {
                const args = body.slice(prefix.length).trim().split(/\s+/);
                const commandName = args.shift().toLowerCase();
                const cmdFile = buscarComando(path.join(__dirname, 'comandos'), commandName);

                if (cmdFile) {
                    delete require.cache[require.resolve(cmdFile)];
                    const cmd = require(cmdFile);
                    await cmd.run(sock, m, body, args, isOwner, isGroup);
                }
            }
        } catch (e) { console.error(`${red}Error en el mensaje: ${e.message}${reset}`); }
    });
}

iniciarBot();
