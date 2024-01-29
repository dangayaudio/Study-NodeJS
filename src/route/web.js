const express = require('express');
const router = express.Router();
const { getHomepage, getLian } = require('../controllers/homeController');

router.get('/', getHomepage);
router.get('/Lian', getLian);


module.exports = router;