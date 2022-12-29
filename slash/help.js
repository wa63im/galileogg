const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ComponentType } = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'help',
  description: ' View all the what i can do!',
  run: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setTitle(`${client.user.username} Giveaway 🥳`)
      .setColor('#e74c3c')
      .setDescription('**Hello everyone 👋 am Galileo i can help u to make the best giveaways in your server**')
      .addFields({ name: `Here are my social:`, value: `- [Server Support](https://discord.gg/galileo)\n- [Invite me](https://discord.com/api/oauth2/authorize?client_id=1005540872894554204&permissions=9395251377&scope=bot%20applications.commands)\n`, inline: true })
      
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.username} | ` + config.copyright,
        iconURL: interaction.user.displayAvatarURL()
      });

    const giveaway = new EmbedBuilder()
      .setTitle("Categories » Giveaway")
      .setColor('#e74c3c')
      .setDescription("```yaml\nThat's what ican do for you:```")
      .addFields(
        { name: '• /start', value: `Start a giveaway in your guild!\n > **Sort: __\`slash\` / \`message\`__**`, inline: true },
        { name: '• /drop', value: `Start a drop giveaway!\n > **Sort: __\`slash\` / \`message\`__**`, inline: true },
        { name: '• /edit', value: `Edit an already running giveaway!\n > **Sort: __\`slash\` / \`message\`__**`, inline: true },
        { name: '• /end', value: `End an already running giveaway!\n > **Sort: __\`slash\` / \`message\`__**`, inline: true },
        { name: '• /menu', value: `Menu all the giveaways running within this guild!\n > **Sort: __\`slash\` / \`message\`__**`, inline: true },
        { name: '• /pause', value: `Pause an already running giveaway!\n > **Sort: __\`slash\`__**`, inline: true },
        { name: '• /reroll', value: `Reroll an ended giveaway!\n > **Sort: __\`slash\` / \`message\`__**`, inline: true },
        { name: '• /resume', value: `Resume a paused giveaway!\n > **Sort: __\`slash\`__**`, inline: true },
      )
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.username} | ` + config.copyright,
        iconURL: interaction.user.displayAvatarURL()
      });

    const general = new EmbedBuilder()
      .setTitle("Categories » General")
      .setColor('#e74c3c')
      .setDescription("```yaml\nAnd here my general commands:```")
      .addFields(
        { name: '• /invite', value: `Get the bot's invite link!\n > **Sort: __\`slash\` / \`message\`__**`, inline: true },
        { name: '• /ping', value: `Check the bot's websocket latency!\n > **Sort: __\`slash\` / \`message\`__**`, inline: true },
      )
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.username} | ` + config.copyright,
        iconURL: interaction.user.displayAvatarURL()
      });

    const components = (state) => [
      new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
          .setCustomId("help-menu")
          .setPlaceholder("Please Select a Category")
          .setDisabled(state)
          .addOptions([{
            label: `Giveaways`,
            value: `giveaway`,
            description: `View all the giveaway based commands!`,
            emoji: `<:14__2_removebgpreview1:1057403901168590929>`
          },
          {
            label: `General`,
            value: `general`,
            description: `View all the general bot commands!`,
            emoji: `<:28removebgpreview:1056979293554606080>`
          }
          ])
      ),
    ];

    const initialMessage = await interaction.reply({ embeds: [embed], components: components(false) });

    const filter = (interaction) => interaction.user.id === interaction.member.id;

    const collector = interaction.channel.createMessageComponentCollector(
      {
        filter,
        componentType: ComponentType.SelectMenu,
        idle: 300000,
        dispose: true,
      });

    collector.on('collect', (interaction) => {
      if (interaction.values[0] === "giveaway") {
        interaction.update({ embeds: [giveaway], components: components(false) }).catch((e) => { });
      } else if (interaction.values[0] === "general") {
        interaction.update({ embeds: [general], components: components(false) }).catch((e) => { });
      }
    });
    collector.on('end', (collected, reason) => {
      if (reason == "time") {
        initialMessage.edit({
          content: "Collector Destroyed, Try Again!",
          components: [],
        });
      }
    })
  }
}
