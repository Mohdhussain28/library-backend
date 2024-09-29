const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new mongoose.Schema({
    bookId: { type: Schema.Types.ObjectId },
    bookName: { type: String, ref: 'Book', required: true },
    userId: { type: String, ref: 'User', required: true },
    issueDate: { type: Date, required: true },
    returnDate: { type: Date },
    totalRent: { type: Number }
});

module.exports = mongoose.model('Transaction', transactionSchema);
