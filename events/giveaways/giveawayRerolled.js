const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({
        embeds: [new Discord.EmbedBuilder()
          .setTitle(`Omg 🥳 Let's goo!🎉 Bro You win`)
          .setColor("#e74c3c")
          .setDescription(`Hello there ${member.user}\n I knew you would win and Look you have win **[[This Giveaway]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**\n I'm proud of you **${giveaway.prize}!**\nGo here to claim your prize!!`)
          .setTimestamp()
          .setFooter({
            text: `${member.user.username}`, 
            iconURL: member.user.displayAvatarURL()
          })
        ]
      }).catch(e => {})
    });
  }
}
