const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: ' My Speed!',

    run: async (client, interaction) => {
      let pembed = new EmbedBuilder()
		  .setColor('#e74c3c')	
		  .setTitle('My Ping')
		  .addFields({ name: '``• My Speed``', 
                   value: `\`${Date.now() - interaction.createdTimestamp}ms\``
                 })
		  .addFields({ name: '``• Time Respond``', 
                   value: `\`${Math.round(client.ws.ping)}ms\``
                 })
		  .setTimestamp()
                  .setFooter({
                     text: `${interaction.user.username}`,
                     iconURL: interaction.user.displayAvatarURL()
                  })
        interaction.reply({
          embeds: [pembed]
        });
    },
};
