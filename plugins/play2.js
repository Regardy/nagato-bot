import yts from "yt-search";
const {

    proto,

    generateWAMessage,
prepareWAMessageMedia,
    areJidsSameUser,
    generateWAMessageFromContent,

} = (await import('@adiwajshing/baileys')).default
let handler = async (m, { conn, text  }) => {
    if (!text) throw `Judul nya maan sayang ❤️`;
    let res = await yts(text)
    let url = res.all;
    let result = url[Math.floor(Math.random() * url.length)]
    let teks = `☉「 *ᴘ ʟ ᴀ ʏ - ʏ ᴛ* 」
    │› sᴛᴀᴛᴜs : *true*
    │› ᴊᴜᴅᴜʟ : *${result.title}*
    │› ᴜᴘʟᴏᴀᴅ : *${result.ago}*
    │› ᴜʀʟ : *${result.url}*
    └──···☉`
    let me = m.sender
    let msg = generateWAMessageFromContent(m.chat, {
        templateMessage: {
          hydratedFourRowTemplate: {
            hydratedContentText: teks,
            hydratedButtons: [
              {
                quickReplyButton: {
                  displayText: "Send Audio",
                  id: ".ytsend " + result.url,
                },
                index: 0
              },
            ]
          }
        }
      },{}
    )
    
    
    await conn.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id
    })



}
handler.help = ['play2']
handler.tags = ['downloader']
handler.command = /^(playy|play2)$/i
handler.register = true;

export default handler