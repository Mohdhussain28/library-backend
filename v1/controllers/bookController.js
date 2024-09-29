const Book = require('../models/book');

exports.getBooksByTerm = async (req, res) => {
    const term = req.query.term;
    try {
        const books = await Book.find({ bookName: { $regex: term, $options: 'i' } });
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getBooksByRentRange = async (req, res) => {
    const { minRent, maxRent } = req.query;
    try {
        const books = await Book.find({
            rentPerDay: { $gte: minRent, $lte: maxRent }
        });
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getBooksByCategoryTermRent = async (req, res) => {
    const { category, term, minRent, maxRent } = req.query;
    try {
        const books = await Book.find({
            category: category,
            bookName: { $regex: term, $options: 'i' },
            rentPerDay: { $gte: minRent, $lte: maxRent }
        });
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
};
