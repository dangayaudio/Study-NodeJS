require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./route/web')

const app = express()
const port = process.env.PORT || 8888;
const hostmane = process.env.HOST_NAME;

//config template engine
configViewEngine(app);

//khai báo route
app.use('/', webRoutes);

app.listen(port, hostmane, () => {
    console.log(`Example app listening on port ${port}`)
})