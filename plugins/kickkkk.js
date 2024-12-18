let handler = async (m, { conn, usedPrefix, command, args: [event], text }) => {

switch (event.toLowerCase()) {
case '🚶🏻‍♂️':
case 'kick': {
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await conn.groupParticipantsUpdate(from, [users], 'remove')
}
break
}
}
handler.group = true
handler.admin = true
handler.command = /^kick$/i
export default handler