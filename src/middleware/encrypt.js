const crypto = require('crypto-js'),
    password = process.env.ENCRYPT

exports.encrypt = function(text){
    var encrypted = crypto.AES.encrypt(text, password).toString();
    return encrypted;
};

exports.decrypt = function(encr){
    var decrypted = crypto.AES.decrypt(encr, password).toString(crypto.enc.Utf8);
    return decrypted;
}