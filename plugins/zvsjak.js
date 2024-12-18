// *[ PLAY BY Y2MATE ]*
// PLUGINS ESM
// https://whatsapp.com/channel/0029Vai8a3K4CrfZmzVnGI3m
// Thanks to Yuki Hiiragi

import axios from "axios"
import yts from "yt-search";
import fetch from "node-fetch";
import { pipeline } from'stream';
import { promisify } from'util';
const streamPipeline = promisify(pipeline);
import os from 'os';
function trimYouTubeUrl(url) {
  const trimmedUrl = url.split('?')[0];
  return trimmedUrl;
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
 conn.play = conn.play ? conn.play : {};
  if (!text) throw `*• Example:* ${usedPrefix + command} Kaguya love is war`;
  const key = await conn.sendMessage(m.chat, { text: wait }, { quoted: m });

  try {
    // Validate URL
    let trimmedUrl = trimYouTubeUrl(text);
    let search = await yts(trimmedUrl);
    if (!search) throw 'Not Found, Try Another Title';
    let vid = search.videos[0];
    let { title, thumbnail, timestamp, views, ago, url } = vid;
    let caption = `*[ YOUTUBE PLAY ]*\n*• Caption:* ${title}\n*• Views:* ${views}\n*• Ago:* ${ago}\n*• Thumbnail:* ${thumbnail}\n*• Source Yt:* ${url}\n\n*do you want to download the video?*\nType *Y* or *N*\n*• Timeout:* 5 seconds` + "\n\n```Audio will be sent soon\nso please wait a moment```";

    const t = await conn.sendMessage(m.chat, { text: caption, edit: key }, { quoted: key });
conn.play[m.sender] = {

      url: url,

      reply: t

    }
	
    let ress = await fetch(`https://api.neekoi.me/api/youtube-audio?url=${url}`);
    let res = await ress.json();
    console.log(res)
	
		conn.sendFile(m.chat,  res.data.audio, title + ".mp3", "", m, 0, {
			mimetype: "audio/mpeg",

		ptt: true,
			contextInfo: {
		
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 2,
        mediaUrl: url,
        title: title,
        body: wm,

        sourceUrl: url,
      }
    }
		});
	setTimeout(() => {
delete conn.play[m.sender]
}, 5000)
  // Delete the audio file
  
  
  } catch (error) {
   
    throw error;
  }
};

handler.before = async (m, { conn }) => {
  conn.play = conn.play ? conn.play : {};
  if (!m.text) return;
  if (!conn.play[m.sender]) return;
  if (m.text == "Y") {
    m.reply(wait);
    let { url, reply } = conn.play[m.sender];
    const ytdl = new Ytdl();
        const vide = await ytdl.play(url)
    await conn.sendMessage(m.chat, { video: { url: vide.video['360'].url }, caption: `*✅ Succes Download videos*` }, { quoted: reply });
    delete conn.play[m.sender];
  } else if (m.text == "N") {
    m.reply("*✅ Succes canceled videos*");
    delete conn.play[m.sender];
  } else return;
};
handler.help = ["play"];
handler.tags = ["downloader"];
handler.command = ["play"];

handler.limit = true;


export default handler;

class Ytdl {
    constructor() {
        this.baseUrl = 'https://id-y2mate.com';
    }

    async search(url) {
        const requestData = new URLSearchParams({
            k_query: url,
            k_page: 'home',
            hl: '',
            q_auto: '0'
        });

        const requestHeaders = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': '*/*',
            'X-Requested-With': 'XMLHttpRequest'
        };

        try {
            const response = await axios.post(`${this.baseUrl}/mates/analyzeV2/ajax`, requestData, {
                headers: requestHeaders
            });

            const responseData = response.data;
            console.log(responseData);
            return responseData;
        } catch (error) {
            if (error.response) {
                console.error(`HTTP error! status: ${error.response.status}`);
            } else {
                console.error('Axios error: ', error.message);
            }
        }
    }

    async convert(videoId, key) {
        const requestData = new URLSearchParams({
            vid: videoId,
            k: key
        });

        const requestHeaders = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': '*/*',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36',
            'Referer': `${this.baseUrl}/youtube/${videoId}`
        };

        try {
            const response = await axios.post(`${this.baseUrl}/mates/convertV2/index`, requestData, {
                headers: requestHeaders
            });

            const responseData = response.data;
            console.log(responseData);
            return responseData;
        } catch (error) {
            if (error.response) {
                console.error(`HTTP error! status: ${error.response.status}`);
            } else {
                console.error('Axios error: ', error.message);
            }
        }
    }

    async play(url) {
        let { links, vid, title } = await this.search(url);
        let video = {}, audio = {};

        for (let i in links.mp4) {
            let input = links.mp4[i];
            let { fquality, dlink } = await this.convert(vid, input.k);
            video[fquality] = {
                size: input.q,
                url: dlink
            };
        }

        for (let i in links.mp3) {
            let input = links.mp3[i];
            let { fquality, dlink } = await this.convert(vid, input.k);
            audio[fquality] = {
                size: input.q,
                url: dlink
            };
        }

        return { title, video, audio };
    }
}