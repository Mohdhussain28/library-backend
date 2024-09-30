const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/issue', transactionController.issueBook);
router.post('/return', transactionController.returnBook);
router.get('/book/:bookName', transactionController.getTransactionByBookName);
router.get('/rent/:bookName', transactionController.getRentByBookName);
router.get('/user/:userId', transactionController.getTransactionsByUser);
router.get('/daterange', transactionController.getTransactionsByDateRange);

module.exports = router;
