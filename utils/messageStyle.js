import fs from "fs"
import stylizedChar from "./fancy.js"

export default function stylizedCardMessage(text) {
  return {
    text: stylizedChar(text),
    contextInfo: {
      externalAdReply: {
        title: "🥷IB_HEX_BOT🥷",
        body: "𓆩 𝗜𝗯𝗿𝗮𝗵𝗶𝗺𝗮 𝘀𝗼𝗿𝘆 𝘀𝗮𝗰𝗸𝗼 𓆪",
        thumbnail: fs.readFileSync("./database/DigiX.jpg"),
        sourceUrl: "https://whatsapp.com",
        mediaType: 1,
        renderLargerThumbnail: false
      }
    }
  }
}
