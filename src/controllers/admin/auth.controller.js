const db = require("../../models/index");
const User = db.users;
const encr = require('../../middleware/encrypt')
const { comparePassword, verifyEmail, checkUnique } = require('../../middleware/verify')
const jwt = require('jsonwebtoken');

const requiredFields = [
    'first_name',
    'last_name',
    'password',
    'email'
]

exports.signUp = async (req, res) => {
    let incoming = {first_name: req.body.first_name,last_name: req.body.last_name,email: req.body.email,password: encr.encrypt(req.body.password)};

    if (Object.values(incoming).some(x => x == '')) {
        res.status(400).send({
            message: "All fields are required to register a new user."
        });
    }

    if(!verifyEmail(incoming.email)){
        res.status(400).send({
            message: "A valid email format is required."
        });
    }

    if(await checkUnique(incoming.email) == true){
        res.status(400).send({
            message: "A user with that email has already registered."
        });
    }

    try {
        const saved = await User.create(incoming);
        const access_token = jwt.sign({ id: saved.id }, process.env.JWT_SEC, {
            expiresIn: 86400
        })

        res.status(200).json({access_token})
    } catch (error) {
        res.status(500).send({
            message: "There was an error creating the user."
        });
    }
    
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