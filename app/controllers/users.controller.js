const db = require('../index');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getAllUsers = (req, res) => {
    const script = `
    SELECT *
    FROM Users;
    `;

    db.query(script, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem finding all users, please try again'
            })
        } else if (results.length == 0) {
            res.status(404).send({
                error: err,
                message: 'No users were found'
            })
        } else {
            res.send(results)
        }

    })
}

exports.getUserById = (req, res) => {

    const { id } = req.params

    const script = `
    SELECT *
    FROM users
    WHERE id = ?
    `

    const placeholderValues = [id];

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem finding this user, please try again'
            })
        } else if (results.length == 0) {
            res.status(404).send({
                error: err,
                message: 'There was no user at this id, please input a valid id'
            })
        } else {
            res.send(results[0])
        }
    })
}

exports.getUserByEmail = (req, res) => {

    const { email } = req.params

    const script = `
        SELECT *
        FROM users
        WHERE email = ?
    `

    const placeholderValues = [email];

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem finding this user, please try again'
            })
        } else if (results.length == 0) {
            res.status(404).send({
                error: err,
                message: 'There was no user at this id, please input a valid id'
            })
        } else {
            res.send(results[0])
        }
    })
}

exports.login = (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400)
            .send({
                message: 'Could not login. Email or password was missing.'
            });
        return;
    }

    const query = `
        SELECT * FROM users 
            WHERE email = ?;
    `;
    const placeholders = [email];

    db.query(query, placeholders, async (err, results) => {

        if (err) {
            // case #3
            res.status(500)
                .send({
                    message: "There was an error logging in. Please try again.",
                    error: err
                });
            return;
        } else if (results.length == 0) {
            // case #2
            res.status(404)
                .send({
                    message: "Email or Password was incorrect."
                });
            return;
        } else {

            let encryptedPassword = results[0].password;
            const passwordMatched = await bcrypt.compare(password, encryptedPassword);

            if (passwordMatched) {
                // successful login

                let user = results[0];

                res.send(user);
            } else {
                res.status(404)
                    .send({
                        message: 'Email or password was incorrect'
                    });
            }
        }
    });

}

exports.createUser = async (req, res) => {

    const { email, password } = req.body

    if (!email || (typeof email != 'string')) {
        res.status(400).send({
            message: 'email is already in use'
        });
        return;
    } else if (!password || (typeof password != 'string')) {
        res.status(400).send({
            message: 'password input is invalid'
        });
        return;
    }
    const id = uuid();
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const script = `
        INSERT INTO users
            (id, email, password)
        VALUES
            (?, ?, ?);
    `;

    const placeholderValues = [id, email, encryptedPassword];

    db.query(script, placeholderValues, (err, results) => {

        if (err || results.affectedRows == 0) {
            res.status(500).send({
                error: err,
                message: 'There was an error creating the user. Please try again.'
            });
            return;
        }
        this.login(req, res)
    });
}

exports.updateUser = async (req, res) => {
    const { id } = req.params
    const { email, password } = req.body


    if (!email || (typeof email != 'string')) {
        res.status(400).send({
            message: 'email input is invalid'
        })
        return;
    } else if (!password || (typeof password != 'string')) {
        res.status(400).send({
            message: 'password input is invalid'
        })
        return;
    }

    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const script = `
        UPDATE users 
        SET email = ?, password = ? 
        WHERE id = ?
    ;`

    const placeholderValues = [email, encryptedPassword, id]

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: "There was a problem editing your information"
            })
            return
        } else if (results.affectedRows == 0) {
            res.status(404).send({
                message: "No account was updated with that id",
                id
            })
            return;
        } else {
            res.send({
                message: "Your account was updated",
                id
            })
        }
    })
}

exports.deleteUserById = (req, res) => {

    let { id } = req.params

    const script = `
        DELETE
        FROM users
        WHERE id = ?
    `

    const placeholderValues = [id];

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem deleting your user, please try again'
            })
            return;
        } else if (results.affectedRows == 0) {
            res.status(400).send({
                error: err,
                message: 'There was no user at this id, please enter a valid id'
            })
        } else {
            res.send({
                message: 'User was successfully deleted'
            })
        }
    })
}