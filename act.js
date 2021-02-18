const { Client, Collection } = require("discord.js");
const fetch = require("node-fetch");
const { settingsBot } = require("./config");
const client = new Client({ DisableMentionType: "all" });
client.commands = new Collection();
const { readdir } = require("fs");
const version = 1;

(async () => {
  
try {
  
const server = await fetch("https://raw.githubusercontent.com/cy-polo/AvertCheckToken/main/server.json")
.then(res => res.json());
if (server.version > version) console.log("A new update is available!\n\nDownload the new version here: https://github.com/cy-polo/AvertCheckToken");
process.exit(1);
  
} catch {
  console.log("This project is probably finished, or an error has occurred.");
}
  
})()

readdir("./Commands/", (error, f) => {
  if (error) {
    return console.error(error);
  }
  let commandes = f.filter(f => f.split(".").pop() === "js");
  if (commandes.length <= 0) {
    return console.log("No command found!");
  }

  commandes.forEach(f => {
    let commande = require(`./Commands/${f}`);
    console.log(`${f} command loaded!`);
    client.commands.set(commande.help.name, commande);
  });
});

readdir("./Events/", (error, f) => {
  if (error) {
    return console.error(error);
  }
  console.log(`${f.length} events loaded!`);

  f.forEach(f => {
    let events = require(`./Events/${f}`);
    let event = f.split(".")[0];
    client.on(event, events.bind(null, client));
  });
});

client.login(settingsBot.token);