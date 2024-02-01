const connection = require('../config/database');

const getAllUsers = async () => {
    let [results, fileds] = await connection.query('select * from Users');
    return results;
}

module.exports = { getAllUsers }