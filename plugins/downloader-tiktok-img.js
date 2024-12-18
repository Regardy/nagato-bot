/**
 * SCRAPED BY KAVIAANN
 * FORBIDDEN TO SELL AND DELETE MY WM
 */
import axios from 'axios'
import * as cheerio from 'cheerio';

import fetch from 'node-fetch'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

let handler = async(m, { conn, text, args, command, usedPrefix}) => {

// Mendapatkan path direktori dari file saat ini



}
handler.help = ['ttimg <url>']
handler.tags = ['downloader']
handler.command = /^(ttimg|tiktokimg)$/i
handler.register = true
handler.limit = true

export default handler

const axios = require ('axios');
const cheerio = require('cheerio');

async function ttslide(url) {
    try {
        const res = await axios({
            method: 'POST',
            url: 'https://tikvideo.app/api/ajaxSearch',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
            },
            data: {
                q: url,
                "lang": "id"
            }
        });

        let result = [];
        if (res.data.status === 'ok') {
        
            let $ = cheerio.load(res.data.data);
            $('img').each((_i, element) => {
            result.push({
                gambar: $(element).attr('src')
                if (src && !src.includes('.webp')) 
                })
            });
        }
        return result.length > 0 ? result : null;
    } catch (e) {
        console.error(e);
        return null;
    }
}
return ttslide('https://vt.tiktok.com/ZSYEs2ApC/')
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
} 