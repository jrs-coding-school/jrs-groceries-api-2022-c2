const db = require('../index');
const { v4: uuid } = require('uuid');

exports.getAllCartItems = (req, res) => {
    const script = `
        SELECT * 
        FROM cart_items;
    `;

    db.query(script, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem finding all cart items, please try again'
            })
        } else if (results.length == 0) {
            res.status(404).send({
                error: err,
                message: 'No cart items were found'
            })
        } else {
            res.send(results)
        }

    })
}

exports.getCartItemsById = (req, res) => {

    const { id } = req.params

    const script = `
        SELECT *
        FROM cart_items
        WHERE id = ?
    `

    const placeholderValues = [id];

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem finding this cart item, please try again'
            })
        } else if (results.length == 0) {
            res.status(404).send({
                error: err,
                message: 'There was no cart item at this id, please input a valid id'
            })
        } else {
            res.send(results[0])
        }
    })
}

exports.createCartItems = (req, res) => {

    const { customerId, productId, quantity, total } = req.body

    if (!customerId || (typeof customerId != 'string')) {
        res.status(400).send({
            message: 'Customer ID is invalid'
        });
        return;
    } else if (!productId || (typeof productId != 'number')) {
        res.status(400).send({
            message: 'Product ID is invalid'
        });
        return;
    } else if (!quantity || (typeof quantity != 'number')) {
        res.status(400).send({
            message: 'Quantity input is invalid'
        });
        return;
    } else if (!total || (typeof total != 'number')) {
        res.status(400).send({
            message: 'Total input is invalid'
        });
        return;
    }

    const script = `
        INSERT INTO cart_items
        (customer_id, product_id, quantity, total)
        VALUES
            (?, ?, ?, ?);
    `;
    const id = uuid();

    const placeholderValues = [customerId, productId, quantity, total];

    db.query(script, placeholderValues, (err, results) => {
        if (err || results.affectedRows == 0) {
            res.status(500).send({
                error: err,
                message: 'There was an error creating the cart item. Please try again.'
            });
            return;
        }
        res.send({
            message: "Cart item was created successfully",
            newCartItemId: id
        });
    });
}

exports.updateCartItemsById = async (req, res) => {
    const { id } = req.params
    const { quantity, total } = req.body

    if (!quantity || (typeof quantity != 'string')) {
        res.status(400).send({
            message: 'quantity input is invalid'
        });
        return;
    } else if (!total || (typeof total != 'string')) {
        res.status(400).send({
            message: 'invalid total input'
        });
        return;
    }

    const script = `
    UPDATE cart_items
    SET quantity = ?, total = ?
    WHERE id = ?;`


    const placeholderValues = [quantity, total, id]

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: "There was a problem editing the cart item"
            })
            return
        } else if (results.affectedRows == 0) {
            res.status(404).send({
                message: "No cart item was updated with that id",
                id
            })
            return;
        } else {
            res.send(results)
            message: "Your cart item was updated"
        }
    })
}

exports.deleteCartItemsById = (req, res) => {

    let { id } = req.params

    const script = `
        DELETE
        FROM cart_items
        WHERE id = ?
    `

    const placeholderValues = [id];

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem deleting your cart item, please try again'
            })
            return;
        } else if (results.affectedRows == 0) {
            res.status(400).send({
                error: err,
                message: 'There was no cart item at this id, please enter a valid id'
            })
        } else {
            res.send({
                message: 'cart item was successfully deleted'
            })
        }
    })
}