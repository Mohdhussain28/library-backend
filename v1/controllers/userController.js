const User = require('../models/user');
const uuid = require("uuid")

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.insertUsers = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const userId = uuid.v4();
    try {
        const users = await User.create({ name, email, userId });
        res.json(users)
    } catch (err) {
        res.status(500).send(err);
    }
}
