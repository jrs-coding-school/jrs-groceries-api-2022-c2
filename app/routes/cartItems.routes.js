module.exports = (app) => {

    const cartItems = require('../controllers/cartItems.controller');

    app.get('/api/cartItems', cartItems.getAllCartItems);
    app.get('/api/cartItems/:id', cartItems.getCartItemsById);

    app.post('/api/cartItems', cartItems.createCartItems);

    app.put('/api/cartItems/:id', cartItems.updateCartItemsById);

    app.delete('/api/cartItems/:id', cartItems.deleteCartItemsById);

}