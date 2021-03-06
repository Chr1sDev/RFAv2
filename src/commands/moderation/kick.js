module.exports = {
  name: "kick",
  permissions: 6,
  execute(msg, args) {
    const { Permissions, MessageEmbed } = require("discord.js");
    let person = msg.mentions.members.first();
    let reason;
    if (args.length > 1) {
      reason = args;
      reason.shift();
      reason = reason.join(" ");
    }

    if (!person) {
      msg.reply(`Ping someone to kick`);
    } else if (person.id == msg.author.id) {
      msg.reply(`._.`);
    } else if (person.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      msg.reply(`Don't kick an admin`);
    } else if (reason) {
      person.kick({ reason: reason });
      const kickEmbed = new MessageEmbed()
        .setTitle("Kicked")
        .addFields(
          { name: "User", value: `<@${person.id}>` },
          { name: "Reason", value: reason }
        );
      msg.reply(kickEmbed).then((message) => {
        setTimeout(() => {
          message.delete();
        }, 8000);
      });
    } else {
      person.kick();
      msg.reply(`Kicked <@${person.id}>`);
    }
  },
};
