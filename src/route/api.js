const express = require('express');
const { getLian } = require('../controllers/homeController');
const routerAPI = express.Router();
const { getUsersAPI, postCreateUserAPI,
    putUpdateUserAPI, deleteUserAPI,
    postUploadSingleFileAPI, postUploadMutipleFilesAPI } = require('../controllers/apiController')

const { postCreateCustomer, postCreateArrayCustomer,
    GetAllCustomer, PutAllCustomer, DeleteACustomer, DeleteArrayCustomer } = require('../controllers/customerController')

routerAPI.get('/Lian', getLian);

routerAPI.get('/users', getUsersAPI);

routerAPI.post('/users', postCreateUserAPI);

routerAPI.put('/users', putUpdateUserAPI);

routerAPI.delete('/users', deleteUserAPI);

routerAPI.post('/file', postUploadSingleFileAPI);

routerAPI.post('/files', postUploadMutipleFilesAPI);

routerAPI.post('/customers', postCreateCustomer);

routerAPI.post('/customers-many', postCreateArrayCustomer);

routerAPI.get('/customers', GetAllCustomer);

routerAPI.put('/customers', PutAllCustomer);

routerAPI.delete('/customers', DeleteACustomer);

routerAPI.delete('/customers-many', DeleteArrayCustomer);

routerAPI.get('/info', (req, res) => {
    return res.status(200).json({
        data: req.query
    })
});

routerAPI.get('/info/:name1/:name2', (req, res) => {
    return res.status(200).json({
        data: req.params
    })
});


module.exports = routerAPI;