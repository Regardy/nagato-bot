


import axios from 'axios'
import * as cheerio from 'cheerio';

const handler = async (m, { text, conn }) => {
  if (!text) return m.reply(`Example: .kivotos cat`)

/*let hm = await animagine({
  style: "Anime",
  prompt: text,
  ratio: "832 x 1216",
  sampler: "DPM++ 2M SDE Karras",
})*/


            await conn.sendMessage(m.chat, {image:{url : `https://love.neekoi.me/kivotos?text=${text}`}, caption: "Done", });
           
        

}

handler.help = ['kivotos (ai pembuat gambar)']
handler.tags = ['ai']
handler.command = ['kiv', 'kivotos']

handler.limit = true

export default handler

async function animagine(options = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      let {
        prompt = "Cute Cat",
        negative = "Not Real",
        style = "Anime",
        sampler = "Euler a",
        ratio = "896 x 1152",
        quality = "Standard",
        width = "1024",
        height = "1024",
      } = options;
      const BASE_URL = "https://licnaqruf-animagine-xl.hf.space";
      const session_hash = Math.random().toString(36).substring(2);

      // ? Checker
      if (
        !/\(None\)|Cinematic|Photographic|Anime|Manga|Digital Art|Pixel art|Fantasy art|Neonpunk|3D Model/.test(
          style
        )
      )
        style = "Anime";
      if (
        !/DDIM|Euler a|Euler|DPM\+\+ 2M Karras|DPM\+\+ 2M SDE Karras|DPM\+\+ SDE Karras/.test(
          sampler
        )
      )
        sampler = "Euler a";
      if (!/\(none\)|Light|Standard|Heavy/.test(quality)) quality = "Heavy";
      if (
        !/Custom|640 x 1536|832 x 1216|1024 x 1024|1152 x 896|1344 x 768|768 x 1344|896 x 1152|1216 x 832|1536 x 640/.test(
          ratio
        )
      )
        ratio = "896 x 1152";
      if (quality === "Custom")
        async () => {
          if (!width || isNaN(width) || +width > 2048)
            return reject("Enter Valid Image Width Below 2048");
          if (!height || isNaN(height) || +height > 2048)
            return reject("Enter Valid Image Height Below 2048");
        };

      // ? Headers
      const headers = {
        origin: BASE_URL,
        referer: BASE_URL + "/?",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "content-type": "application/json",
      };

      // ? Token
      const { data: token } = await fetch(BASE_URL + "/run/predict", {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: [0, true],
          event_data: null,
          fn_index: 4,
          session_hash,
          trigger_id: 6,
        }),
      }).then((v) => v.json());

      // ? Join
      await fetch(BASE_URL + "/queue/join?", {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: [
            prompt,
            negative,
            token[0],
            width,
            height,
            7,
            28, // ? Step
            sampler, // ? Sampler
            ratio, // ? Aspect ratio
            style, // ? Style
            quality, // ? Quality
            false,
            0.55,
            1.5,
            true,
          ],
          event_data: null,
          fn_index: 5,
          session_hash,
          trigger_id: 7,
        }),
      }).then((v) => v.json());

      // ? Generate Images
      const stream = await fetch(
        BASE_URL + "/queue/data?" + new URLSearchParams({ session_hash })
      ).then((v) => v.body);

      // ? Handle Stream
      stream.on("data", (v) => {
        const data = JSON.parse(v.toString().split("data: ")[1]);
        if (data.msg !== "process_completed") return;
        if (!data.success) return reject("Image Generation Failed!");
        return resolve(data.output.data[0]);
      });
    } catch (e) {
      reject(e);
    }
  });
}

/*let hm = animagine({
  style: "Digital art",
  prompt: "Cute blue cat",
  ratio: "1024 x 1024",
  sampler: "DPM++ 2M SDE Karras",
})
 for (const item of hm.image.url) {
conn.sendFile(m.chat, item, m);
}*/
