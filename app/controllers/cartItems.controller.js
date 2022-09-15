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

exports.getCartItemsByUserId = (req, res) => {

    const { customerId } = req.params

    const script = `
        SELECT products.id, name, size, category, brand, description, image, quantity, total, price
            FROM cart_items
        INNER JOIN products 
            ON products.id = cart_items.product_id
        WHERE customer_id = ?
        ORDER BY products.name;
    `;

    const placeholderValues = [customerId];

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
            res.send(results)
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
            message: 'Quantity input is invalid',
        });
        console.log(quantity, typeof quantity)
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

exports.increaseItemQuantity = async (req, res) => {
    const { customerId, productId, price } = req.body
    console.log(req.body, !price)
    if (!customerId || (typeof customerId != 'string')) {
        res.status(400).send({
            message: 'customer id is invalid'
        });
        return;
    } else if (!productId || (typeof productId != 'number')) {
        res.status(400).send({
            message: 'invalid total input'
        });
        return;
    } else if (!price || (typeof price != 'number')) {
        res.status(400).send({
            message: 'invalid total input'
        });
        return;
    }

    const script = `
        UPDATE cart_items
        SET quantity = quantity + 1,
            total = total + ?
        WHERE customer_id = ?
            AND product_id = ?
    `;


    const placeholderValues = [price, customerId, productId]

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

exports.decreaseItemQuantity = async (req, res) => {
    const { customerId, productId, price } = req.body
    console.log(req.body, !price)
    if (!customerId || (typeof customerId != 'string')) {
        res.status(400).send({
            message: 'customer id is invalid'
        });
        return;
    } else if (!productId || (typeof productId != 'number')) {
        res.status(400).send({
            message: 'invalid total input'
        });
        return;
    } else if (!price || (typeof price != 'number')) {
        res.status(400).send({
            message: 'invalid total input'
        });
        return;
    }

    const script = `
        UPDATE cart_items
        SET quantity = quantity - 1,
            total = total + ?
        WHERE customer_id = ?
            AND product_id = ?
    `;


    const placeholderValues = [price, customerId, productId]

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

exports.removeFromCart = (req, res) => {

    let { customerId, productId } = req.params

    const script = `
        DELETE
        FROM cart_items
        WHERE customer_id = ?
            AND product_id = ?
    `

    const placeholderValues = [customerId, productId];

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