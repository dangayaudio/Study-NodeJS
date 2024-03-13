const express = require('express');
const { getLian } = require('../controllers/homeController');
const routerAPI = express.Router();
const { getUsersAPI, postCreateUserAPI,
    putUpdateUserAPI, deleteUserAPI,
    postUploadSingleFileAPI, postUploadMutipleFilesAPI } = require('../controllers/apiController')

const { postCreateCustomer } = require('../controllers/customerController')

routerAPI.get('/Lian', getLian);

routerAPI.get('/users', getUsersAPI);

routerAPI.post('/users', postCreateUserAPI);

routerAPI.put('/users', putUpdateUserAPI);

routerAPI.delete('/users', deleteUserAPI);

routerAPI.post('/file', postUploadSingleFileAPI);

routerAPI.post('/files', postUploadMutipleFilesAPI);

routerAPI.post('/customers', postCreateCustomer);



module.exports = routerAPI;