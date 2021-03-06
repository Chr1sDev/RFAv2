module.exports = {
  log(client) {
    const { channels } = require("../../config.json");
    const { embed } = require("../helpers/embed.js");
    client.on("roleCreate", (newRole) => {
      if (newRole.guild.id !== "586736904771469313") return;
      const channel = newRole.guild.channels.cache.get(channels.auditLog);
      // embed(author, authorImage, title, description, fields, footer, image, color, thumbnail)
      channel.send(
        embed(
          "Role Created",
          null,
          null,
          `@${newRole.name}`,
          null,
          null,
          null,
          "#47a8e8",
          null
        )
      );
    });

    client.on("roleDelete", (oldRole) => {
      if (oldRole.guild.id !== "586736904771469313") return;
      const channel = oldRole.guild.channels.cache.get(channels.auditLog);
      // embed(author, authorImage, title, description, fields, footer, image, color, thumbnail)
      channel.send(
        embed(
          "Role Deleted",
          null,
          null,
          `@${oldRole.name}`,
          null,
          null,
          null,
          "#47a8e8",
          null
        )
      );
    });

    client.on("roleUpdate", (before, after) => {
      if (before.guild.id !== "586736904771469313") return;
      const channel = before.guild.channels.cache.get(channels.auditLog);

      if (before.name !== after.name) {
        // embed(author, authorImage, title, description, fields, footer, image, color, thumbnail)
        channel.send(
          embed(
            "Role Name Changed",
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
    });
  },
};
