import fs from 'fs';
import fetch from 'node-fetch';

let handler = async(m, { conn, text }) => {
    if (!text) throw `Example : .ytsend link`
    await conn.sendMessage(m.chat, { react: { text: "⏱️",key: m.key,}})
    let ress = await fetch(`https://api.neekoi.me/api/youtube-audio?url=${text}`);
    let res = await ress.json();
    await conn.sendMessage("120363258256492594@newsletter", { audio: {url: res.data.audio}, mimetype: 'audio/mp4', ptt: true, fileLength: 88738,})
    
   
    await conn.sendMessage(m.chat, { react: { text: "☑️",key: m.key,}})
}
handler.help = ['ytsend']
handler.tags = ['downloader']
handler.command = /^(ytsendd|ytsend)$/i
handler.register = true;

export default handler