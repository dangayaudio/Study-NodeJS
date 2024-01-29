const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Love Lian')
})

router.get('/lian', (req, res) => {
    // res.send('<h1> check abc </h1>')
    res.render('sample.ejs')
})

module.exports = router;