const express = require('express');
const router = express.Router();
const { getHomepage, getLian, postCreateUser, getCreatePage, getUpdatePage } = require('../controllers/homeController');

router.get('/', getHomepage);
router.get('/Lian', getLian);

router.get('/create', getCreatePage);
router.get('/update/:id', getUpdatePage);

router.post('/create-user', postCreateUser);

module.exports = router;