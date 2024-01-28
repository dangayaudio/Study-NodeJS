const express = require('express');
const path = require('path');
//import express from 'express';
const app = express()
const port = 8080

//config template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

//khai báo route
app.get('/', (req, res) => {
    res.render('Hello World!')
})

app.get('/abc', (req, res) => {
    // res.send('<h1> check abc </h1>')
    res.render('sample.ejs')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})