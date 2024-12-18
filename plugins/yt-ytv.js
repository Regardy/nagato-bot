
import ytdl from '@distube/ytdl-core';
import {
    exec
} from 'child_process';
import fs from 'fs';
import path from 'path';

const downloadVideoAndAudio = async (url, selectedResolution) => {

const cookies = [
    { name: "GPS", value: "1" },
    { name: "YSC", value: "MakslXgOJJc" },
    { name: "VISITOR_INFO1_LIVE", value: "gRQgkz-pZf0" },
    { name: "VISITOR_PRIVACY_METADATA", value: "CgJJRBIEGgAgSg%3D%3D" },
    { name: "PREF", value: "f4=4000000&f6=40000000&tz=Asia.Bangkok" },
    { name: "SID", value: "g.a000rQh33Rq3FEybSYeir-vSuPU8zl8UjzXg9eop_83QR7DPAGX0p2ByvMNwnlTSXOjkOW5LfwACgYKAdoSARcSFQHGX2MiHpB7wqS91tHhCb7ufZ-VdRoVAUF8yKrApjIyDHbbvM4eLQT___YA0076" },
    { name: "__Secure-1PSIDTS", value: "sidts-CjEB7wV3seOmTN-VQHk11FL1bFgqn_cFJP_c7GIldxAtv3PGbQnUGNFB64I99D_8fKe4EAA" },
    { name: "__Secure-3PSIDTS", value: "sidts-CjEB7wV3seOmTN-VQHk11FL1bFgqn_cFJP_c7GIldxAtv3PGbQnUGNFB64I99D_8fKe4EAA" },
    { name: "__Secure-1PSID", value: "g.a000rQh33Rq3FEybSYeir-vSuPU8zl8UjzXg9eop_83QR7DPAGX0CWzu5prnyffUgREEvxZnnQACgYKAVsSARcSFQHGX2MihWIasvTYWRMXqroa54XWOBoVAUF8yKp71vdm0ogAXphEagFZhQbd0076" },
    { name: "__Secure-3PSID", value: "g.a000rQh33Rq3FEybSYeir-vSuPU8zl8UjzXg9eop_83QR7DPAGX01KQ07pChpQoZy7wh5JG4ugACgYKAe4SARcSFQHGX2MiNSfP2an0fvRyiG7HUEhShRoVAUF8yKrnsy8AyM2_bnByg0tycI3w0076" },
    { name: "HSID", value: "ACvxEH6BHHKWU0rAv" },
    { name: "SSID", value: "A9Dzul8wsQBmhXToG" },
    { name: "APISID", value: "Uovj3wk45Uxzzh44/Aj3wW7c-Bo0Ye2Wki" },
    { name: "SAPISID", value: "Mokcv8gNsyTJayOU/A0f1BuldIZueaIAff" },
    { name: "__Secure-1PAPISID", value: "Mokcv8gNsyTJayOU/A0f1BuldIZueaIAff" },
    { name: "__Secure-3PAPISID", value: "Mokcv8gNsyTJayOU/A0f1BuldIZueaIAff" },
    { name: "LOGIN_INFO", value: "AFmmF2swRQIhAPSKIghlFUvm6kMftyVaqqOF-9fKhDfLPlA2CaFF0u6IAiB_gVvw0MQjWxUF9hXTji_uavcyJoy_i-j8BMjsfQB7OA:QUQ3MjNmeXNZR1BuNU94RHpreklrVGRHNFJFSnFuZTVmUEhBSVdhQm1oMTVEWGZxWEZfRy1RMDV4aTd4dF83SFZYWDBIakt5VlBPejhnblZXa0l0ZW1DTnhEVXBsUEUyVVBoSkZIc3Vqa2FWVzQyQXZtTlY3cTVzT1N3bTFvSGh0ZlhXbWNvdkZ4RENCOUFyZUhzM1F0S3Z2a0FSQzBxMGpR" },
    { name: "SIDCC", value: "AKEyXzV0XfvH8yl3h77P5oIu4rJV6SK6c5WbxtHRtm8GhVJGGtax3lI3qe0pFN6oGpA2N0hf" },
    { name: "__Secure-1PSIDCC", value: "AKEyXzUWaJfvfm37mJDxsKF9xag5ZQZ0i-WGOVvdELiJYCx_LnCAyTpv6tfTzIBro9Dqzr0p" },
    { name: "__Secure-3PSIDCC", value: "AKEyXzUqDj8-8iy3UgFC27fPxIzPKI8vO4eP6vhJLxp8FBeatA5DO2R-t4uwaqN1UnMnMkZN" },
    { name: "ST-3opvp5", value: "session_logininfo=AFmmF2swRQIhAPSKIghlFUvm6kMftyVaqqOF-9fKhDfLPlA2CaFF0u6IAiB_gVvw0MQjWxUF9hXTji_uavcyJoy_i-j8BMjsfQB7OA%3AQUQ3MjNmeXNZR1BuNU94RHpreklrVGRHNFJFSnFuZTVmUEhBSVdhQm1oMTVEWGZxWEZfRy1RMDV4aTd4dF83SFZYWDBIakt5VlBPejhnblZXa0l0ZW1DTnhEVXBsUEUyVVBoSkZIc3Vqa2FWVzQyQXZtTlY3cTVzT1N3bTFvSGh0ZlhXbWNvdkZ4RENCOUFyZUhzM1F0S3Z2a0FSQzBxMGpR" }
  ];
  
  const agentOptions = {
    pipelining: 5,
    maxRedirections: 0,
  };
  
  // agent should be created once if you don't want to change your cookie
  const agent = ytdl.createAgent(cookies, agentOptions);
  
    

    const info = await ytdl.getInfo(url, { agent });
    let videoFormat;

    if (selectedResolution) {
        videoFormat = info.formats.find(f => f.height === selectedResolution && f.container === 'mp4');
    }

    if (!videoFormat) {
        videoFormat = info.formats.find(f => f.height === 720 && f.container === 'mp4');
    }

    if (!videoFormat) {
        videoFormat = info.formats.filter(f => f.container === 'mp4').sort((a, b) => b.height - a.height)[0];
    }

    const audioFormat = ytdl.chooseFormat(info.formats, {
        quality: 'highestaudio',
        filter: 'audioonly',
        agent: agent,
    });

    if (!videoFormat) {
        throw new Error('Tidak ditemukan format video yang sesuai.');
    }
    if (!audioFormat) {
        throw new Error('Tidak ditemukan format audio.');
    }

    const videoPath = path.join('/tmp', `video_${Date.now()}.mp4`);
    const audioPath = path.join('/tmp', `audio_${Date.now()}.mp4`);
    const outputPath = path.join('/tmp', `output_${Date.now()}.mp4`);

    await new Promise((resolve, reject) => {
        ytdl(url, {
                format: videoFormat,
                agent: agent,
            })
            .pipe(fs.createWriteStream(videoPath))
            .on('finish', resolve)
            .on('error', reject);
    });

    await new Promise((resolve, reject) => {
        ytdl(url, {
                format: audioFormat,
                agent: agent,
            })
            .pipe(fs.createWriteStream(audioPath))
            .on('finish', resolve)
            .on('error', reject);
    });

    await new Promise((resolve, reject) => {
        exec(`ffmpeg -i ${videoPath} -i ${audioPath} -c:v copy -c:a aac ${outputPath}`, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(`ffmpeg error: ${error.message}`));
                return;
            }
            resolve();
        });
    });

    await fs.promises.unlink(videoPath);
    await fs.promises.unlink(audioPath);

    const {
        videoDetails
    } = info;
    const resolutions = info.formats
        .filter(f => f.hasVideo && f.height)
        .map(f => f.height)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort((a, b) => b - a);

    const duration = new Date(videoDetails.lengthSeconds * 1000).toISOString().substr(11, 8);

    return {
        outputPath,
        videoDetails,
        resolution: videoFormat.height,
        resolutions,
        duration
    };
};

