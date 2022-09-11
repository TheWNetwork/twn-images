const botconfig = require("./config/config.json");
const fs = require("fs");
const mysql = require('promise-mysql');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(botconfig.token, {polling: true});
var pool;
(async () => {
    pool = await mysql.createPool({
        "connectionLimit": 113,
        "host": botconfig.mysqlConnection.host,
        "port": botconfig.mysqlConnection.port,
        "user": botconfig.mysqlConnection.user,
        "password": botconfig.mysqlConnection.password,
        "database": botconfig.mysqlConnection.database,
    });
})();

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
            try {
                messageArray = msg.text.split(" ");
                let cmd = messageArray[0];
                let args = msg.text.slice(cmd.length + 1);
                let commandRequest = cmd.slice(1);
                if (cmd.substring(0, 1) !== '/') {
                    return;
                }
                commandfile = bot.commands.get(commandRequest.substring(0, (commandRequest.indexOf('@') === -1 ? commandRequest.length : commandRequest.indexOf('@'))));

                if (commandfile) {
                    commandfile.run(botconfig, pool, bot, msg, args)
                } else {
                    commandfile = commandRequest.substring(0, (commandRequest.indexOf('@') === -1 ? commandRequest.length : commandRequest.indexOf('@')));
                    let qry_user = 'SELECT enabled FROM groups g WHERE g.id_telegram = ' + msg.chat.id + ';';
                    let userData = await pool.query(qry_user);
                    if (!(typeof userData[0] === 'undefined' || userData[0].enabled === 1)) {
                        return;
                    }
                    let qry_provider = 'SELECT rand() ord, cp.command, cp.endpoint, pr.description, pr.code, pr.destination, pr.api_user, pr.api_key ' +
                        'FROM command_provider cp ' +
                        '         INNER JOIN provider pr ' +
                        '                    ON pr.id_provider = cp.id_provider ' +
                        'WHERE cp.command = \'' + commandfile + '\' ' +
                        '  AND cp.deleted = 0 ' +
                        'ORDER BY 1 ' +
                        'LIMIT 1;';
                    commandfile = await pool.query(qry_provider);
                    if (typeof commandfile[0] === 'undefined') {
                        return;
                    }
                    let imagePromise = (bot.commands.get('request')).run(botconfig, pool, bot, msg, commandfile[0]);
                    let imageUrl = await imagePromise;
                    let extension = imageUrl.substring(imageUrl.lastIndexOf('.') + 1, imageUrl.length);
                    let send = {};
                    switch (extension) {
                        case 'gif':
                        case 'mp4':
                            send = require(`./lib/sendAnimation.js`);
                            break;
                        case 'webm':
                            send = require(`./lib/sendSticker.js`);
                            break;
                        default:
                            send = require(`./lib/sendPhoto.js`);
                            break;
                    }
                    await send.run(botconfig.token, msg.chat.id, commandfile[0].description, imageUrl);
                    let group = require(`./lib/group.js`);
                    await group.run(pool, msg.chat.id);
                    console.log();
                }
            } catch (e) {
                console.log(e.message);
            }
        })();

    } catch (e) {
        console.log(e.message);
    }
});

bot.on('inline_query', (msg) => {
    try {
        if (commandfile) {
            let query = encodeURIComponent(msg.query.trim());
            let returntext = commandfile.run(botconfig, null, bot, msg, msg.query).then(returntext => {
                bot.answerInlineQuery(msg.id, [
                    {
                        type: 'article',
                        id: query + '_exchange',
                        title: `Exchange ${msg.query}`,
                        input_message_content: {
                            message_text: returntext,
                        }
                    }
                ]);
            });
        }
    } catch (e) {
        console.log(e.message);
    }
});
