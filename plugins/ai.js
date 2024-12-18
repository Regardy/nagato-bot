// *[INFORMATION]*
// Plug paket lengkap ai esesah
import fetch from 'node-fetch'
import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Ummhh mau tanya apa??, Example: ${usedPrefix + command} Apa itu pedofil`

  m.reply('Writing...');

  
    async function openai(text, logic) { // Membuat fungsi openai untuk dipanggil
      let response = await axios.post("https://chateverywhere.app/api/chat/", {
          "model": {
              "id": "gpt-4",
              "name": "GPT-4",
              "maxLength": 32000,  // Sesuaikan token limit jika diperlukan
              "tokenLimit": 8000,  // Sesuaikan token limit untuk model GPT-4
              "completionTokenLimit": 5000,  // Sesuaikan jika diperlukan
              "deploymentName": "gpt-4"
          },
          "messages": [
              {
                  "pluginId": null,
                  "content": text, 
                  "role": "user"
              }
          ],
          "prompt": logic, 
          "temperature": 0.5
      }, { 
          headers: {
              "Accept": "/*/",
              "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
          }
      });
      
      let result = response.data;
      return result;
  }
  
  let ehe = await openai(text, "Nama mu adalah IJN Nagato, kamu adalah kapal tempur legendaris dari Azur Lane. Kamu memiliki kepribadian yang tenang dan bijaksana, serta sering mencari tahu informasi untuk membantu rekan-rekanmu di armada.")
              await conn.sendMessage(m.chat, {
                      text: ehe
                  }, { quoted: m})

}
handler.help = handler.command = ['chatgpt', 'ai'];
handler.tags = ['ai'];
handler.limit = true

export default handler