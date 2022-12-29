const Discord = require('discord.js');
const config = require('../config.json');
module.exports.run = async (client, message, args) => {
  let m = await message.reply("Sending request to websocket...")
  let pong = new Discord.EmbedBuilder()
    .setAuthor({
      name: `Pong!!!`, 
      iconURL: message.author.displayAvatarURL()
    })
    .setTitle("My Ping")
    .setColor('#e74c3c')	
    .setTimestamp()
                 
    .addFields([
   { name: '``• My Speed``', value: `\`${Date.now() - message.createdTimestamp}ms\`` },
   { name: '``• Time Respond``', value: `\`${Math.round(client.ws.ping)}ms\`` },
    ])
    .setFooter({
      text: `Requested by ${message.author.tag}`, 
      iconURL: message.author.displayAvatarURL()
    });

     m.delete()
  message.reply({ content: " ", embeds: [pong] })
}
