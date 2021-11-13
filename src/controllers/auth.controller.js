const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
    const { name, email, password } = req.body;
    const created = new User({
        name, email, password: await User.encryptPassword(password)
    });

    const saved = await created.save();

    const access_token = jwt.sign({ id: saved.id }, process.env.JWT_SEC, {
        expiresIn: 86400
    })

    res.status(200).json({access_token})
}

exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const password = await User.comparePassword(req.body.password, user.password)

    if(!user || !req.body.password || !password) res.status(401).json({
        message: "The username or password are incorrect. Please try again, or contact the site admin."
    })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SEC, {
        expiresIn: 86400
    })

    return res.json({
        id: user.id,
        name: user.name,
        token: token
    })
}

exports.refresh = async (req, res) => {
    
}