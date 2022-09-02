module.exports = (app) => {

    const products = require('../controllers/products.controller');

    app.get('/api/products', products.getAllProducts);
    app.get('/api/products/:category', products.getProductsByCategory)

}