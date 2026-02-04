async function react(client, message) {
    try {
        const remoteJid = message.key?.remoteJid
        if (!remoteJid) return

        await client.sendMessage(remoteJid, {
            react: {
                text: '🥷',
                key: message.key
            }
        })

    } catch (err) {
        console.error('React error:', err)
    }
}

export default react
