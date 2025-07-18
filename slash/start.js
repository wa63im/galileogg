const Discord = require("discord.js")
const {  ApplicationCommandOptionType } = require("discord.js");
const messages = require("../utils/message");
const ms = require("ms")
module.exports = {
  name: 'start',
  description: '🎉 Start a giveaway',

  options: [
    {
      name: 'duration',
      description: 'How long the giveaway should last for. Example values: 1m, 1h, 1d',
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: 'winners',
      description: 'How many winners the giveaway should have',
      type: ApplicationCommandOptionType.Integer,
      required: true
    },
    {
      name: 'prize',
      description: 'What the prize of the giveaway should be',
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: 'channel',
      description: 'The channel to start the giveaway in',
      type: ApplicationCommandOptionType.Channel,
      required: true
    },
    {
      name: 'benefitrole',
      description: 'Role which has preference to win',
      type: ApplicationCommandOptionType.Role,
      required: false
    },
    {
      name: 'benefitnumber',
      description: 'The number of oost entries the role will win',
      type: ApplicationCommandOptionType.Integer,
      required: false
    },
  /*  {
      name: 'invite',
      description: 'Invite of the server you want to add as giveaway joining requirement',
      type: ApplicationCommandOptionType.String,
      required: false
    },*/
    
    {
      name: 'role',
      description: 'Role you want to add as giveaway joining condition',
      type: ApplicationCommandOptionType.Role,
      required: false
    },
  ],

  run: async (client, interaction) => {
const image = "https://media.discordapp.net/attachments/1019719766803497020/1058037379518189599/Picsart_22-12-29_16-02-39-902.jpg";
    // If the member doesn't have enough permissions
    if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
      return interaction.reply({
        content: ':x: You need to have the manage messages permissions to start giveaways.',
        ephemeral: true
      });
    }

    const giveawayChannel = interaction.options.getChannel('channel');
    const giveawayDuration = interaction.options.getString('duration');
    const giveawayWinnerCount = interaction.options.getInteger('winners');
    const giveawayPrize = interaction.options.getString('prize');

    if (!giveawayChannel.isTextBased()) {
      return interaction.reply({
        content: ':x: Please select a text channel!',
        ephemeral: true
      });
    }
   if(isNaN(ms(giveawayDuration))) {
    return interaction.reply({
      content: ':x: Please select a valid duration!',
      ephemeral: true
    });
  }
    if (giveawayWinnerCount < 1) {
      return interaction.reply({
        content: ':x: Please select a valid winner count! greater or equal to one.',
      })
    }

    const bonusRole = interaction.options.getRole('bonusrole')
    const bonusEntries = interaction.options.getInteger('bonusamount')
    let rolereq = interaction.options.getRole('role')
    let invite = interaction.options.getString('invite')

    if (bonusRole) {
      if (!bonusEntries) {
        return interaction.reply({
          content: `:x: You must specify how many bonus entries would ${bonusRole} recieve!`,
          ephemeral: true
        });
      }
    }


    await interaction.deferReply({ ephemeral: true })
    let reqinvite;
    if (invite) {
      let invitex = await client.fetchInvite(invite)
      let client_is_in_server = client.guilds.cache.get(
        invitex.guild.id
      )
      reqinvite = invitex
      if (!client_is_in_server) {
          const gaEmbed = {
            author: {
              name: client.user.username,
              iconURL: client.user.displayAvatarURL() 
            },
            title: "Server Support!",
            url: "https://discord.gg/galileo",
            description:
              "Wow bro am not in this server 😐",
            timestamp: new Date(),
            footer: {
              iconURL: client.user.displayAvatarURL(),
              text: "Server Support"
            }
          }  
        return interaction.editReply({ embeds: [gaEmbed]})
      }
    }

    if (rolereq && !invite) {
      messages.inviteToParticipate = `**React with <:14__2_removebgpreview1:1057403901168590929> to participate!**\n>>> - Only members having ${rolereq} are allowed to participate in this giveaway!`
    }
    if (rolereq && invite) {
      messages.inviteToParticipate = `**React with <:14__2_removebgpreview1:1057403901168590929> to participate!**\n>>> - Only members having ${rolereq} are allowed to participate in this giveaway!\n- Members are required to join [this server](${invite}) to participate in this giveaway!`
    }
    if (!rolereq && invite) {
      messages.inviteToParticipate = `**React with <:14__2_removebgpreview1:1057403901168590929> to participate!**\n>>> - Members are required to join [this server](${invite}) to participate in this giveaway!`
    }


    // start giveaway
    client.giveawaysManager.start(giveawayChannel, {
      // The giveaway duration
      duration: ms(giveawayDuration),

    // The Image Banner instead

image: (image),
      // The giveaway prize
      prize: giveawayPrize,
      // The giveaway winner count
      winnerCount: parseInt(giveawayWinnerCount),
      // BonusEntries If Provided
      bonusEntries: [
        {
          // Members who have the role which is assigned to "rolename" get the amount of bonus entries which are assigned to "BonusEntries"
          bonus: new Function('member', `return member.roles.cache.some((r) => r.name === \'${bonusRole ?.name}\') ? ${bonusEntries} : null`),
          cumulative: false
        }
      ],
      // Messages
      messages,
      extraData: {
        server: reqinvite == null ? "null" : reqinvite.guild.id,
        role: rolereq == null ? "null" : rolereq.id,
      }
    });
    interaction.editReply({
      content:
        `Giveaway started in ${giveawayChannel}!`,
      ephemeral: true
    })

    if (bonusRole) {
      let giveaway = new Discord.EmbedBuilder()
        .setAuthor({ name: `Boost Entries Alert!` })
        .setDescription(
          `**${bonusRole}** Has **${bonusEntries}** Extra Entries in this giveaway!`
        )
        .setColor("#e74c3c")
        .setTimestamp();
      giveawayChannel.send({ embeds: [giveaway] });
    }

  }

};
