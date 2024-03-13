const User = require('../model/user');
const { uploadSingleFile, uploadMultipleFiles } = require('../services/fileService')
const getUsersAPI = async (req, res) => {
    let results = await User.find({});
    return res.status(200).json(
        {
            errorCode: 0,
            data: results
        })
}

const postCreateUserAPI = async (req, res) => {
    let { email, name, city } = req.body;

    let user = await User.create({
        email,
        name,
        city
    })
    return res.status(200).json(
        {
            errorCode: 0,
            data: user
        })
}

const putUpdateUserAPI = async (req, res) => {
    let { email, name, city, userId } = req.body;

    let user = await User.updateOne(
        { _id: userId },
        { email: email, name: name, city: city }
    );
    return res.status(200).json(
        {
            errorCode: 0,
            data: user
        })
}

const deleteUserAPI = async (req, res) => {
    const userId = req.body.userId;
    let results = await User.deleteOne({ _id: userId });
    res.redirect('/');
    return res.status(200).json(
        {
            errorCode: 0,
            data: results
        })
}

const postUploadSingleFileAPI = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('no files were uploaded.');
    }

    //lúc nãy, ngay tại đây, bạn đặt sai tên biến nè: bạn ghi là results (thừa chữ s)
    let result = await uploadSingleFile(req.files.image);
    //console.log('check result', results);

    return res.status(200).json({
        EC: 0,
        data: result
    })
}

const postUploadMutipleFilesAPI = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('no files were uploaded.');
    }
    if (Array.isArray(req.files.image)) {
        let result = await uploadMultipleFiles(req.files.image);
        return res.status(200).json({
            EC: 0,
            data: result
        })

    } else {
        return await postUploadSingleFileAPI(req, res);
    }
}
module.exports = {
    getUsersAPI, postCreateUserAPI,
    putUpdateUserAPI, deleteUserAPI, postUploadSingleFileAPI,
    postUploadMutipleFilesAPI
};