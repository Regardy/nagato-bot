import fetch from 'node-fetch';
import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type'

/**
 * Upload image to telegra.ph
 * Supported mimetype:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`s
 * @param {Buffer} buffer Image Buffer
 * @return {Promise<string>}
 */
export default async buffer => {
  const { ext, mime } = await fileTypeFromBuffer(buffer)
  let form = new FormData()
  const blob = new Blob([buffer.toArrayBuffer()], { type: mime })
	form.append('fileToUpload', blob, `file.${ext}`)
  form.append("userhash", "44a088f38508fa7584fd6c1f7")
  form.append("reqtype", "fileupload")
  const res = await fetch("https://catbox.moe/user/api.php", {
            method: "POST",
            body: form,
        });

        const data = await res.text();
        return data;
}

