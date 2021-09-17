const rp = require('request-promise');
/**
 *
 * @param token
 * @param chat_id
 * @param document
 * @param caption
 * @returns {Promise<*>}
 */
module.exports.run = async (token, chat_id, caption, document) => {
    const options = {
        method: 'GET',
        uri: `https://api.telegram.org/bot${token}/sendDocument`,
        qs: {
            chat_id: chat_id,
            document: document,
            caption: caption,
            parse_mode: "Markdown"
        }
    };
    console.log(options);
    return rp(options);
}


module.exports.help = {
    name: "sendFile"
};