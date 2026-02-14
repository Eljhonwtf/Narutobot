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

        // --- DETECTOR DE ENTRADAS Y SALIDAS CON CRÉDITOS ---
    sock.ev.on('group-participants.update', async (update) => {
        const { id, participants, action } = update;
        const dbPath = path.join(__dirname, 'database', 'welcome-system.json');

        if (!fs.existsSync(dbPath)) return;
        const db = JSON.parse(fs.readFileSync(dbPath));
        if (!db[id] || !db[id].status) return;

        const groupMetadata = await sock.groupMetadata(id);

        for (const participant of participants) {
            let ppUrl;
            try { 
                ppUrl = await sock.profilePictureUrl(participant, 'image'); 
            } catch { 
                ppUrl = 'https://files.catbox.moe/xr2m6u.jpg'; 
            }

            const userTag = `@${participant.split('@')[0]}`;

            // Configuración del "Source" (Créditos)
            const sourceInfo = {
                externalAdReply: {
                    title: 'Naruto Bot MD',
                    body: 'Hecho con amor por Jhon ✨',
                    mediaType: 1,
                    previewType: 0,
                    thumbnailUrl: 'https://files.catbox.moe/xr2m6u.jpg', // Puedes poner otra imagen pequeña aquí
                    sourceUrl: 'https://github.com/' // O tu link de contacto
                }
            };

            if (action === 'add') {
                let wel = `❀ *Bienvenido* a *${groupMetadata.subject}*\n`;
                wel += `✰ ${userTag}\n\n`;
                wel += `${db[id].welcomeText || '•(=^●ω●^=)• Disfruta tu estadía en el grupo!'}\n\n`;
                wel += `> ✐ Puedes usar *#help* para ver la lista de comandos.`;

                await sock.sendMessage(id, { 
                    image: { url: ppUrl }, 
                    caption: wel, 
                    mentions: [participant],
                    contextInfo: sourceInfo // <-- AQUÍ SE AGREGAN LOS CRÉDITOS
                });

            } else if (action === 'remove') {
                let bye = `❀ *Adiós* de *${groupMetadata.subject}*\n`;
                bye += `✰ ${userTag}\n\n`;
                bye += `${db[id].byeText || '•(=^●ω●^=)• ¡Te esperamos pronto!'}\n\n`;
                bye += `> ✐ La voluntad de fuego se mantiene en la aldea.`;

                await sock.sendMessage(id, { 
                    image: { url: ppUrl }, 
                    caption: bye, 
                    mentions: [participant],
                    contextInfo: sourceInfo // <-- TAMBIÉN EN LA DESPEDIDA
                });
            }
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
                    await command.run(sock, msg, body, args, isOwner);
                } catch (e) {
                    console.log(e);
                }
            } else {
                // --- RESPUESTA PARA COMANDO NO ENCONTRADO CON QUOTED ---
                const errorTxt = `❌ *JUTSU DESCONOCIDO*\n\nEl comando *${prefix}${commandName}* no existe.\n\n💡 Escribe *#menu* para ver mis habilidades.`;
                await sock.sendMessage(from, { text: errorTxt }, { quoted: msg });
            }
        }
    });
}

iniciarBot();
