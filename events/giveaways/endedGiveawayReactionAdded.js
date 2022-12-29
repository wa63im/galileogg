const Discord = require('discord.js');
module.exports = {
  async execute(giveaway, member, reaction) {
    reaction.users.remove(member.user);
    member.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setTitle(`Giveaway ended already!`)
            .setColor('#e74c3c')
            .setDescription(
              `Hey ${member.user} **[[This Giveaway]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})** You to late for it. Be quick next time!`
            )
            .setTimestamp(),
        ],
      })
      .catch((e) => {});
  },
};
