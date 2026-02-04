import configmanager from "../utils/configmanager.js";

const number = 224621963059
configmanager.config.users[number] = {
    sudoList: [224621963059@s.whatsapp.net'],
    tagAudioPath: "tag.mp3",
    antilink: false,
    response: true,
    autoreact: false,
    prefix: "Ib",
    reaction: "⚡",
    welcome: false,
    record:false,
    type:false,
    publicMode:false,
}
configmanager.save()

configmanager.premiums.premiumUser[`p`] = {
    premium: number,
} 
configmanager.saveP()
