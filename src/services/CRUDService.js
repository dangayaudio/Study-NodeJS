const connection = require('../config/database');

const getAllUsers = async () => {
    let [results, fileds] = await connection.query('select * from Users');
    return results;
}

const getUserById = async (userID) => {
    let [results, fileds] = await connection.query('select * from Users where id = ?', [userID]);
    let user = results && results.length > 0 ? results[0] : {};
    return user;
}

module.exports = { getAllUsers, getUserById }