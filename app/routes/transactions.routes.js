module.exports = (app) => {

    const transactions = require('../controllers/transactions.controller');

    app.get('/api/transactions', transactions.getAllTransactions);
    app.get('/api/transactions/:id', transactions.getTransactionsById);
    app.get('/api/transactions/user/:id', transactions.getTransactionsByUserId);

    app.post('/api/transactions', transactions.createTransaction);
}