
import * as cheerio from 'cheerio';
import axios from "axios";
import FormData from "form-data";

let handler = async(m, {conn}) => {
    
 // Panggil fungsi untuk mengambil data

async function fetchLatestAnime() {
const samehadaku = new Samehadaku()
    try {
        const result = await samehadaku.latest();

        let message = `Total Anime Found: ${result.total}\n\n`;

        for (let i = 0; i < result.anime.length; i++) {
            const anime = result.anime[i];
            message += `Anime #${i + 1}:\n`;
            message += `Title: ${anime.title}\n`;
            message += `Posted By: ${anime.postedBy}\n`;
            message += `Episode: ${anime.episode}\n`;
            message += `Release Date: ${anime.release}\n`;
            message += `Link: ${anime.link}\n\n`;
        }

        // Mengirim pesan ke chat
        await conn.sendMessage(m.chat,{text: message});

    } catch (error) {
        // Kirim pesan kesalahan jika terjadi masalah
        await m.reply("Error fetching latest anime: " + error.message,);
    }
}

// Panggil fungsi untuk mengambil data dan mengirimnya
fetchLatestAnime();
}
handler.help = ['samehadaku']
handler.tags = ['anime']
handler.command = /^((animeterbaru|samehadaku)(downloder|latest)?)$/i


handler.limit = true

export default handler



/**
 * Scraped By Kaviaann
 * Protected By MIT LICENSE
 * Whoever caught removing wm will be sued
 * @description Any Request? Contact me : vielynian@gmail.com
 * @author Kaviaann 2024
 * @copyright https://whatsapp.com/channel/0029Vac0YNgAjPXNKPXCvE2e
 */
