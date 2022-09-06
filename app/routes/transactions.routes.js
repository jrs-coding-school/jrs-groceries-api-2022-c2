module.exports = (app) => {

    const transactions = require('../controllers/transactions.controller');

    app.get('/api/transactions', transactions.getAllTransactions);
    app.get('/api/transactions/:id', transactions.getTransactionsById);

    app.post('/api/transactions', transactions.createTransaction);

    app.delete('/api/transactions/:id', transactions.deleteTransactionById);

}