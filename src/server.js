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

//test conection
(async () => {
    try {
        await connection();
        app.listen(port, hostmane, () => {
            console.log(`Backend zero app listening on port ${port}`)
        })
    } catch (error) {
        console.log('Error conect to DB: ', error);
    }
})();

