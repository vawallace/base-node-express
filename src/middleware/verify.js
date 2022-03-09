const jwt = require('jsonwebtoken');
const encr = require('./encrypt')
const db = require("../models");
const User = db.users;

exports.verify = (req,res,next) => {
    let token;
    
    token = req.cookies.access_token;

    if(!token){
        return res.status(403).send();
    }

    let payload;
    try {
        payload = jwt.verify(token, process.env.JWT_SEC, function(err, decoded) {          
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });      
            } else {
                req.decoded = decoded;  
                next();
            }
        });
    }
    catch(e) {
        console.log(e)
        res.status(500).send({
            message:
            e.message || "An error occurred while verifying the token."
        });
    };
}

exports.verifyPassword = (password) => {
    /* set regex to check for 
    - at least 8 characters
    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
    - Can contain special characters
    */ let check = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return check.test(password);
},

exports.verifyEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email)
}

exports.checkUnique = async (email) => {
    let user = await User.findOne({where:{email: email}});
    return (user == undefined)? false : true;
    
}

exports.comparePassword = async (password, user_password) =>{
    let decryptedPassword = encr.decrypt(user_password);
    if(decryptedPassword !== password) return false;
    return true
}