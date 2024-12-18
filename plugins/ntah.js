let handler = (m) => m;
handler.before = async (m, { conn, text, usedPrefix, command, chatUpdate }) => {
  if (m.mtype === "interactiveResponseMessage" && m.quoted.fromMe)
    conn.appendTextMessage(
      m,
      JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id,
      chatUpdate,
    );
  if (m.mtype === "templateButtonReplyMessage" && m.quoted.fromMe)
    conn.appendTextMessage(m, m.msg.selectedId, chatUpdate);
};
export default handler
    async function appenTextMessage(text, chatUpdate) {
        let messages = await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
            userJid: conn.user.id,
            quoted: m.quoted && m.quoted.fakeObj
        })
        messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id)
        messages.key.id = m.key.id
        messages.pushName = m.pushName
        if (m.isGroup) messages.participant = m.sender
        let msg = {
            ...chatUpdate,
            messages: [proto.WebMessageInfo.fromObject(messages)],
            type: 'append'
        }
        conn.ev.emit('messages.upsert', msg)
    }