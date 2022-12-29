const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ComponentType } = require("discord.js");
const config = require('../config.json');

module.exports.run = async (client, message, args) => {

const embed = new EmbedBuilder()
.setTitle(`${client.user.username} Giveaway ✅✅✅✅✅✅✅🥳`)
.setColor('#e74c3c')
.setDescription('**Hello everyone 👋 am Galileo islam i can help u to make the best giveaways in your server**')
.addFields({ name: `Here are my social:`, value: `- [Server Support](https://discord.gg/galileo)\n- [Invite me](https://discord.com/api/oauth2/authorize?client_id=1005540872894554204&permissions=9395251377&scope=bot%20applications.commands)\n`, inline: true })
.setTimestamp()
.setFooter({
  text: `Requested by ${message.author.username} | ` + config.copyright, 
  iconURL: message.author.displayAvatarURL()
});

  const giveaway = new EmbedBuilder()
  .setTitle("Categories » Giveaway")
  .setColor('#e74c3c')
  .setDescription("```yaml\nThat's what i can do:```")
  .addFields(
    { name: '• g!start '  , value: `Start a giveaway in your guild!\n > **Sort: __\`slash\` / \`message\`__**`, inline: true },
    { name: '• g!drop' , value: `Start a drop giveaway!\n > **Sort: __\`slash\` / \`message\`__**`, inline: true },
    { name: '• g!edit' , value: `Edit an already running giveaway!\n > **Sort: __\`slash\` / \`message\`__**`, inline: true },
    { name: '• g!end' , value: `End an already running giveaway!\n > **Sort: __\`slash\` / \`message\`__**`, inline: true },
    { name: '• g!menu' , value: `Menu all the giveaways running within this guild!\n > **Sort: __\`slash\` / \`message\`__**`, inline: true },
    { name: '• g!pause' , value: `Pause an already running giveaway!\n > **Type: __\`slash\`__**`, inline: true },
    { name: '• g!reroll' , value: `Reroll an ended giveaway!\n > **Sort: __\`slash\` / \`message\`__**`, inline: true },
    { name: '• g!resume' , value: `Resume a paused giveaway!\n > **Sort: __\`slash\`__**`, inline: true },
  )
  .setTimestamp()
  .setFooter({
    text: `Requested by ${message.author.username} | ` + config.copyright, 
    iconURL: message.author.displayAvatarURL()
  });

  const general = new EmbedBuilder()
  .setTitle("Categories » General")
  .setColor('#e74c3c')
  .setDescription("```yaml\nAnd here my general commands:```")
  .addFields(

    { name: '• g!invite' , value: `Get the bot's invite link!\n > **Sort: __\`slash\` / \`message\`__**`, inline: true },
    { name: '• g!ping' , value: `Check the bot's websocket latency!\n > **Sort: __\`slash\` / \`message\`__**`, inline: true },
  )
  .setTimestamp()
  .setFooter({
    text: `Requested by ${message.author.username} | ` + config.copyright, 
    iconURL: message.author.displayAvatarURL()
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

const initialMessage = await message.reply({ embeds: [embed], components: components(false) });

const filter = (interaction) => interaction.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector(
            {
                filter,
                componentType: ComponentType.SelectMenu,
                idle: 300000,
                dispose: true,
            });

        collector.on('collect', (interaction) => {
            if (interaction.values[0] === "giveaway") {
                interaction.update({ embeds: [giveaway], components: components(false) }).catch((e) => {});
            } else if (interaction.values[0] === "general") {
                interaction.update({ embeds: [general], components: components(false) }).catch((e) => {});
            }
        });
        collector.on("end", (collected, reason) => {
            if (reason == "time") {
                initialMessage.edit({
                   content: "Collector Destroyed, Try Again!",
                   components: [],
                });
             }
        });
}
