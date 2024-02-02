const connection = require('../config/database')
const { getAllUsers, getUserById, updateUserById,
    deleteUserById } = require('../services/CRUDService')

const getHomepage = async (req, res) => {
    let results = await getAllUsers();
    return res.render('homepage.ejs', { listUsers: results });
}
const getLian = (req, res) => {
    res.render('sample.ejs');
}

const postCreateUser = async (req, res) => {

    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let [results, fileds] = await connection.query(
        `INSERT INTO Users(email, name, city) VALUES(?, ?, ?)`,
        [email, name, city])
    res.send('Created user succeed');
}

const getCreatePage = (req, res) => {
    res.render('create.ejs');
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.id;
    let user = await getUserById(userId);
    res.render('Edit.ejs', { userEdit: user }); //x <- y
}

const postUpdateUser = async (req, res) => {

    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userId = req.body.userId;

    // console.log('email = ', email, 'name = ', name, 'city = ', city, 'userId = ', userId)
    await updateUserById(email, name, city, userId);
    // res.send('Update user succeed!');
    res.redirect('/');
}

const postDeleteUser = async (req, res) => {
    const userId = req.params.id;
    let user = await getUserById(userId);
    res.render('delete.ejs', { userEdit: user });
}

const postHandleRemoveUser = async (req, res) => {
    const userId = req.body.userId;
    await deleteUserById(userId);
    res.redirect('/');
}

module.exports = {
    getHomepage, getLian, postCreateUser,
    getCreatePage, getUpdatePage, postUpdateUser,
    postDeleteUser, postHandleRemoveUser
}