module.exports = {
  name: "clear",
  permissions: 6,
  execute(msg, args) {
    let amount = args[0] ? parseInt(args[0], 10) : null;

    if (!amount) {
      msg.reply(`Invalid amount`);
    } else if (!(amount >= 1 && amount <= 200)) {
      msg.reply(`Chottomatte, don't clear the whole chat`);
    } else {
      msg.channel.messages
        .fetch()
        .then(() => {
          msg.channel.bulkDelete(amount + 1).catch((err) => {
            msg.reply(err.message);
          });
        })
        .catch((err) => {
          msg.reply(`Error fetching messages`);
        });
    }
  },
};
