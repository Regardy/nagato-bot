import axios from 'axios'
import * as cheerio from 'cheerio';

const handler = async (m, { text, conn }) => {
  if (!text) return m.reply(`Example: .miseki cat`)

/*let hm = await animagine({
  style: "Anime",
  prompt: text,
  ratio: "832 x 1216",
  sampler: "DPM++ 2M SDE Karras",
})*/


            await conn.sendMessage(m.chat, {image:{url : `https://love.neekoi.me/miseki?text=${text}`}, caption: "Done", });
           
        

}

handler.help = ['miseki (ai pembuat gambar)']
handler.tags = ['ai']
handler.command = ['mis', 'miseki']

handler.limit = true

export default handler