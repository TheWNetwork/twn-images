module.exports.run = async (botconfig, pool, bot, message, args) => {
    let qry = 'SELECT sum(times) counter FROM groups g;';
    let result = await pool.query(qry);

    bot.sendMessage(message.chat.id, `Requests served: ${result[0].counter}\n\nYou can check our services on @TheWNetwork.`);
};

module.exports.help = {
    name: "stats"
};