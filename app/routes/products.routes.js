module.exports = (app) => {

    const products = require('../controllers/products.controller');

    app.get('/api/products', products.getAllProducts);

    app.get('/api/products/featured', products.getFeaturedProducts);
    app.get('/api/products/:name', products.getProductsByName)
    app.get('/api/products/product-id/:id', products.getProductsById);
    app.get('/api/products/category/:category', products.getProductsByCategory)

    app.post('/api/products', products.createProduct);

    app.put('/api/products/:id', products.updateProduct);

    app.delete('/api/products/:id', products.deleteProductById);

}