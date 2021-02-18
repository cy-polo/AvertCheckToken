const { settingsOwner } = require("../config");

module.exports.run = async(client, message) => {
if(!settingsOwner.idowner.some(perm => message.author.id.includes(perm))) return message.channel.send(settingsEmojis.uncheck + " Only the bot creator can execute the command!");
  message.channel.send("⚙ Logout...").then(async() => {
    console.log("Down");
    await client.destroy();
    await process.exit();
  })

}
module.exports.help = {
    name: "logout"
};
