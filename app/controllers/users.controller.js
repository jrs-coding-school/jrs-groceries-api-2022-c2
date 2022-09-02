const db = require('../index');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');

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

    const script = `
        INSERT INTO users
            (id, email, password)
        VALUES
        (?, ?, ?);
        `;

    const placeholderValues = [id, email, password];

    try {
        const hash = await bcrypt.hash(password, 10)
        await (db.users).insert({ email: email, hash: hash })
        res.status(200).send({
            message: 'Password hashed'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "something went wrong"
        })
    }

    db.query(script, placeholderValues, (err, results) => {

        if (err || results.affectedRows == 0) {
            res.status(500).send({
                error: err,
                message: 'There was an error creating the user. Please try again.'
            });
            return;
        }

        res.send({
            message: "User was created successfully",
            newUserId: id
        });

    });

}

exports.updateUser = (req, res) => {
    res.send({
        message: "nothing implemented yet"
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
