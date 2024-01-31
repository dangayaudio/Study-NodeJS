const connection = require('../config/database')



const getHomepage = (req, res) => {
    return res.render('homepage.ejs');
}
const getLian = (req, res) => {
    res.render('sample.ejs');
}

const postCreateUser = async (req, res) => {

    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    console.log("email = ", email, "name =", name, 'city = ', city);
    let [results, fileds] = await connection.query(`INSERT INTO Users(email, name, city) VALUES(?, ?, ?)`, [email, name, city])
    res.send('Created user succeed');
}

const getCreatePage = (req, res) => {
    res.render('create.ejs');
}
module.exports = {
    getHomepage, getLian, postCreateUser, getCreatePage
}