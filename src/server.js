require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./route/web')
const connection = require('./config/database')

const app = express()
const port = process.env.PORT || 8888;
const hostmane = process.env.HOST_NAME;

//config req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//config template engine
configViewEngine(app);

//khai báo route
app.use('/', webRoutes);

//create database


//simple query
// connection.query(
//     'select * from Users u',
//     function (err, results, fields) {
//         console.log("check results:", results);
//     }
// )


app.listen(port, hostmane, () => {
    console.log(`Example app listening on port ${port}`)
})