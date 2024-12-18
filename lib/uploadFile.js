import fs from 'fs'
import axios from 'axios'
import * as cheerio from 'cheerio';
import fetch from 'node-fetch'

import FormData from 'form-data'
import { fileTypeFromBuffer } from 'file-type'

export default async (conn, buffer, type) => {
	let { filename } = await (await conn.getFile(buffer, true));
	let form = new FormData
	if (/^tele(graph)?$/i.test(type)) {
		form.append("reqtype", "fileupload")
		form.append('fileToUpload', fs.createReadStream(filename))

        // Kirim permintaan POST
        const response = await fetch("https://catbox.moe/user/api.php", {
            method: "POST",
            body: form,
        });

        // Debugging: Cek status respons
        console.log("Response status:", response.status, response.statusText);

        // Ambil teks respons
        const responseText = await response.text();
        console.log(responseText);
        return responseText;
	} else if (/^uguu$/i.test(type)) {
		form.append('files[]', fs.createReadStream(filename))
		let data = await req('https://uguu.se/upload.php', form, { headers: form.getHeaders() })
		return data.files[0].url
	} else if (/^anon(files)?$/i.test(type)) {
		form.append('file', fs.createReadStream(filename))
		let data = await req('https://api.anonfiles.com/upload', form, { headers: form.getHeaders() })
		if (!data.status) throw data.error.message
		let result = await anonget(data.data.file.url.short)
		return result
	} else if (/^zippy(share)?$/i.test(type)) {
		let url = await home()
		filename = filename.split('/tmp/')[1]
		form.append('name', filename)
		form.append('notprivate', 'true')
		form.append('zipname', '')
		form.append('ziphash', '')
		form.append('embPlayerValues', 'false')
		form.append('file', buffer, filename)
		let data = await req(url, form, { headers: form.getHeaders() })
		return data.replace(/\n/g, '').replace(new RegExp(`.+(https?:\/\/.+/v/[a-zA-Z0-9]+\/file\.html).+`, 'gi'), '$1')
	} else {
		form.append('files[]', fs.createReadStream(filename))
		let data = await req('https://up1.fileditch.com/upload.php', form, { headers: form.getHeaders() })
		return data.files[0].url
	}
}

async function home() {
	let { data } = await axios.get('https://www.zippyshare.com')
	return 'https://' + data.replace(/\n/g, '').replace(/.+\/\/(www[0-9]+\.zippyshare\.com\/upload).+/g, '$1')
}

async function req(url, body, opt = {}) {
	let { data } = await axios(url, {
		method: 'post', data: body,
		headers: opt.headers,
		maxContentLength: Infinity,
		maxBodyLength: Infinity
	})
	return data
}

async function anonget(link) {
    let result = axios.get(link).then(v => {
        let $ = cheerio.load(v.data)
        let img = $("img#download-preview-image").attr('src')
        return img
    })
    return result
}
