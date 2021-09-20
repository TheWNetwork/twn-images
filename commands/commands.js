module.exports.run = async (botconfig, dbclient, bot, message, provider) => {
    let qry = 'SELECT DISTINCT CONCAT(\'/\', command) as command FROM command_provider cp WHERE cp.deleted = 0 ORDER BY command;';
    let dbRes = await dbclient.query(qry);
    bot.sendMessage(message.chat.id, `This are the commands. Its a dirty list, so have fun finding what you want. At least i send you in alphabetically order... ` +
        dbRes.map(function (elem){ return elem.command}).join(' '));
};

module.exports.help = {
    name: "commands"
};
