module.exports = (app) => {

    const users = require('../controllers/users.controller');

    app.get('/api/users', (req, res) => {
        res.send("not implemented :(")
    });
}