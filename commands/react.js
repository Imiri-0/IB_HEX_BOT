
export async function react(client, message) {

    const remoteJid = message.key.remoteJid;

   await client.sendMessage(remoteJid, 

        {
            react: {
                text: '🥷',

                key: message.key
            }
        }

    )

}


export default react;
