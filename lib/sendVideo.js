const axios = require('axios');
/**
 *
 * @param token telegram bot token
 * @param chat_id telegram id
 * @param caption text to send with photo, max 1024 chars
 * @param document url or base64
 * @returns {Promise<*>}
 */
module.exports.run = async (token, chat_id, caption, document) => {
    return axios.get(`https://api.telegram.org/bot${token}/sendVideo`, {params: {
            chat_id: chat_id,
            video: document,
            caption: `[Link to ${caption}](${document})`,
            parse_mode: "Markdown"
        }});
}

module.exports.help = {
    name: "sendVideo"
};
