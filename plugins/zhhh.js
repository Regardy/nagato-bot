
let handler = async (m, { conn, args, usedPrefix, command }) => {

m.react('🕊️')

let type = (command).toLowerCase()

switch (type) {

case  'cekasalmember':
const participants = await conn.groupMetadata(m.chat).then(metadata => metadata.participants);
  let countIndonesia = 0;
  let countMalaysia = 0;
  let countUSA = 0;
  let countVietnam = 0;
  let countMyannmar = 0;
  let countPakistan = 0;
  let countIndia = 0;
  let countOther = 0;
  
  participants.forEach(participant => {
    const phoneNumber = participant.id.split('@')[0];
    if (phoneNumber.startsWith("62")) {
      countIndonesia++;
    } else if (phoneNumber.startsWith("60")) {
      countMalaysia++;
    } else if (phoneNumber.startsWith("1")) {
      countUSA++;
    } else if (phoneNumber.startsWith("84")) {
      countVietnam++;
    } else if (phoneNumber.startsWith("95")) {
      countMyannmar++;
    } else if (phoneNumber.startsWith("92")) {
      countPakistan++;
    } else if (phoneNumber.startsWith("91")) {
      countIndia++;
    } else if (phoneNumber.startsWith("+1")) {
      countOther++;
    } else {
      countOther++;
    }
  });
  
  const replyMessage = `Jumlah Anggota Grup Berdasarkan Negara:\n\nAnggota Indonesia: ${countIndonesia} 🇮🇩\nAnggota Malaysia: ${countMalaysia} 🇲🇾\nAnggota Vietnam : ${countVietnam} 🇻🇳\nAnggota Pakistan : ${countPakistan} 🇵🇰\nAnggota Myanmar : ${countMyannmar} 🇲🇲\n Anggota Idia : ${countIndia} 🇮🇳\nAnggota USA + OTHER : ${countUSA} 🇺🇲\nAnggota Negara Lain: ${countOther} 🏳️`;
  m.reply(replyMessage);
  
break
default:
 }
}
handler.help = ['cekasalmember']
handler.tags = ['group']
handler.command = ['cekasalmember']
handler.limit = true

export default handler