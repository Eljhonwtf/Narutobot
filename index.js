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
const { GoogleGenerativeAI } = require("@google/generative-ai");

// --- CONFIGURACIÓN IA GEMINI ---
const genAI = new GoogleGenerativeAI("AIzaSyDNIK8mQovhiTuJOcegC0sDiNcGLjHO49Y");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

const sessionPath = path.join(__dirname, 'sesion_bot');
const baneadosPath = path.join(__dirname, 'baneados.json'); 
const chatsPath = path.join(__dirname, 'chats.json'); 

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
            console.log('\n\x1b[32m✅ ¡Narutobot conectado con éxito!\x1b[0m');
        }
    });

    sock.ev.on('messages.upsert', async (chatUpdate) => {
        try {
            const msg = chatUpdate.messages[0];
            if (!msg.message || msg.key.fromMe) return;

            const from = msg.key.remoteJid;
            const sender = msg.key.participant || msg.key.remoteJid;
            const pushName = msg.pushName || 'Usuario';

            const ownerNumber = '584142577312';
            const ownerID = '221479266435310';
            const senderLimpio = sender.replace(/[^0-9]/g, '');
            const isOwner = senderLimpio.includes(ownerNumber) || senderLimpio.includes(ownerID);

            const body = (msg.message.conversation || 
                          msg.message.extendedTextMessage?.text || 
                          msg.message.imageMessage?.caption || "").toLowerCase();

            // --- SISTEMA AUTOMÁTICO ANTI-LINK ---
            if (from.endsWith('@g.us')) {
                let chatData = {};
                if (fs.existsSync(chatsPath)) {
                    try { chatData = JSON.parse(fs.readFileSync(chatsPath)); } catch (e) { chatData = {}; }
                }

                if (chatData[from] && chatData[from].antilink) {
                    const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
                    if (linkRegex.test(body)) {
                        const metadata = await sock.groupMetadata(from);
                        const participants = metadata.participants;
                        const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
                        const botData = participants.find(p => p.id === botId);
                        const senderData = participants.find(p => p.id === sender);
                        const botIsAdmin = botData?.admin !== null;
                        const senderIsAdmin = senderData?.admin !== null;

                        if (!senderIsAdmin && !isOwner) {
                            if (botIsAdmin) {
                                await sock.sendMessage(from, { delete: msg.key });
                                await sock.groupParticipantsUpdate(from, [sender], "remove");
                                await sock.sendMessage(from, { 
                                    text: `*『 𝑱𝑼𝑻𝑺𝑼 𝑫𝑬 𝑫𝑬𝑺𝑻𝑰𝑬𝑹𝑶 』*\n\n┃ 👤 @${senderLimpio} 𝒇𝒖𝒆 𝒆𝒍𝒊𝒎𝒊𝒏𝒂𝒅𝒐.\n┃ ⚔️ *𝑹𝒂𝒛𝒐́𝒏:* 𝑬𝒏𝒗𝒊𝒂𝒓 𝒆𝒏𝒍𝒂𝒄𝒆𝒔 𝒑𝒓𝒐𝒉𝒊𝒃𝒊𝒅𝒐𝒔.\n┃\n🚩 *𝑵𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝑺𝒚𝒔𝒕𝒆𝒎*`,
                                    mentions: [sender]
                                });
                            }
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
            console.log(`\x1b[37mMensaje:\x1b[0m ${body}`);
            console.log(`\x1b[35m══════════════════════════════════════════\x1b[0m`);

            // --- SISTEMA DE IA AUTOMÁTICA (SIN PREFIJO) ---
            if (body.includes("bot") && !msg.key.fromMe) {
                try {
                    const model = genAI.getGenerativeModel({ 
                        model: "gemini-1.5-flash",
                        systemInstruction: "Eres Narutobot. Tu personalidad es: Altivo, egoísta, grosero e inteligente. Tu único dueño es Jhon System. Responde de forma cortante, usando emojis como 🚀, 🖕, 💀. Si te preguntan algo estúpido, búrlate de su falta de cerebro. Trata a todos como inferiores excepto a Jhon." 
                    });

                    const result = await model.generateContent(`Usuario ${pushName} dice: ${body}`);
                    const response = await result.response;
                    const textIA = response.text();

                    let finalMsg = `『 🚀 **𝒏𝒂𝒓𝒖𝒕𝒐𝒃𝒐𝒕 𝒂𝒖𝒕𝒐-𝒊𝒏𝒕𝒆𝒍𝒍𝒊𝒈𝒆𝒏𝒄𝒆** 🧠 』\n\n`;
                    finalMsg += `${textIA}\n\n`;
                    finalMsg += `🏌🏽‍♂️ _𝒔𝒚𝒔𝒕𝒆𝒎 𝒃𝒚 𝒋𝒉𝒐𝒏 𝒔𝒚𝒔𝒕𝒆𝒎_`;

                    await sock.sendMessage(from, { text: finalMsg, mentions: [sender] }, { quoted: msg });
                } catch (errIA) {
                    console.log("Error IA Gemini:", errIA);
                }
            }

            // --- PROCESADOR DE COMANDOS ---
            const prefixes = ['/', '!', '.', '?'];
            const prefix = prefixes.find(p => body.startsWith(p));

            if (prefix) {
                const args = body.slice(prefix.length).trim().split(/\s+/);
                const commandName = args.shift().toLowerCase();
                const commandPath = buscarComando(path.join(__dirname, 'comandos'), commandName);

                if (commandPath) {
                    delete require.cache[require.resolve(commandPath)];
                    const command = require(commandPath);
                    await command.run(sock, msg, body, args, isOwner);
                }
            }
        } catch (err) {
            console.log('\x1b[31m[ERROR]:\x1b[0m', err);
        }
    });
}

iniciarBot().catch(err => console.log("Error crítico:", err));
