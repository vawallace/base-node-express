const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
    const { name, email, password } = req.body;
    const created = new User({
        name, email, password: await User.encryptPassword(password)
    });

    const saved = await created.save();

    const access_token = jwt.sign({ id: saved._id }, process.env.JWT_SEC, {
        expiresIn: 86400
    })

    res.status(200).json({access_token})
}