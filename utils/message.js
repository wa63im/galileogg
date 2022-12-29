const config = require('../config.json');
module.exports = {
  giveaway:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "<:emoji_17:1057403402369372260> **GIVEAWAY** <:emoji_17:1057403402369372260>",
  giveawayEnded:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "<:emoji_17:1057403402369372260> **GIVEAWAY ENDED** <:emoji_17:1057403402369372260>",
  drawing:  `**Ends:** **{timestamp}**`,
  inviteToParticipate: `**React with <:14__2_removebgpreview1:1057403901168590929> to participate!**`,
  winMessage: "Congratulations, {winners}! You won **{this.prize}**!",
  embedFooter: "{this.winnerCount} Winner(s)",
  noWinner: "Giveaway cancelled, no valid participations.",
  hostedBy: `Hosted by: {this.hostedBy}`,
  winners: "Winner(s)",
  endedAt: "Ended at"
}
