const db = require('../index');

exports.getAllProducts = (req, res) => {
    const script =
        `SELECT * 
            FROM products`;

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