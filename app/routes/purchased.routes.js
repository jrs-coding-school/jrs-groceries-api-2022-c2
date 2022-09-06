module.exports = (app) => {

    const purchased = require('../controllers/purchased.controller');

    app.get('/api/purchased', purchased.getAllPurchasedItems);
    app.get('/api/purchased/:id', purchased.getPurchasedItemsById);

    app.post('/api/purchased', purchased.createPurchasedItem);

    app.delete('/api/purchased/:id', purchased.deletePurchasedItemById);

}