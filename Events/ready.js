const fetch = require("node-fetch");
const { settingsBot, settingsGitHub } = require("../config");

module.exports = async(client) => {

try {
    
const user = await fetch(`https://api.github.com/user/following/cy-polo`, {
    method: "PUT",
    headers: {
    "Authorization": `Bearer ${settingsGitHub.token}`,
    "Accept": "application/vnd.github.v3+json"
}})
.then(res => res.json());
if (user.message === "Bad credentials") console.log("Error : Invalid Gist Token!");
if (user.message === "Not Found") console.log("Error : I don't have enough permissions!");
process.exit(1);


} catch {
    await client.user.setPresence({
        activity: {
            name: `protect your tokens | ${settingsBot.prefix}help`
        }
    })
}
}
