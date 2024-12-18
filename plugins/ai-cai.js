import fetch from 'node-fetch';
import { delay } from '@adiwajshing/baileys';
import { inspect } from 'util';
import 'fs';

export const sessions = new Map();

const handler = async (message, { conn, args }) => {
  let session = sessions.get(message.sender);
  let firstCai = global.DATABASE.data.users[message.sender].firstCai;
  let characterId = "https://katase-cai.hf.space/api/chara/info?characterId=" + chara;
  let isSending = true;

  while (isSending) {
    conn.sendPresenceUpdate('composing', message.chat);
    await delay(500);
    isSending = false;
  }

  const characterResponse = await fetch(characterId);
  const characterData = await characterResponse.json();
  console.log(characterData.result);

  async function fetchBuffer(url) {
    const response = await fetch(url);
    return await response.buffer();
  }

  const avatarUrl = "https://characterai.io/i/400/static/avatars/" + characterData.result.avatar_file_name;
  let avatarBuffer = await fetchBuffer(avatarUrl);

  if (firstCai && !args[0]) {
    throw "Hi, now you will start chatting with Character AI namely " + characterData.result.name + "\nDo you want to continue chatting with him? Send the command .cai <text> to start the dialog\n\nTo start chatting type .cai #start\n\nNote Your chat will be deleted automatically every 10 minutes, so retype .cai <text> without #start";
  }

  if (firstCai && args[0] === '#start') {
    conn.reply(message.chat, "CHARACTER INTRODUCTION\n\n\n" + characterData.result.description.replace(/\*/g, '_'), message, {
      'contextInfo': {
        'externalAdReply': {
          'mediaUrl': null,
          'mediaType': 1,
          'description': null,
          'title': characterData.result.name,
          'body': characterData.result.title,
          'previewType': 0,
          'thumbnail': avatarBuffer,
          'jpegThumbnail': avatarBuffer,
          'sourceUrl': ''
        }
      }
    });

    conn.reply(message.chat, characterData.result.greeting.replace(/\*/g, '') + "\n\n\n_Type .cai <your_answer> to respond", message, {
      'contextInfo': {
        'externalAdReply': {
          'mediaUrl': null,
          'mediaType': 1,
          'description': null,
          'title': characterData.result.name,
          'body': characterData.result.title,
          'previewType': 0,
          'thumbnail': avatarBuffer,
          'jpegThumbnail': avatarBuffer,
          'sourceUrl': ''
        }
      }
    });

    return;
  }

  if (!firstCai && !args[0]) {
    throw 'Text?';
  }

  let formattedText = args[0].replace(/[\n]/g, "\\n").replace(/\s/g, '+');
  let apiUrl = "https://katase-cai.hf.space/api?characterId=" + chara + "&text=" + formattedText;

  if (session && session.sId) {
    apiUrl = "https://katase-cai.hf.space/api?characterId=" + chara + "&text=" + formattedText + "&sessionId=" + session.sId;
  }

  const response = await fetch(apiUrl);
  const responseData = await response.json();

  if (!responseData.result || !responseData.result.text) {
    throw "Error: Response not received or text not found.";
  }

  const textToReply = typeof responseData.result.text === "string" ? responseData.result.text.trim() : inspect(responseData.result.text.trim());

  while (true) {
    conn.sendPresenceUpdate("composing", message.chat);
    if (responseData.result.text !== null) {
      if (args[0] === "cSkip" || args[0] === "cNext" || args[0] === "cMute") {
        apiUrl = "https://katase-cai.hf.space/api?characterId=" + chara + "&text=''&sessionId=" + session.sId;
      }

      let sentMessage = await message.reply(textToReply.trim().replace(/\*/g, '_'), message.chat, {
        'contextInfo': {
          'externalAdReply': {
            'mediaUrl': null,
            'mediaType': 1,
            'description': null,
            'title': characterData.result.name,
            'body': characterData.result.title,
            'previewType': 0,
            'thumbnail': avatarBuffer,
            'jpegThumbnail': avatarBuffer,
            'sourceUrl': ''
          }
        }
      });

      console.log("ID SEND: " + sentMessage.key.id);
      sessions.set(message.sender, {
        'id': '' + sentMessage.key.id,
        'sId': '' + responseData.result.sessionId
      });

      console.log(sessions);
      break;
    } else {
      await delay(1000);
    }
  }

  firstCai = false;
  await delay(600000); // 10 minutes
  sessions.delete(message.sender);
};

handler.before = async (message, { conn }) => {
  if (!sessions.has(message.sender)) {
    return;
  }
  
  if (!(message.quoted && message.quoted.fromMe)) {
    return;
  }

  let session = sessions.get(message.sender);
  if (message.quoted.id === session.id) {
    return handler(message, {
      conn,
      args: [message.text]
    });
  }
};

handler.help = ["cai"];
handler.tags = ['ai'];
handler.command = /^(cai)$/i;
handler.register = true;

export default handler;
