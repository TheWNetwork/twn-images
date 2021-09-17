const axios = require('axios');
/**
 *
 * @param token telegram bot token
 * @param chat_id telegram id
 * @param caption text to send with photo, max 4096 chars
 * @param document
 * @returns {Promise<*>}
 */
module.exports.run = async (token, chat_id, caption, document) => {
    return axios(`https://api.telegram.org/bot${token}/sendMessage`, {
        params: {
            chat_id: chat_id,
            text: caption,
            parse_mode: "Markdown"
        }
    });
}

module.exports.help = {
    name: "sendMessage"
};