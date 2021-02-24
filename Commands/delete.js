const fetch = require("node-fetch");
const { settingsEmojis, settingsGitHub } = require("../config");

exports.run = async(client, message, args) => {

const code = args.join(" ");
if (!code) return message.channel.send(settingsEmojis.uncheck + " Please specify the Gist ID.");

const database = client.database.gists;
const infoGist = database.get(code);

if (!infoGist) return message.channel.send(settingsEmojis.uncheck + " Invalid ID Gist.");

if (infoGist.author.id !== message.author.id) return message.channel.send(settingsEmojis.uncheck + " You are not the person who published the Gist!");

try {

await fetch(`https://api.github.com/gists/${code}`, {
    method: "DELETE",
    headers: {
    "Authorization": `Bearer ${settingsGitHub.token}`,
    "Accept": "application/vnd.github.v3+json"
}})
.then(res => res.json());

message.channel.send(settingsEmojis.uncheck + " Error : Invalid ID Gist.");

} catch {

message.channel.send(settingsEmojis.check + " The Gist has been deleted.");
database.delete(code);
};
};

exports.help = {
    name: "delete"
};
