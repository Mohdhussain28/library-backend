const Transaction = require('../models/transaction');
const Book = require('../models/book');

exports.issueBook = async (req, res) => {
    const { bookName, userId, issueDate } = req.body;
    try {
        const transaction = new Transaction({
            bookName,
            userId,
            issueDate,
            returnDate: null
        });
        await transaction.save();
        res.json(transaction);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.returnBook = async (req, res) => {
    const { bookName, userId, returnDate } = req.body;
    try {
        const transaction = await Transaction.findOne({ bookName, userId, returnDate: null });
        // console.log("object", transaction)
        if (transaction) {
            const issueDate = new Date(transaction.issueDate);
            const returnDateObj = new Date(returnDate);
            const days = Math.ceil((returnDateObj - issueDate) / (1000 * 60 * 60 * 24));

            const book = await Book.findOne({ bookName });

            if (!book) {
                return res.status(404).send('Book not found');
            }

            const rent = book.rentPerDay * days;

            transaction.returnDate = returnDateObj;
            transaction.totalRent = rent;
            await transaction.save();

            res.json(transaction);
        } else {
            res.status(404).send('Transaction not found or already returned');
        }
    } catch (err) {
        res.status(500).send(err);
    }
};


exports.getTransactionByBookName = async (req, res) => {
    const bookName = req.params.bookName;
    console.log("he", bookName)
    try {
        const book = await Book.findOne({ bookName });

        if (book) {
            const transactions = await Transaction.find({ bookId: book._id }).populate('userId');
            const currentlyIssued = await Transaction.findOne({ bookId: book._id, returnDate: null });

            const response = {
                totalCount: transactions.length,
                currentlyIssued: currentlyIssued ? currentlyIssued.userId.name : 'Not currently issued'
            };
            res.json(response);
        } else {
            res.status(404).send('Book not found');
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getRentByBookName = async (req, res) => {
    const bookName = req.params.bookName;
    try {
        const book = await Book.findOne({ bookName });
        if (book) {
            const transactions = await Transaction.find({ bookId: book._id, totalRent: { $exists: true } });
            const totalRent = transactions.reduce((sum, t) => sum + t.totalRent, 0);
            res.json({ totalRent });
        } else {
            res.status(404).send('Book not found');
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getTransactionsByUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const transactions = await Transaction.find({ userId }).populate('bookId');
        if (transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found for this user.' });
        }
        const books = transactions.map(t => ({
            bookName: t.bookName,
            transactionDetails: t
        }));
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
};


exports.getTransactionsByDateRange = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const transactions = await Transaction.find({
            issueDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
        })
            .populate('bookId')
            .populate({
                path: '_id',
                model: 'User',
                select: 'name',
            });

        res.json(transactions.map(t => ({
            book: t.bookName,
            issuedTo: t.userId ? t.userId.name : 'Not found',
            issueDate: t.issueDate
        })));
    } catch (err) {
        res.status(500).send(err);
    }
};



