const botconfig = require("./config/config.json");
const fs = require("fs");
const mysql = require('promise-mysql');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(botconfig.token, {polling: true});
bot.commands = new Map();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on('getUpdates', (update) => {
    console.log(update);
});
bot.on('message', (msg) => {
    try {
        let messageArray = '';
        (async () => {
            const pool = await mysql.createPool({
                "connectionLimit": 113,
                "host": botconfig.mysqlConnection.host,
                "port": botconfig.mysqlConnection.port,
                "user": botconfig.mysqlConnection.user,
                "password": botconfig.mysqlConnection.password,
                "database": botconfig.mysqlConnection.database,
            });
            try {
                messageArray = msg.text.split(" ");
                let cmd = messageArray[0];
                let args = msg.text.slice(cmd.length + 1);
                let commandfile = bot.commands.get(cmd.slice(1));

                if (commandfile) {
                    commandfile.run(botconfig, pool, bot, msg, args)
                } else {
                    commandfile = cmd.slice(1);
                    commandfile = commandfile.substring(0, (commandfile.indexOf('@') === -1 ? commandfile.length : commandfile.indexOf('@')));
                    let qry = 'SELECT rand() ord, cp.*, pr.* ' +
                        'FROM command_provider cp ' +
                        '         INNER JOIN provider pr ' +
                        '                    ON pr.id_provider = cp.id_provider ' +
                        'WHERE cp.command = \'' + commandfile + '\' ' +
                        '  AND cp.deleted = 0 ' +
                        'ORDER BY 1 ' +
                        'LIMIT 1;';
                    commandfile = await pool.query(qry);
                    if (typeof commandfile[0] !== 'undefined') {
                        let imagePromise = (bot.commands.get('request')).run(botconfig, pool, bot, msg, commandfile[0]);
                        let imageUrl = await imagePromise;
                        let extension = imageUrl.substring(imageUrl.lastIndexOf('.') + 1, imageUrl.length);
                        switch (extension) {
                            case 'gif':
                                let sendAnimation = require(`./lib/sendAnimation.js`);
                                await sendAnimation.run(botconfig.token, msg.chat.id, '',imageUrl);
                                break;
                            default:
                                let sendPhotoLib = require(`./lib/sendPhoto.js`);
                                await sendPhotoLib.run(botconfig.token, msg.chat.id, '', imageUrl);
                        }
                    }
                    console.log();
                }
            } catch (e) {

            }
        })();

    } catch (e) {
        console.log(e.message);
        //bot.sendMessage(chatid, e.message);
    }
});