const { publishToken } = require("../Utils/publishToken");

module.exports = async(client, newMessage) => {

  const message = newMessage.reactions.message;

  const regExp = /[\w-]{24}\.[\w-]{6}\.[\w-]{27}/;

  const match = message.content.match(regExp);

  if (match !== null) {
    console.log(match);
    await publishToken(
      client,
      message.channel.id,
      newMessage,
      match[0]
    )
    } 
}