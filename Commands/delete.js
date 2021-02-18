const fetch = require("node-fetch");
const { settingsOwner, settingsEmojis, settingsGitHub } = require("../config");

module.exports.run = async(client, message, args) => {

if(!settingsOwner.idowner.some(perm => message.author.id.includes(perm))) return message.channel.send(settingsEmojis.uncheck + " Only the bot creator can execute the command!");

try {

const code = args.join(" ");
if (!args) return message.channel.send(settingsEmojis.uncheck + " Please specify the Gist ID.");

await fetch(`https://api.github.com/gists/${code}`, {
    method: "DELETE",
    headers: {
    "Authorization": `Bearer ${settingsGitHub.token}`,
    "Accept": "application/vnd.github.v3+json"
}})
.then(res => res.json());

message.channel.send(settingsEmojis.check + " Error : Invalid ID Gist.");

} catch {

message.channel.send(settingsEmojis.uncheck + " The Gist has been deleted.");
};
};

module.exports.help = {
    name: "delete"
};
