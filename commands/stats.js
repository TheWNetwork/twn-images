module.exports.run = async (botconfig, dbclient, bot, message, args) => {
    let qry_user = 'SELECT sum(times) counter FROM groups g;';
    let userData = await pool.query(qry_user);

    bot.sendMessage(message.chat.id, `Requests served: ${userData.counter}\n\nYou can check our services on @TheWNetwork.`);
};

module.exports.help = {
    name: "stats"
};