const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setLabel(`Invite ${client.user.username}`)
        .setStyle(ButtonStyle.Link)
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`),
        new ButtonBuilder()
        .setLabel('Support Server')
        .setStyle(ButtonStyle.Link)
        .setURL("https://discord.gg/galileo"),
    )
    let invite = new EmbedBuilder()
     .setAuthor({ 
          name: `Invite ${client.user.username}`, 
          iconURL: client.user.displayAvatarURL() 
     })  
    .setTitle("Invite & Support Link!")
    .setDescription(`Thank you for inviting ${client.user} to your server today i hope you enjoy with Galileo features!`)
    .setColor('#e74c3c')
    .setTimestamp()
    .setFooter({
      text: `Requested by ${message.author.username} | ` + config.copyright, 
      iconURL: message.author.displayAvatarURL()
    });
    message.reply({ embeds: [invite], components: [row]});
}
