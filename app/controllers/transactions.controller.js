const db = require('../index');
const { v4: uuid } = require('uuid');
const transactionsRoutes = require('../routes/transactions.routes');

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

exports.getTransactionsByUserId = (req, res) => {

    const customerId = req.body

    const script = `
    SELECT *
    FROM transactions
    WHERE customer_id = ?
    `

    const placeholderValues = [customerId];

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem finding this customers transaction, please try again'
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

exports.createTransaction = (req, res) => {

    const { customerId, items, grandTotal } = req.body

    // if (!customerId || (typeof customerId != 'string')) {
    //     res.status(400).send({
    //         message: 'customerId is already in use'
    //     });
    //     return;
    // } else if (!grandTotal || (typeof grandTotal != 'string')) {
    //     res.status(400).send({
    //         message: 'total input is invalid'
    //     });
    //     return;
    // } else if (!items || !Array.isArray(items)) {
    //     res.status(400).send({
    //         message: 'items are invalid'
    //     });
    //     return;
    // }

    const transactionId = uuid();

    const script = `
        BEGIN;
        INSERT INTO transactions
            (id, customer_id, total)
        VALUES
            (?, ?, ?);

        INSERT INTO purchased_items
            (transaction_id, product_id, quantity, total)
        VALUES
            ?;

        COMMIT;
    `;

    let itemsPlaceholderValues = items?.map(({ id, quantity, total }) => {
        // [transaction_id, product_id, quantity, total]
        return [transactionId, id, quantity, total];
    });
    const transactionPlaceholderValues = [transactionId, customerId, grandTotal];


    // db.query(script, placeholderValues, (err, results) => {

    //     if (err || results.affectedRows == 0) {
    //         console.log(err)
    //         res.status(500).send({
    //             error: err,
    //             message: 'There was an error creating the transaction. Please try again.'
    //         });
    //         return;
    //     }
    //     res.send({
    //         message: "Transaction was created successfully",
    //         newTransactionId: transactionId
    //     });
    // });
    try {
        db.beginTransaction((err) => {
            if (err) { throw err; }
            db.query(
                `
                    INSERT INTO transactions
                        (id, customer_id, total)
                    VALUES
                        (?, ?, ?);
                `,
                transactionPlaceholderValues,
                (error, results, fields) => {
                    if (error) {
                        return db.rollback(function () {
                            throw error;
                        });
                    }

                    var log = 'Transaction ' + results.insertId + ' added';

                    db.query(
                        `
                            INSERT INTO purchased_items
                            (transaction_id, product_id, quantity, total)
                            VALUES ?
                        `,
                        [itemsPlaceholderValues],
                        (error, results, fields) => {
                            if (error) {
                                return db.rollback(function () {
                                    throw error;
                                });
                            }
                            db.commit(function (err) {
                                if (err) {
                                    return db.rollback(function () {
                                        throw err;
                                    });
                                }
                                res.send({
                                    transactionId,
                                    message: "Transaction posted successfully"
                                })
                            });
                        });
                });
        });
    } catch (err) {
        res.status(400).send({
            message: "there was a problem creating your transaction"
        })
    }

}
