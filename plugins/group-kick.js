let handler = async (m, { conn, participants }) => {
  if (!m.mentionedJid[0] && !m.quoted) throw 'Tag someone in the group to remove them'
  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
  let owr = m.chat.split`-`[0]
  if (user.includes(owr)) return m.reply('I cant remove him because he/she created the group')
  conn.groupParticipantsUpdate(m.chat, [user], 'remove')
  m.reply(`Success kick *@${user.split('@')[0]}*`, null, { mentions: [user] })
}

handler.help = ['kick @user']
handler.tags = ['group']
handler.command = /^(kick)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler
