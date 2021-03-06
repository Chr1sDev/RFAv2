module.exports = {
  name: "nowplaying",
  permission: 1,
  execute(msg) {
    const { primary } = require("../../colors.json");
    const { MessageEmbed } = require("discord.js");
    const status = (queue) =>
      `Volume: ${queue.volume}% | Filter: ${queue.filter || "Off"} | Loop: ${
        queue.repeatMode
          ? queue.repeatMode == 2
            ? "All Queue"
            : "This Song"
          : "Off"
      } | Autoplay: ${queue.autoplay ? "On" : "Off"}`;

    let song = msg.client.currentSong;

    if (!msg.client.currentSong) {
      msg.reply("No Song Found");
      return;
    }
    const embed = new MessageEmbed()
      .setTitle(`${song.name}`)
      .setThumbnail(`${song.thumbnail ? song.thumbnail : ""}`)
      .addFields(
        {
          name: "Duration",
          value: `${song.formattedDuration}`,
          inline: true,
        },
        { name: "Requested by", value: `${song.user}`, inline: true }
      )
      .setFooter(`${status(msg.client.distube.getQueue(msg))}`)
      .setColor(primary);

    msg.reply(embed);
  },
};