export class Samehadaku {
    BASE_URL;
    constructor() {
        this.BASE_URL = "https://samehadaku.email";
    }
    async search(query) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(this.BASE_URL +
                    "/?" +
                    new URLSearchParams({
                        s: query,
                    }));
                if (res.statusText !== "OK")
                    return reject("Fail Fetching");
                const $ = cheerio.load(res.data);
                if ($("main#main").find(".notfound").length)
                    return reject("Query Not Found");
                const data = [];
                $("main#main")
                    .find("article.animpost")
                    .each((i, el) => {
                    data.push({
                        title: $(el).find("img").attr("title")?.trim(),
                        id: $(el).attr("id")?.split("-")[1] || "",
                        thumbnail: $(el).find("img").attr("src") || "",
                        description: $(el).find("div.ttls").text().trim(),
                        genre: $(el)
                            .find("div.genres > .mta > a")
                            .map((i, el) => {
                            return $(el).text().trim();
                        })
                            .get(),
                        type: $(el)
                            .find("div.type")
                            .map((i, el) => {
                            return $(el).text().trim();
                        })
                            .get(),
                        star: $(el).find("div.score").text().trim(),
                        views: $(el).find("div.metadata > span").eq(2).text().trim(),
                        link: $(el).find("a").attr("href") || "",
                    });
                });
                resolve(data);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    async latest() {
        return new Promise(async (resolve, reject) => {
            try {
                const url = "https://samehadaku.email/anime-terbaru/";
                const html = await axios.get(url, {
                    headers: {
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
                    },
                });
                if (html.statusText !== "OK")
                    return reject("Website Down");
                const $ = cheerio.load(await html.data);
                const ul = $("div.post-show > ul").children("li");
                const data = {
                    total: 0,
                    anime: [],
                };
                for (let el of ul) {
                    data.anime.push({
                        title: $(el)
                            .find("h2.entry-title")
                            .text()
                            .trim()
                            .split(" Episode")[0],
                        thumbnail: $(el).find("div.thumb > a > img").attr("src") || "",
                        postedBy: $(el)
                            .find('span[itemprop="author"] > author')
                            .text()
                            .trim(),
                        episode: $(el).find("span").eq(0).find("author").text().trim(),
                        release: $(el)
                            .find('span[itemprop="author"]')
                            .next()
                            .contents()
                            .eq(3)
                            .text()
                            .split(": ")[1]
                            .trim(),
                        link: $(el).find("a").attr("href") || "",
                    });
                }
                data.total = data.anime.length;
                resolve(data);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    async release() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = {
                    sunday: [],
                    monday: [],
                    tuesday: [],
                    wednesday: [],
                    thursday: [],
                    friday: [],
                    saturday: [],
                };
                for await (let day of Object.keys(data)) {
                    const res = await axios
                        .get(this.BASE_URL +
                        "/wp-json/custom/v1/all-schedule?" +
                        new URLSearchParams({
                            perpage: "20",
                            day,
                            type: "schtml",
                        }))
                        .then((v) => v.data);
                    data[day] = res;
                }
                resolve(data);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    async detail(url) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!url.match(/samehadaku\.\w+\/anime/gi))
                    return reject("Invalid URL");
                const res = await axios.get(url);
                if (res.statusText !== "OK")
                    return reject("Fail Fetching");
                const $ = cheerio.load(res.data);
                const data = {
                    title: $('.infoanime > h1[itemprop="name"]')
                        .text()
                        .trim()
                        .replace("Nonton Anime ", ""),
                    thumbnail: $(".infoanime > .thumb > img").attr("src") || "",
                    published: new Date($(".anim-senct").find("time").attr("datetime") || ""),
                    trailer: $(".trailer-anime").find("iframe").attr("src") || "",
                    rating: $(".infoanime").find('span[itemprop="ratingValue"]').text().trim() +
                        "/" +
                        $(".infoanime")
                            .find('i.hidden[itemprop="ratingCount"]')
                            .attr("content"),
                    description: $(".infox > .desc").text().trim(),
                    genre: $(".infox > .genre-info > a")
                        .map((i, e) => $(e).text().trim())
                        .get(),
                    detail: $("h3.anim-detail")
                        .next()
                        .find("span")
                        .map((i, el) => {
                        return {
                            name: $(el).find("b").text().trim(),
                            data: `${$(el).text().trim()}`
                                .replace($(el).find("b").text().trim() + " ", "")
                                .trim(),
                        };
                    })
                        .get(),
                    batch: $(".listbatch").find("a").attr("href") || null,
                    episode: $(".lstepsiode > ul > li")
                        .map((i, el) => {
                        return {
                            title: $(el).find(".lchx > a").text().trim(),
                            date: $(el).find(".date").text().trim(),
                            link: $(el).find(".eps > a").attr("href") || "",
                        };
                    })
                        .get(),
                };
                resolve(data);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    async download(url) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!/samehadaku\.\w+\/[\w-]+episode/gi.test(url))
                    return reject("Invalid URL!");
                const html = await axios.get(url, {
                    headers: {
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
                    },
                });
                if (html.statusText !== "OK")
                    return reject("Error Fetching");
                const $ = cheerio.load(html.data);
                const data = {
                    title: $('h1[itemprop="name"]').text().trim(),
                    link: url,
                    downloads: [],
                };
                data.downloads = await Promise.all($("div#server > ul > li").map(async (i, el) => {
                    const v = {
                        name: $(el).find("span").text().trim(),
                        post: $(el).find("div").attr("data-post") || "",
                        nume: $(el).find("div").attr("data-nume") || "",
                        type: $(el).find("div").attr("data-type") || "",
                        link: "",
                    };
                    const A = new FormData();
                    A.append("action", "player_ajax");
                    A.append("post", v.post);
                    A.append("nume", v.nume);
                    A.append("type", v.type);
                    v.link =
                        (await axios
                            .post("https://samehadaku.email/wp-admin/admin-ajax.php", A, {
                            headers: {
                                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
                                origin: "https://samehadaku.email",
                            },
                        })
                            .then((v) => v.data)
                            .then((v) => cheerio.load(v)("iframe").attr("src"))) || "";
                    return v;
                }));
                return resolve(data);
            }
            catch (e) {
                reject(e);
            }
        });
    }
}

