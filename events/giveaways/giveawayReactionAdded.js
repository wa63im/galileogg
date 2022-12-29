const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, reactor, messageReaction) {
    let approved =  new Discord.EmbedBuilder()
    .setTimestamp()
    .setColor("#e74c3c")
    .setTitle("Well done, you have successfully joined! | I wish you success bro 🙏")
    .setDescription(
      `Your entry to [This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) successfully joined!`
    )
    .setFooter({ text: "This Giveaway Made by Galileo" })
    .setTimestamp()
   let denied =  new Discord.EmbedBuilder()
    .setTimestamp()
    .setColor("#e74c3c")
    .setTitle(":x: Uh, are you sure? | I can't find you in my database!")
    .setDescription(
      `Your entry to [This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) Your position has been cancelled. Try again.`
    )
    .setFooter({ text: "This Giveaway Made by Galileo" })

    let client = messageReaction.message.client
    if (reactor.user.bot) return;
    if(giveaway.extraData) {
      if (giveaway.extraData.server !== "null") {
        try { 
        await client.guilds.cache.get(giveaway.extraData.server).members.fetch(reactor.id)
        return reactor.send({
          embeds: [approved]
        });
        } catch(e) {
          messageReaction.users.remove(reactor.user);
          return reactor.send({
            embeds: [denied]
          }).catch(e => {})
        }
      }
      if (giveaway.extraData.role !== "null" && !reactor.roles.cache.get(giveaway.extraData.role)){ 
        messageReaction.users.remove(reactor.user);
        return reactor.send({
          embeds: [denied]
        }).catch(e => {})
      }

      return reactor.send({
        embeds: [approved]
      }).catch(e => {})
    } else {
        return reactor.send({
          embeds: [approved]
        }).catch(e => {})
    }
    }
  }
