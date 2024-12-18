import { tiktok } from 'betabotz-tools';

import axios from 'axios'
let handler = async (m, {
	conn,
	args,
	usedPrefix,
	command
}) => {
if (!args[0]) throw `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://vm.tiktok.com/ZGJAmhSrp/`;
if (!args[0].match(/tiktok/gi)) throw `URL Yang Tuan Berikan *Salah!!!*`;

let api = await tiktok2(args[0]);
let caption = `◥ *T I K T O K  D O W N L O A D* ◤

• *Description:* ${api.title}

Furina`;
await conn.sendMessage(m.chat, { video: { url: api.no_watermark }, caption: caption })
await conn.sendFile(m.chat, api.music, 'kasar.mp3', null, m)
  
     m.react('✔️')
    
}

    
 
handler.help = ['tiktok']
handler.tags = ['dl']
handler.command = /^(tiktok|ttdl|tiktokdl|tiktoknowm|tt)$/i
handler.diamond = false

export default handler

async function tiktok2(query) {
  return new Promise(async (resolve, reject) => {
    try {
    const encodedParams = new URLSearchParams();
encodedParams.set('url', query);
encodedParams.set('hd', '1');

      const response = await axios({
        method: 'POST',
        url: 'https://tikwm.com/api/',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Cookie': 'current_language=en',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
        },
        data: encodedParams
      });
      const videos = response.data.data;
        const result = {
          title: videos.title,
          cover: videos.cover,
          origin_cover: videos.origin_cover,
          no_watermark: videos.play,
          watermark: videos.wmplay,
          music: videos.music
        };
        resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

async function convert(ms) {

  var minutes = Math.floor(ms / 60000);

  var seconds = ((ms % 60000) / 1000).toFixed(0);

  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

}