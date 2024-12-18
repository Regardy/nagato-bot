
import fetch from "node-fetch"
import axios from "axios"
let handler = async (m, {
    conn,
    args
}) => {
    if (!args[0]) throw "[ Masukkan Url Youtube! ]"
    await conn.reply(m.chat, wait, m)
    

        let Ytdl = await cobalt(args[0])
        let dls = "Download audio succes ( V1 )"
        let ytn = await fetch(Ytdl.url);

        let doc = {
            audio: ytn,
            mimetype: "audio/mp4",
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 2,
                    mediaUrl: args[0],
                    title: "© FURINA",
                    body: dls,
                    sourceUrl: args[0],
                    thumbnail: "",
                }
            }
        }

        await conn.sendMessage(m.chat, doc, {
            quoted: m
        })






            
        }
handler.help = ["mp3", "a"].map(v => "yt" + v + ` <url> <without message>`)
handler.tags = ["downloader"]
handler.command = /^y((outube|tb)audio|(outube|tb?)mp3|utubaudio|taudio|ta)$/i

handler.exp = 0
handler.register = false
handler.limit = true
handler.register = true

export default handler

async function cobalt(
  url,
  options = {
    audio: true,
    aFormat: "mp3",
    vCodec: "",
    vReso: "",
    mute: false,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!url) return reject("Insert URL!");

      // ? OPTIONS
      let { audio, aFormat, vCodec, vReso, mute } = options;

      const prop = {};
      const data = {
        url: url,
        filenamePattern: "pretty",
      };

      // ? AUDIO
      if (audio) {
        const aFRegex = /best|mp3|ogg|wav|opus/gi;
        if (!aFormat) aFormat = "mp3";
        if (!aFRegex.test(aFormat)) aFormat = "mp3";
        data.isAudioOnly = true;
        data.aFormat = aFormat;
        prop.type = "audio";
        prop.mtype = aFormat;
      }

      // ? VIDEO
      else {
        // ? REGEXP
        const vCRegex = /standar|high|medium/gi;
        const vRRegex =
          /max|8k\+?|4k|1440p?|1080p?|720p?|480p?|360p?|240p?|144p?/gi;

        // ? IF
        if (!vReso) vReso = "720p";
        if (!vCodec) vCodec = "standar";
        if (!vCRegex.test(vCRegex)) vCodec = "standar";
        if (!vRRegex.test(vReso)) vReso = "720p";
        if (!mute) mute = false;

        // ? QUALITY
        if (vReso === "8k+") vReso = "max";

        // ? CODEC
        switch (vCodec) {
          case "standar": {
            vCodec = "h246";
            break;
          }
          case "high": {
            vCodec = "av1";
            break;
          }
          case "medium": {
            vCodec = "vp9";
            break;
          }
          default: {
            vCodec: "h246";
            break;
          }
        }

        data.vCodec = vCodec;
        data.vQuality = vReso;
        data.isAudioOnly = false;
        data.isAudioMuted = mute;
        prop.type = "video";
        prop.hd = /max|8k+?|4k|1440p?/gi.test(vReso);
        prop.quality = vReso === "max" ? "8k+" : vReso;
        prop.codec = vCodec;
        prop.isMuted = mute;
      }

      // ? FETCHING
      const BASE_URL = "https://cobalt.tools";
      const BASE_API = "https://api.cobalt.tools/api";
      await fetch(BASE_API + "/json", {
        method: "OPTIONS",
        headers: {
          "access-control-request-method": "POST",
          "access-control-request-headers": "content-type",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
          origin: BASE_URL,
          referer: BASE_URL,
        },
      }).then(async () => {
        const res = await fetch(BASE_API + "/json", {
          method: "POST",
          headers: {
            origin: BASE_URL,
            referer: BASE_URL,
            "user-agent": BASE_URL,
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(data),
        }).then((v) => v.json());

        return resolve({ ...res, ...prop });
      });
    } catch (e) {
      reject(e);
    }
  });
}
