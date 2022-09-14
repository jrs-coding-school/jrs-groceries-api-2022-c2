module.exports = (app) => {

    const cartItems = require('../controllers/cartItems.controller');

    app.get('/api/cartItems', cartItems.getAllCartItems);
    app.get('/api/cartItems/:customerId', cartItems.getCartItemsByUserId);

    app.post('/api/cartItems', cartItems.createCartItems);

    app.put('/api/cartItems/increase', cartItems.increaseItemQuantity);
    app.put('/api/cartItems/decrease', cartItems.decreaseItemQuantity);

    app.delete('/api/cartItems/:customerId/:productId', cartItems.removeFromCart);

}