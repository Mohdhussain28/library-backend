const express = require("express");
const cors = require('cors');
const bodyparser = require('body-parser');
const ckey = require('ckey')
const connectDB = require('./config/database');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

app.use(cors({ origin: true }))
app.use(express.json())
// app.use(bodyparser.urlencoded({ extended: true }))

connectDB();

app.get("/hi", async (req, res) => {
    res.send("hello")
})
app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

const PORT = ckey.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
