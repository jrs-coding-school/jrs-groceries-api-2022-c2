const db = require('../index');
const { v4: uuid } = require('uuid');

exports.getAllPurchasedItems = (req, res) => {
    const script = `
    SELECT *
    FROM purchased_items;
    `;

    db.query(script, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem finding all purchased items, please try again'
            })
        } else if (results.length == 0) {
            res.status(404).send({
                error: err,
                message: 'No purchased items were found'
            })
        } else {
            res.send(results)
        }

    })
}

exports.getPurchasedItemsById = (req, res) => {

    const { id } = req.params

    const script = `
    SELECT *
    FROM purchased_items
    WHERE id = ?
    `

    const placeholderValues = [id];

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem finding this purchased item, please try again'
            })
        } else if (results.length == 0) {
            res.status(404).send({
                error: err,
                message: 'There was no purchased item at this id, please input a valid id'
            })
        } else {
            res.send(results[0])
        }
    })
}

exports.createPurchasedItem = async (req, res) => {

    const { productId, quantity, transactionId, total } = req.body

    if (!productId || (typeof productId != 'string')) {
        res.status(400).send({
            message: 'productID is already in use'
        });
        return;
    } else if (!quantity || (typeof quantity != 'string')) {
        res.status(400).send({
            message: 'Quantity input is invalid'
        });
        return;
    } else if (!transactionId || (typeof transactionId != 'string')) {
        res.status(400).send({
            message: 'TransactionID input is invalid'
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
    INSERT INTO purchased_items
        (id, product_id, quantity, transaction_id, total) 
    VALUES
        (?, ?, ?, ?, ?);
    `;

    const placeholderValues = [id, productId, quantity, transactionId, total];

    db.query(script, placeholderValues, (err, results) => {

        if (err || results.affectedRows == 0) {
            res.status(500).send({
                error: err,
                message: 'There was an error creating the purchased item. Please try again.'
            });
            return;
        }
        res.send({
            message: "Purchased Item was created successfully",
            newPurchasedItemId: id
        });
    });
}

exports.deletePurchasedItemById = (req, res) => {

    let { id } = req.params

    const script = `
        DELETE
        FROM purchased_items
        WHERE id = ?
    `

    const placeholderValues = [id];

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem deleting your purchased item, please try again'
            })
            return;
        } else if (results.affectedRows == 0) {
            res.status(400).send({
                error: err,
                message: 'There was no purchased item at this id, please enter a valid id'
            })
        } else {
            res.send({
                message: 'Purchased Item was successfully deleted'
            })
        }
    })
}