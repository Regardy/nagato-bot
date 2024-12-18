
import * as cheerio from 'cheerio';
import fetch from "node-fetch";
import axios from 'axios';


let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Linknya mana?\n*Contoh:* ${usedPrefix}${command} https://www.instagram.com/reel/CvYLRDVx9cY/?igshid=NTc4MTIwNjQ2YQ==`;
  if (!args[0].match(/(https|http):\/\/www.instagram.com\/(p|reel|tv|stories)/gi)) throw `Link nya salah sayang ❤️`;
    const resul = await indown(args[0]);
    await conn.sendMessage(m.chat, {
      react: {
        text: '⏳',
        key: m.key,
      },
    });
    for (var [index, item] of resul.entries()) {
  
        await conn.sendFile(m.chat, item, `file_${index + 1}.mp4`, `*Done Kak File ${index + 1}*`, m);
    
    }
  
};

handler.help = ['instagram'].map(command => `${command} <url>`);
handler.tags = ['downloader'];
handler.command = /^(ig|instagram(dl)?)$/i;
handler.register = false;
handler.limit = true;

export default handler;


const types = ['photo', 'video'];

async function indown(urls, type) {
  const url = 'https://indownloader.app/request';
  const data = new URLSearchParams();
  data.append('link', urls);
  data.append('downloader', type);

  const headers = {
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'en-US,en;q=0.9',
    Connection: 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    Cookie: 'PHPSESSID=c1qc786t4r439k0ogf4pb50fgm; _ga_W9Q84JYKKD=GS1.1.1731120140.1.0.1731120140.0.0.0; _ga=GA1.1.979138462.1731120140; __gads=ID=89f41a0cc4734339:T=1731120140:RT=1731120140:S=ALNI_MY2FNGnAVDIkwE35v-IsEMzweOqRQ; __gpi=UID=00000f643ea193e0:T=1731120140:RT=1731120140:S=ALNI_MZrYvEtDAXMOExu4wavywGulS6Vww; __eoi=ID=439a66e4e79cc71a:T=1731120140:RT=1731120140:S=AA-AfjYcG5P7RNtPZLXiHOfQX-lR; FCNEC=%5B%5B%22AKsRol_dAqS6oEYU_-IReCxUk3gKXwJ2xCeHvSlTukmIMcqkQCHNZwEAOtXKQei1epvT9elPBlfUzZXCt90jGPgL2VxRUyCckXJr2GxBFqKEoWr8-2L-T54bWkO_QF6v_biozNwmo9Ka_19Sya7XHyjX40pA30kNuw%3D%3D%22%5D%5D',
    Origin: 'https://indownloader.app',
    Referer: 'https://indownloader.app/',
    'User-Agent': 'MyApp/1.0',
    'X-Requested-With': 'XMLHttpRequest',
  };


    const response = await axios.post(url, data.toString(), { headers });
    const html = response.data.html;
    const $ = cheerio.load(html);
    const thumbnailUrl = $('.post-thumb img').attr('src');
    const result = [];
    $(".download-options a").each((index, element) => {
      const href = $(element).attr("href");
      if (href) {
         link: result.push(href);
      }
  });
    
   
    return result
   };

   

