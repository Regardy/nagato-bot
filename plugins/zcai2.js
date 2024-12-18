import C from 'node-fetch';
import fs from 'fs';

let nicknameCharIdDict = {};
if (fs.existsSync("cai_nicknames.json")) {
  try {
    const fileData = fs.readFileSync("cai_nicknames.json", 'utf-8');
    nicknameCharIdDict = JSON.parse(fileData);
  } catch (q) {
    console.error("Error loading JSON file:", q);
  }
}
const nicknames = Object.keys(nicknameCharIdDict);

export async function before(m, {
  conn: i,
  isOwner: G,
  isAdmin: k,
  isROwner: r
}) {

  // Cek apakah pesan berisi teks
  if (m.text) {
    const M = m.text.split(" ");
    const Q = M[0];  // Ambil kata pertama dari pesan

    // Cek apakah kata pertama adalah nickname karakter yang ada
    if (nicknames.includes(Q)) {
      i.sendPresenceUpdate("composing", m.chat);
      const d = nicknameCharIdDict[Q];
      const u = M.slice(1).join(" ");  // Ambil sisa pesan setelah nickname
      try {
        
        const V = await C('https://apicai.vercel.app/api/cai?charid=' + d + "&message=" + encodeURIComponent(u));
        const L = await V.json();
        const U = L.reply;
        m.reply(U);
      } catch (H) {
        console.error("Error sending request:", H);
      }
    }
  }
}
