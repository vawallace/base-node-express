const db = require("../../models/index");
const User = db.users;
const encr = require('../../middleware/encrypt')
const { comparePassword } = require('../../middleware/verify')
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const encrypted = encr.encrypt(password);

    const created = {
        first_name, last_name, email, password: encrypted
    };

    const saved = await User.create(created);

    const access_token = jwt.sign({ id: saved.id }, process.env.JWT_SEC, {
        expiresIn: 86400
    })

    res.status(200).json({access_token})
}

exports.login = async (req, res) => {
    const user = await User.findOne({ where:{ email: req.body.email }});
    const password = await comparePassword(req.body.password, user.password)

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