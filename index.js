const Discord = require("discord.js")
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({
  partials: [
    Partials.Message, // for message
    Partials.Channel, // for text channel
    Partials.GuildMember, // for guild member
    Partials.Reaction, // for message reaction
  ],
  intents: [
    GatewayIntentBits.Guilds, // for guild related things
    GatewayIntentBits.GuildInvites, // for guild invite managing
    GatewayIntentBits.GuildMessages, // for guild messages things
    GatewayIntentBits.GuildMessageReactions, // for message reactions things
    GatewayIntentBits.MessageContent, // enable if you need message content things
  ],
});
const fs = require("fs");
const config = require("./config.json");
client.config = config;

// Initialise discord giveaways
const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./storage/giveaways.json",
  default: {
    botsCanWin: false,
    embedColor: "#e74c3c",
    reaction: "<:14__2_removebgpreview1:1057403901168590929>",
    lastChance: {
      enabled: true,
      content: `<:31removebgpreview:1056979299447607356> **Come on guys last chance to enter** <:31removebgpreview:1056979299447607356>`,
      threshold: 5000,
      embedColor: '#e74c3c'
    }
  }
});
//Coded by ZeroSync on yt



client.on('message', async (message) => {

  if(message.content.includes(client.user.id)) {

    const embed = new MessageEmbed()

    .setTitle(`Huh? I was Pinged?!`)

    .setDescription(`Hello, my prefix is \`${prefix}\` Use \`${prefix}help\` or \`${prefix}help\` to see my commands!`)

    .setColor(`#0x2f3136`)

    .setFooter(`This bot was made by GalileoBot Team`)

  return message.channel.send(embed);

}

})


client.on('messageCreate', message => {     if (message.mentions.has(client.user)) {         message.channel.send('**To get started :** ```/help | g!help``` **To invite me :**```/invite```');     } });
                                                                                                         
                                                                                             

/* Load all events (discord based) */


fs.readdir("./events/discord", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/discord/${file}`);
    let eventName = file.split(".")[0];
    console.log(`[Event]   ✅  Loaded: ${eventName}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/discord/${file}`)];
  });
});

/* Load all events (giveaways based) */


fs.readdir("./events/giveaways", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/giveaways/${file}`);
    let eventName = file.split(".")[0];
    console.log(`[Event]   🎉 Loaded: ${eventName}`);
    client.giveawaysManager.on(eventName, (...file) => event.execute(...file, client)), delete require.cache[require.resolve(`./events/giveaways/${file}`)];
  })
})

// Let commands be a new collection ( message commands )
client.commands = new Discord.Collection();
/* Load all commands */
fs.readdir("./commands/", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, {
      name: commandName,
      ...props
    });
    console.log(`[Command] ✅  Loaded: ${commandName}`);
  });
});

// let interactions be a new collection ( slash commands  )
client.interactions = new Discord.Collection();
// creating an empty array for registering slash commands
client.register_arr = []
/* Load all slash commands */
fs.readdir("./slash/", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./slash/${file}`);
    let commandName = file.split(".")[0];
    client.interactions.set(commandName, {
      name: commandName,
      ...props
    });
    client.register_arr.push(props)
  });
});


// Login through the client
client.login(config.token);
