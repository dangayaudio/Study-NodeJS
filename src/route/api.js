const express = require('express');
const { getLian } = require('../controllers/homeController');
const routerAPI = express.Router();
const { getUsersAPI, postCreateUserAPI, putUpdateUserAPI } = require('../controllers/apiController')


routerAPI.get('/Lian', getLian);

routerAPI.get('/users', getUsersAPI);

routerAPI.post('/users', postCreateUserAPI);

routerAPI.put('/users', putUpdateUserAPI);

module.exports = routerAPI;