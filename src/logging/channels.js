module.exports = {
  log(client) {
    const { channels } = require("../../config.json");
    const { embed } = require("../helpers/embed.js");
    client.on("channelCreate", (newChannel) => {
      if (newChannel.type == "dm") return;
      if (newChannel.guild.id !== "586736904771469313") return;

      const channel = newChannel.guild.channels.cache.get(channels.auditLog);
      // embed(author, authorImage, title, description, fields, footer, image, color, thumbnail)
      channel.send(
        embed(
          "Channel Created",
          null,
          null,
          `#${newChannel.name}`,
          null,
          null,
          null,
          "#47a8e8",
          null
        )
      );
    });

    client.on("channelDelete", (oldChannel) => {
      if (oldChannel.type == "dm") return;
      if (oldChannel.guild.id !== "586736904771469313") return;

      const channel = oldChannel.guild.channels.cache.get(channels.auditLog);
      // embed(author, authorImage, title, description, fields, footer, image, color, thumbnail)
      channel.send(
        embed(
          "Channel Deleted",
          null,
          null,
          `#${oldChannel.name}`,
          null,
          null,
          null,
          "#47a8e8",
          null
        )
      );
    });

    client.on(`channelUpdate`, (before, after) => {
      if (after.guild.id !== `586736904771469313`) return; // Ignore emoji servers
      const channel = before.guild.channels.cache.get(channels.auditLog);

      if (after.name !== before.name) {
        // embed(author, authorImage, title, description, fields, footer, image, color, thumbnail)
        channel.send(
          embed(
            "Channel Name Changed",
            null,
            null,
            `\`${before.name}\` to \`${after.name}\``,
            null,
            null,
            null,
            "#47a8e8",
            null
          )
        );
      }

      if (after.topic !== before.topic) {
        // embed(author, authorImage, title, description, fields, footer, image, color, thumbnail)
        channel.send(
          embed(
            "Channel Description Changed",
            null,
            null,
            `\`${before.topic ? before.topic : "  "}\` to \`${
              after.topic ? after.topic : "  "
            }\`\n\nfor ${before}`,
            null,
            null,
            null,
            "#47a8e8",
            null
          )
        );
      }
    });
  },
};