let handler = async (m, {
    conn,
    text
}) => {
    const [url, selectedResolution] = text.trim().split(' ');
    if (!ytdl.validateURL(url)) {
        return conn.reply(m.chat, 'URL YouTube tidak valid. Pastikan URL diawali dengan http:// atau https://', m);
    }

    try {
        const resolution = selectedResolution ? parseInt(selectedResolution, 10) : null;
        if (resolution && isNaN(resolution)) {
            return conn.reply(m.chat, 'Resolusi tidak valid. Harap masukkan resolusi dalam angka, misalnya: 720 atau 360.', m);
        }

        const {
            outputPath,
            videoDetails,
            resolution: videoResolution,
            resolutions,
            duration
        } = await downloadVideoAndAudio(url, resolution);
        const fileSize = calculateFileSize(outputPath);

        if (fileSize > 5 * 1024 * 1024 * 1024) { // 5 GB
            return conn.reply(m.chat, 'File terlalu besar untuk dikirim. Maksimum ukuran file adalah 5 GB.', m);
        }

        if (fileSize > 1.5 * 1024 * 1024 * 1024) { // 1.5 GB
            return conn.reply(m.chat, 'File melebihi batas 1.5 GB.', m);
        }

        if (fileSize <= 100 * 1024 * 1024) { // 100 MB
            await conn.sendMessage(m.chat, {
                video: {
                    url: outputPath
                },
                mimetype: 'video/mp4',
                fileName: `${videoDetails.title}.mp4`,
                caption: `YTMP4 DOWNLOADER resolusi ${videoResolution}p\n\n*Judul:* ${videoDetails.title}\n*Deskripsi:* ${videoDetails.description}\n*Nama Pengupload:* ${videoDetails.author.name}\n*Jumlah Views:* ${videoDetails.viewCount}\n*Durasi:* ${duration}\n*Resolusi yang Tersedia:* ${resolutions.join(', ')}p`
            }, {
                quoted: m
            });
        } else {
            await conn.sendMessage(m.chat, {
                document: {
                    url: outputPath
                },
                mimetype: 'video/mp4',
                fileName: `${videoDetails.title}.mp4`,
                caption: `YTMP4 DOWNLOADER resolusi ${videoResolution}p\n\n*Judul:* ${videoDetails.title}\n*Deskripsi:* ${videoDetails.description}\n*Nama Pengupload:* ${videoDetails.author.name}\n*Jumlah Views:* ${videoDetails.viewCount}\n*Durasi:* ${duration}\n*Resolusi yang Tersedia:* ${resolutions.join(', ')}p`
            }, {
                quoted: m
            });
        }

        await fs.promises.unlink(outputPath);

    } catch (e) {
        console.error('Error downloading video:', e);
        conn.reply(m.chat, `Terjadi kesalahan saat mengunduh video: ${e.message}`, m);
    }
};

handler.help = ['ytmp4'];
handler.tags = ['downloader'];
handler.command = /^(ytmp4|ytv|ytvideo)$/i;
handler.limit = true;

export default handler;

function calculateFileSize(filePath) {
    const stats = fs.statSync(filePath);
    return stats.size;
}