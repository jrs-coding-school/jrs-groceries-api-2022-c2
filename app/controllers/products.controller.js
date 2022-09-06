const db = require('../index');
const { v4: uuid } = require('uuid');

exports.getAllProducts = (req, res) => {
    const script = `
        SELECT * 
        FROM products
    `;

    db.query(script, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem finding all products, please try again'
            })
        } else if (results.length == 0) {
            res.status(404).send({
                error: err,
                message: 'No products were found'
            })
        } else {
            res.send(results)
        }

    })
}

exports.getProductsByCategory = (req, res) => {

    const { category } = req.params

    const script = `
    SELECT *
    FROM products
    WHERE category = ?
    `

    const placeholderValues = [category];

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem finding this category, please try again'
            })
        } else if (results.length == 0) {
            res.status(404).send({
                error: err,
                message: 'There was no data at this category, please input a valid category'
            })
        } else {
            res.send(results)
        }
    })
}

exports.getFeaturedProducts = (req, res) => {
    const script = `
        SELECT * 
        FROM featured_products
        INNER JOIN products
            ON products.id = featured_products.product_id;
    `;

    db.query(script, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem finding all products, please try again'
            })
        } else if (results.length == 0) {
            res.status(404).send({
                error: err,
                message: 'No products were found'
            })
        } else {
            res.send(results)
        }

    })
}

exports.getProductsById = (req, res) => {

    const { id } = req.params

    const script = `
        SELECT *
        FROM products
        WHERE id = ?
    `

    const placeholderValues = [id];

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem finding this product, please try again'
            })
        } else if (results.length == 0) {
            res.status(404).send({
                error: err,
                message: 'There was no product at this id, please input a valid id'
            })
        } else {
            res.send(results[0])
        }
    })
}

exports.createProduct = (req, res) => {

    const { name, price, category, brand, description, image } = req.body

    if (!name || (typeof name != 'string')) {
        res.status(400).send({
            message: 'product name is invalid'
        });
        return;
    } else if (!price || (typeof price != 'number')) {
        res.status(400).send({
            message: 'invalid price input'
        });
        return;
    } else if (!category || (typeof category != 'string')) {
        res.status(400).send({
            message: 'invalid category input'
        });
        return;
    } else if (!brand || (typeof brand != 'string')) {
        res.status(400).send({
            message: 'invalid brand input'
        });
        return;
    } else if (!description || (typeof description != 'string')) {
        res.status(400).send({
            message: 'invalid description input'
        });
        return;
    } else if (!image || (typeof image != 'string')) {
        res.status(400).send({
            message: 'invalid image input'
        });
        return;
    }

    const script = `
        INSERT INTO products
            (id, name, price, category, brand, description, image)
        VALUES
            (?, ?, ?, ?, ?, ?, ?);
    `;
    const id = uuid();

    const placeholderValues = [id, name, price, category, brand, description, image];

    db.query(script, placeholderValues, (err, results) => {
        if (err || results.affectedRows == 0) {
            res.status(500).send({
                error: err,
                message: 'There was an error creating the product. Please try again.'
            });
            return;
        }
        res.send({
            message: "Product was created successfully",
            newProductId: id
        });
    });
}

exports.updateProduct = async (req, res) => {
    const { id } = req.params
    const { name, price, category, brand, description, image } = req.body

    if (!name || (typeof name != 'string')) {
        res.status(400).send({
            message: 'product name is invalid'
        });
        return;
    } else if (!price || (typeof price != 'number')) {
        res.status(400).send({
            message: 'invalid price input'
        });
        return;
    } else if (!category || (typeof category != 'string')) {
        res.status(400).send({
            message: 'invalid category input'
        });
        return;
    } else if (!brand || (typeof brand != 'string')) {
        res.status(400).send({
            message: 'invalid brand input'
        });
        return;
    } else if (!description || (typeof description != 'string')) {
        res.status(400).send({
            message: 'invalid description input'
        });
        return;
    } else if (!image || (typeof image != 'string')) {
        res.status(400).send({
            message: 'invalid image input'
        });
        return;
    }

    const script = `
        UPDATE products 
        SET name = ?, 
            price = ?, 
            category = ?, 
            brand = ?, 
            description = ?, 
            image = ?
        WHERE id = ?;
    `;

    const placeholderValues = [name, price, category, brand, description, image, id]

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: "There was a problem editing the product"
            })
            return
        } else if (results.affectedRows == 0) {
            res.status(404).send({
                message: "No product was updated with that id",
                id
            })
            return;
        } else {
            res.send(results)
            message: "Your product was updated"
            id
        }
    })
}

exports.deleteProductById = (req, res) => {

    let { id } = req.params

    const script = `
        DELETE
        FROM products
        WHERE id = ?
    `

    const placeholderValues = [id];

    db.query(script, placeholderValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: 'There was a problem deleting your product, please try again'
            })
            return;
        } else if (results.affectedRows == 0) {
            res.status(400).send({
                error: err,
                message: 'There was no product at this id, please enter a valid id'
            })
        } else {
            res.send({
                message: 'Product was successfully deleted'
            })
        }
    })
}