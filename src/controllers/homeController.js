const connection = require('../config/database')
const { getAllUsers, getUserById, updateUserById,
    deleteUserById } = require('../services/CRUDService')
const User = require('../model/user');

const getHomepage = async (req, res) => {
    let results = await User.find({});
    return res.render('homepage.ejs', { listUsers: results });
}
const getLian = (req, res) => {
    res.render('sample.ejs');
}

const postCreateUser = async (req, res) => {
    let { email, name, city } = req.body;

    await User.create({
        email,
        name,
        city
    })
    res.redirect('/');
}

const getCreatePage = (req, res) => {
    res.render('create.ejs');
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.id;
    // let user = await getUserById(userId);
    let user = await User.findById(userId).exec();
    res.render('Edit.ejs', { userEdit: user }); //x <- y
}

const postUpdateUser = async (req, res) => {
    let { email, name, city, userId } = req.body;

    await User.updateOne(
        { _id: userId },
        { email: email, name: name, city: city }
    );
    res.redirect('/');
}

const postDeleteUser = async (req, res) => {
    const userId = req.params.id;
    // let user = await getUserById(userId);
    let user = await User.findById(userId).exec();
    res.render('delete.ejs', { userEdit: user });
}

const postHandleRemoveUser = async (req, res) => {
    const userId = req.body.userId;
    // await deleteUserById(userId);
    await User.deleteOne({ _id: userId });
    res.redirect('/');
}

module.exports = {
    getHomepage, getLian, postCreateUser,
    getCreatePage, getUpdatePage, postUpdateUser,
    postDeleteUser, postHandleRemoveUser
}