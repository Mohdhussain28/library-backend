const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/search', bookController.getBooksByTerm);
router.get('/rent', bookController.getBooksByRentRange);
router.get('/category', bookController.getBooksByCategoryTermRent);
router.get('/all', bookController.getAllBooks);

module.exports = router;
