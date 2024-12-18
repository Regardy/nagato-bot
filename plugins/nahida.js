import axios from 'axios'

const handler = async (m, { conn, text,}) => {
 if (!text) throw `*• Example:* .nahida Sayang`;
INStts(text).then(async (res) => {
	if (!res) throw res
		await m.reply(JSON.stringify(res, null, 2))
  for (const item of res.ceker_babat_punya_ins.nahida) {
            // Send each file after loading is complete
            conn.sendFile(m.chat, item, '', ``, m);
            }
 });
}
 handler.help = ['nahida']
handler.tags = ['dl']
handler.command = /^(nahida)$/i



 


export default handler


// maksimal 100 kata
////SCRAPERS BY INS DEV                                            YG HAPUS TITIDNYA PECAH

const models = {
    miku: { voice_id: "67aee909-5d4b-11ee-a861-00163e2ac61b", voice_name: "Hatsune Miku" },
    nahida: { voice_id: "67ae0979-5d4b-11ee-a861-00163e2ac61b", voice_name: "Nahida (Exclusive)" },
    nami: { voice_id: "67ad95a0-5d4b-11ee-a861-00163e2ac61b", voice_name: "Nami" },
    ana: { voice_id: "f2ec72cc-110c-11ef-811c-00163e0255ec", voice_name: "Ana(Female)" },
    optimus_prime: { voice_id: "67ae0f40-5d4b-11ee-a861-00163e2ac61b", voice_name: "Optimus Prime" },
    goku: { voice_id: "67aed50c-5d4b-11ee-a861-00163e2ac61b", voice_name: "Goku" },
    taylor_swift: { voice_id: "67ae4751-5d4b-11ee-a861-00163e2ac61b", voice_name: "Taylor Swift" },
    elon_musk: { voice_id: "67ada61f-5d4b-11ee-a861-00163e2ac61b", voice_name: "Elon Musk" },
    mickey_mouse: { voice_id: "67ae7d37-5d4b-11ee-a861-00163e2ac61b", voice_name: "Mickey Mouse" },
    kendrick_lamar: { voice_id: "67add638-5d4b-11ee-a861-00163e2ac61b", voice_name: "Kendrick Lamar" },
    angela_adkinsh: { voice_id: "d23f2adb-5d1b-11ee-a861-00163e2ac61b", voice_name: "Angela Adkinsh" },
    eminem: { voice_id: "c82964b9-d093-11ee-bfb7-e86f38d7ec1a", voice_name: "Eminem" }
};

async function INStts(text) {
    function getInspepek() {
        return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    }

    const InsAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/602.3.12 (KHTML, like Gecko) Version/10.1.2 Safari/602.3.12",
        "Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36"
    ];
    const randomInsAgent = InsAgents[Math.floor(Math.random() * InsAgents.length)];

    const requests = Object.entries(models).map(async ([modelName, { voice_id, voice_name }]) => {
        const ngeloot = {
            raw_text: text,
            url: "https://filme.imyfone.com/text-to-speech/anime-text-to-speech/",
            product_id: "200054",
            convert_data: [
                {
                    voice_id,
                    speed: "1", // maksimal 100 wak normal 1
                    volume: "50", // maksimal 100 normal 50
                    text,
                    pos: 0
                }
            ]
        };

        const rekuesanu = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'X-Forwarded-For': getInspepek(),
                'User-Agent': randomInsAgent
            },
        };

        try {
            const useanu = await axios.post('https://voxbox-tts-api.imyfone.com/pc/v1/voice/tts', JSON.stringify(ngeloot), rekuesanu);
            const tobrut_milik_ins = useanu.data;
            const { channel_id, oss_url } = tobrut_milik_ins.data.convert_result[0];
            return { modelName, channel_id, oss_url, voice_id, voice_name };
        } catch (error) {
            console.error(`Yah, ada yang salah nih pas nyobain untuk model ${modelName}:`, error);
            return { modelName, error: `Waduh, kayaknya ada yang gak beres nih untuk model ${modelName}` };
        }
    });

    const ceker_babat_punya_ins = await Promise.all(requests);

    const formattedceker_babat_punya_ins = ceker_babat_punya_ins.map(({ modelName, channel_id, oss_url, voice_id, voice_name, error }) => {
        if (error) {
            return { modelName, error };
        }
        return {
            channel_id,
            voice_name,
            [modelName]: oss_url,
            voice_id
        };
    });

    return JSON.stringify({ Creator_sekrep: "INS", ceker_babat_punya_ins: formattedceker_babat_punya_ins }, null, 2);
}