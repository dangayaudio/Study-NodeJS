const getHomepage = (req, res) => {
    res.send('Love Lian');
}
const getLian = (req, res) => {
    res.render('sample.ejs');
}

module.exports = {
    getHomepage, getLian
}