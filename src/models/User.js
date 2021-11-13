const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});

userModel.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(20)
    return await bcrypt.hash(password, salt)
}

userModel.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
};

module.exports = mongoose.model('User', userModel);