module.exports = (app) => {

    const users = require('../controllers/users.controller');

    app.get('/api/users', users.getAllUsers);
    app.get('/api/users/:id', users.getUserById);

    app.post('/api/users', users.createUser);

    app.put('/api/users/:id', users.updateUser);

    app.delete('/api/users/:id', users.deleteUserById)
}