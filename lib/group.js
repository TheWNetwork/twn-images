const axios = require('axios');
/**
 *
 * @param pool database
 * @param chat_id telegram id
 * @returns {Promise<*>}
 */
module.exports.run = async (pool, chat_id) => {
    let qry = `SELECT count(1) counter FROM groups WHERE id_telegram = ${chat_id};`;
    result = await pool.query(qry);

    if(result[0].counter === 0){
        let qry = `INSERT INTO groups (id_telegram, enabled, times) VALUES (${chat_id}, 1, 1);`;
        result = await pool.query(qry);
    }else{
        let qry = `UPDATE groups SET times = times + 1 WHERE id_telegram = ${chat_id}`;
        result = await pool.query(qry);
    }
}

module.exports.help = {
    name: "group"
};
