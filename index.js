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
const baneadosPath = path.join(__dirname, 'baneados.json'); 
const antilinkPath = path.join(__dirname, 'antilink.json');

// --- FUNCIÓN PARA BUSCAR EN SUBCARPETAS (RECURSIVA) ---
const buscarComando = (dir, name) => {
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
        printQRInTerminal: false,
        logger: pino({ level: 'silent' }),
        browser: ['Ubuntu', 'Chrome', '20.0.04'],
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000
    });

    if (!sock.authState.creds.registered) {
        console.clear();
        console.log("\x1b[36m%s\x1b[0m", "╔════════════════════════════════════╗");
        console.log("\x1b[36m%s\x1b[0m", "║     CONFIGURACIÓN DE CONEXIÓN      ║");
        console.log("\x1b[36m%s\x1b[0m", "╚════════════════════════════════════╝");
        console.log("1. Vincular con código QR");
        console.log("2. Vincular con código de 8 dígitos");
        
        const opcion = await question("\nSelecciona una opción (1 o 2): ");
        
        if (opcion === '2') {
            const numero = await question("\nIngresa tu número (ej: 584142577312): ");
            const numLimpio = numero.replace(/[^0-9]/g, '');
            
            setTimeout(async () => {
                try {
                    let code = await sock.requestPairingCode(numLimpio);
                    code = code?.match(/.{1,4}/g)?.join('-') || code;
                    console.log(`\n✅ TU CÓDIGO ES: \x1b[42m\x1b[30m ${code} \x1b[0m`);
                } catch (e) {
                    console.log("\n❌ Error al generar código.");
                }
            }, 3000);
        }
    }

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr && !sock.authState.creds.registered) {
            qrcode.generate(qr, { small: true });
        }
        if (connection === 'close') {
            const statusCode = (lastDisconnect.error instanceof Boom) ? lastDisconnect.error.output.statusCode : 0;
            if (statusCode !== DisconnectReason.loggedOut) {
                iniciarBot();
            }
        } else if (connection === 'open') {
            console.log('\n\x1b[32m✅ ¡Bot conectado con éxito!\x1b[0m');
        }
    });

    sock.ev.on('messages.upsert', async (chatUpdate) => {
        try {
            const msg = chatUpdate.messages[0];
            if (!msg.message || msg.key.fromMe) return;

            const from = msg.key.remoteJid;
            const sender = msg.key.participant || msg.key.remoteJid;
            const pushName = msg.pushName || 'Usuario';
            
            // --- VALIDACIÓN DE DUEÑO (JHON🏴‍☠️) ---
            const ownerNumber = '584142577312';
            const ownerID = '221479266435310';
            const senderLimpio = sender.replace(/[^0-9]/g, '');
            const isOwner = senderLimpio.includes(ownerNumber) || senderLimpio.includes(ownerID);

            // --- SISTEMA DE BANEADOS ---
            if (!fs.existsSync(baneadosPath)) fs.writeFileSync(baneadosPath, '[]');
            const baneados = JSON.parse(fs.readFileSync(baneadosPath));
            if (baneados.includes(senderLimpio) && !isOwner) return;

            // --- CAPTURA DE CUERPO ---
            const body = (msg.message.conversation || 
                          msg.message.extendedTextMessage?.text || 
                          msg.message.imageMessage?.caption || "").toLowerCase();

            // --- ESCUDO ANTI-LINK ---
            if (from.endsWith('@g.us')) {
                if (!fs.existsSync(antilinkPath)) fs.writeFileSync(antilinkPath, '[]');
                const antilink = JSON.parse(fs.readFileSync(antilinkPath));

                if (antilink.includes(from)) {
                    if (body.includes('chat.whatsapp.com/') && !isOwner) {
                        const metadata = await sock.groupMetadata(from);
                        const participants = metadata.participants;
                        const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
                        const botData = participants.find(p => p.id === botId);
                        const senderData = participants.find(p => p.id === sender);
                        const botIsAdmin = botData?.admin?.includes('admin');
                        const senderIsAdmin = senderData?.admin?.includes('admin');

                        if (!senderIsAdmin && botIsAdmin) {
                            await sock.groupParticipantsUpdate(from, [sender], "remove");
                            await sock.sendMessage(from, { 
                                image: { url: "https://i.postimg.cc/nLQ2RwPz/Screenshot-2025-12-30-14-40-31-396-com-miui-gallery-edit.jpg" },
                                caption: `⚠️ *PROTOCOLO DE SEGURIDAD*\n\nEl usuario @${senderLimpio} ha sido expulsado del grupo nada más y nada menos por idiota 🤦🏽‍♂️\n\n_Sincronizado con Jhon-Bot System_`,
                                mentions: [sender]
                            });
                            return; 
                        }
                    }
                }
            }

            // --- DISEÑO DE CONSOLA ---
            const hora = new Date().toLocaleTimeString();
            const colorOwner = isOwner ? '\x1b[33m[OWNER]\x1b[0m' : '\x1b[36m[USER]\x1b[0m';
            console.log(`\n\x1b[35m══════════════════════════════════════════\x1b[0m`);
            console.log(`\x1b[37m[${hora}]\x1b[0m ${colorOwner} \x1b[32m${pushName}\x1b[0m`);
            console.log(`\x1b[37mNúmero:\x1b[0m ${senderLimpio}`);
            console.log(`\x1b[37mMensaje:\x1b[0m ${body}`);
            console.log(`\x1b[35m══════════════════════════════════════════\x1b[0m`);

            // --- PROCESADOR DE COMANDOS DINÁMICO ---
            const prefixes = ['/', '!', '.', '?'];
            const prefix = prefixes.find(p => body.startsWith(p));

            if (prefix) {
                const args = body.slice(prefix.length).trim().split(/\s+/);
                const commandName = args.shift().toLowerCase();
                
                // Buscamos el comando en comandos/ y subcarpetas
                const commandPath = buscarComando(path.join(__dirname, 'comandos'), commandName);

                if (commandPath) {
                    delete require.cache[require.resolve(commandPath)];
                    const command = require(commandPath);
                    await sock.sendMessage(from, { react: { text: "⚡", key: msg.key } });
                    await command.run(sock, msg, body, args, isOwner);
                } else {
                    console.log(`\x1b[31m[SISTEMA]:\x1b[0m Comando no encontrado: ${commandName}`);
                }
            }
        } catch (err) {
            console.log('\x1b[31m[ERROR]:\x1b[0m', err);
        }
    });
}

iniciarBot().catch(err => console.log("Error crítico:", err));
                       
