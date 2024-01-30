const connection = require('../config/database')



const getHomepage = (req, res) => {
    //simple query
    let users = [];

    connection.query(
        'select * from Users u',
        function (err, results, fields) {
            users = results
            console.log("check results:", results);
            console.log('check users:', users);
            res.send(JSON.stringify(users));
        }
    )

}
const getLian = (req, res) => {
    res.render('sample.ejs');
}

module.exports = {
    getHomepage, getLian
}