import Replicate from "replicate";

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN || "r8_Sl7tsqHCfFvFkTvtCDPyKRIaSG3nLIc2uQG8U";

async function handler(m, { conn, usedPrefix, command, text }) {
  const replicate = new Replicate({
    auth: REPLICATE_API_TOKEN,
  });

  const model = "yodayo-ai/kivotos-xl-2.0";
  const input = {
    prompt: text,
  };

  const output = await replicate.run(model, { input });

  if (output && Array.isArray(output) && output.every(item => typeof item === "string" && /^https?:\/\//i.test(item))) {
    // Format output sesuai yang diharapkan
    conn.sendFile(m.chat, output.join('\n'), '', 'Nih Kak Hasilnya!', m);
  } else {
    // Menangani kasus ketika format output tidak sesuai yang diharapkan
    conn.reply(m.chat, 'Format output yang tidak sesuai yang diharapkan', m);
  }
}

handler.help = ['diff'];
handler.tags = ['maker'];
handler.command = ['difv','diffuison'];
handler.premium = false;
handler.limit = true;

export default handler;

