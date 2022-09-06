const db = require('../index');
const { v4: uuid } = require('uuid');

exports.getAllTransactions = (req, res) => {
    const script = `
    SELECT *
    FROM transactions;
    `;

    db.query(script, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem finding all transactions, please try again'
            })
        } else if (results.length == 0) {
            res.status(404).send({
                error: err,
                message: 'No transactions were found'
            })
        } else {
            res.send(results)
        }

    })
}

exports.getTransactionsById = (req, res) => {

    const { id } = req.params

    const script = `
    SELECT *
    FROM transactions
    WHERE id = ?
    `

    const placeholderValues = [id];

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem finding this transaction, please try again'
            })
        } else if (results.length == 0) {
            res.status(404).send({
                error: err,
                message: 'There was no transaction at this id, please input a valid id'
            })
        } else {
            res.send(results[0])
        }
    })
}

exports.createTransaction = async (req, res) => {

    const { customerId, total } = req.body

    if (!customerId || (typeof customerId != 'string')) {
        res.status(400).send({
            message: 'customerId is already in use'
        });
        return;
    } else if (!total || (typeof total != 'string')) {
        res.status(400).send({
            message: 'total input is invalid'
        });
        return;
    }

    const id = uuid();

    const script = `
        INSERT INTO transactions
            (id, customer_id, total)
            
        VALUES
            (?, ?, ?);
    `;

    const placeholderValues = [id, customerId, total];

    db.query(script, placeholderValues, (err, results) => {

        if (err || results.affectedRows == 0) {
            res.status(500).send({
                error: err,
                message: 'There was an error creating the transaction. Please try again.'
            });
            return;
        }
        res.send({
            message: "Transaction was created successfully",
            newTransactionId: id
        });
    });
}

exports.deleteTransactionById = (req, res) => {

    let { id } = req.params

    const script = `
        DELETE
        FROM transactions
        WHERE id = ?
    `

    const placeholderValues = [id];

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem deleting your transaction, please try again'
            })
            return;
        } else if (results.affectedRows == 0) {
            res.status(400).send({
                error: err,
                message: 'There was no transaction at this id, please enter a valid id'
            })
        } else {
            res.send({
                message: 'Transaction was successfully deleted'
            })
        }
    })
}
