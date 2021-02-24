const { Client, Collection } = require("discord.js");
const { readdir } = require("fs");
const fetch = require("node-fetch");
const Enmap = require("enmap");
const { settingsGitHub, settingsBot } = require("./config");
const client = new Client({ DisableMentionType: "all" });

client.database = { };

client.database.servers = new Enmap({ name: "servers" });
client.database.gists = new Enmap({ name: "gists" });

client.commands = new Collection();

(async() => {
  const user = await fetch("https://api.github.com/user", {
    headers: {
      "Authorization": `Bearer ${settingsGitHub.token}`,
      "Accept": "application/vnd.github.v3+json"
    } 
  })
  .then(res => res.json());

  if (user.message === "Bad credentials"){
    console.log("Error : Invalid Gist Token!\nGet a token here : https://github.com/settings/tokens");
    process.exit(1);
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