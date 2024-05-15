require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./route/web')
const apiRoutes = require('./route/api');
const connection = require('./config/database')
const fileUpload = require('express-fileupload')
const { MongoClient } = require('mongodb');

const app = express()
const port = process.env.PORT || 8888;
const hostmane = process.env.HOST_NAME;

//config fileupload
app.use(fileUpload());

//config req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//config template engine
configViewEngine(app);

//khai báo route
app.use('/', webRoutes);
app.use('/v1/api', apiRoutes);

//test conection
(async () => {
    try {
        //using mongoose
        await connection();

        //using mongodb driver
        // Connection URL
        const url = process.env.DB_HOST_WITH_DRIVER;
        const client = new MongoClient(url);

        // Database Name
        const dbName = process.env.DB_NAME;


        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('customers');



        //
        let a = await collection.findOne({ name: 'dang' });
        console.log('find = ', a);

        //
        app.listen(port, hostmane, () => {
            console.log(`Backend zero app listening on port ${port}`)
        })
    } catch (error) {
        console.log('Error conect to DB: ', error);
    }
})();

