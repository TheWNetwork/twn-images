module.exports.run = async (botconfig, pool, bot, message, args) => {
    let qry = 'SELECT sum(times) counter, count(1) as groups FROM groups g;';
    let qryhere = `SELECT sum(times) counter FROM groups g WHERE id_telegram = ${message.chat.id};`;
    let result = await pool.query(qry);
    let resulthere = await pool.query(qryhere);

    bot.sendMessage(message.chat.id, `Total Groups:${result[0].groups}
Requests served total: ${result[0].counter}
Requests served on this chat:${resulthere[0].counter}

You can check our services on @TheWNetwork.`);
};

module.exports.help = {
    name: "stats"
};