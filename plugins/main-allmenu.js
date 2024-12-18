import fs from 'fs'
const {

    proto,

    generateWAMessage,
prepareWAMessageMedia,
    areJidsSameUser,
    generateWAMessageFromContent,

} = (await import('@adiwajshing/baileys')).default
let handler = async (m, { conn }) => {
	let pfft = `
🌸 Halooo... Aku Nagato (長門) 🌸
Bot kesayangannya Rega.
Sehat-sehat ya, guys! ✨

• Status: Public
• Owner: Rega or Neku
"Don't even care with anyone."

📜 Daftar Menu:
1️⃣ All Menu
Ketik .allmenu untuk menampilkan semua menu.
2️⃣ Game Menu
Ketik .menugame untuk menu permainan seru.
3️⃣ Info Menu
Ketik .menuinfo untuk melihat info penting.
4️⃣ Downloader Menu
Ketik .menudown untuk download musik, video, dan lainnya.
5️⃣ Hoyo Menu
Ketik .menuhoyo untuk menu spesial HoYoVerse.

💡 Tips:
Gunakan perintah sesuai kebutuhanmu ya!
"Nagato selalu ada untuk membantumu." 😊
 
`;
 let loadd = [
 '◆◇',
 '◇◆',
 '◆◇',
 '◇◆',
 '◆◇',
 '𝙻𝙾𝙰𝙳𝙸𝙽𝙶 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳...'
 ]

let { key } = await conn.sendMessage(m.chat, {text: '◇◆'})//Pengalih isu

for (let i = 0; i < loadd.length; i++) {
await conn.sendMessage(m.chat, {text: loadd[i], edit: key })}

    let hghg = 'https://telegra.ph/file/e1b2d7c0ac4838ebd20d1.jpg'
/*let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        
                           
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: pfft
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "Furina-MD"
          }),
          header: proto.Message.InteractiveMessage.Header.create({
                hasMediaAttachment: true, ...(await prepareWAMessageMedia({ video: await fetch('https://telegra.ph/file/9c205f5e68a6a2bfcf30c.mp4')}, { upload: conn.waUploadToServer }))
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"AllMenu\",\"id\":\".allmenu\"}"
              },
           ],
          })
        })
    }
  }
}, {})

await conn.relayMessage(msg.key.remoteJid, msg.message, {messageId: msg.key.id,
              message:{                                          extendedTextMessage: {

        contextInfo: {

thumbnail: hghg,

  forwardingScore: 1000,

  isForwarded: true,
  
}}}})*/

/*const fsaluran = { key : {
remoteJid: '0@s.whatsapp.net',
participant : '0@s.whatsapp.net'
},
message: {
newsletterAdminInviteMessage: {
newsletterJid: '120363258256492594@newsletter',
    newsletterName: '',
    caption: `hm`
}}}
let pedo = "`";

let teksskkk = pfft;
let sections = 
                [{
                title:"",
                highlight_label:"Dont spam",rows:
                [{title:"All Menu 👻",
                description:"Menampilkan list semua menu",
                id:".allmenu"},
                {
                title:"Owner 👤",
                description:"owner ganteng",
                id:".owner"},
                ]},
                
{title:"List Menu Beta",

rows:
               [ 
               {
                title:"Hoyo 🗺️",
                description:"Hoyovers Menu",
                id:".menuhoyo"},
               {
                title:"Downloder 🗃️",
                description:"Downloader Menu",
                id:".menudown"},
                 {
                title:"Rpg ⚔️",
                description:"Rpg Menu",
                id:".menurpg"},
                 {
                title:"Games 🎮",
                description:"Games Menu",
                id:".menugame"},
                 {
                title:"Info 🏢",
                description:"Info Menu",
                id:".menuinfo"},
                 {
                title:"Owner Menu",
                description:"Owner Menu",
                id:".menuowner"},
                ]}]

let listMessage = {
    title: 'List Menu',
    sections
};

let msghhhhhhhhhhhhhhhhhhh = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
        message: {
            "messageContextInfo": {
                "deviceListMetadata": {},
                "deviceListMetadataVersion": 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
                contextInfo: {
                    mentionedJid: [m?.sender],
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363258256492594@newsletter',
                        newsletterName: `IJN Nagato || 1.0 Versions`,
                        serverMessageId: -1
                    },
                    businessMessageForwardInfo: {
                        businessOwnerJid: conn.decodeJid(conn.user.id)
                    },
                    externalAdReply: {
                        title: 'Nagato 1.0|| Menu',
                        body: "Made By Rgbruh",
                        thumbnailUrl: global.fotonya2,
                        sourceUrl: '',
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                },
                body: proto.Message.InteractiveMessage.Body.create({
                    text: teksskkk
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                    text: `© Nagato`
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                    title: ``,
                
                }),
            
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                    buttons: [{
                        "name": "single_select",
                        "buttonParamsJson": JSON.stringify(listMessage)
                    }]
                })
            })
        }
    }
}, {
    quoted: fsaluran
});

await conn.relayMessage(msghhhhhhhhhhhhhhhhhhh.key.remoteJid, msghhhhhhhhhhhhhhhhhhh.message, {
    messageId: msghhhhhhhhhhhhhhhhhhh.key.id
});*/


await conn.sendMessage(m.chat, {
    video: fs.readFileSync('./media/Nagato.jpg'),
    fileLength: 100000000000,
    caption: pfft,
    contextInfo: {
      forwardingScore: 2023, 
      isForwarded: false,
      mentionedJid: [m.sender]
    }
  },
  )
  conn.sendMessage(m.chat, { audio: fs.readFileSync('./media/menu.mp3'), quoted: m });
/*
conn.sendMessage(m.chat, {
      text: pfft,
      contextInfo: {
      externalAdReply: {
      title: `𝓘𝓽𝓼𝓝𝓮𝓴𝓾`,
      body: global.author,
      thumbnailUrl: `https://telegra.ph/file/7eccaf6b9d12330543e36.jpg`,
      sourceUrl: sgc,
      mediaType: 1,
      renderLargerThumbnail: true
      }}})*/
}
handler.command = /^(menu|help)$/i;

export default handler;