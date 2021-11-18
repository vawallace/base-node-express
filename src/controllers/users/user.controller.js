const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const required = [req.body.first_name,req.body.last_name,req.body.password,req.body.email];
    if (!req.body.every(r => required.includes(r))) {
        res.status(400).send({
            message: "All fields are required to create a new user."
        });
    }

    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
    }

    User.create(user)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "The user could not be created. Please check your entries and try again."
        });
    });
};

exports.findAll = (req, res) => {
    User.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "The users could not be retrieved. Please try again."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.param.user_id

    User.findByPk(id)
    .then(data => {
        data? res.send(data)
            : res.status(500).send({
                message:
                    err.message || "An error occurred while retrieving the user by id."
            });

    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "The user could not be retrieved. Please try again."
        });
    });
};

exports.update = (req, res) => {
    const user = {}

    if(req.body.first_name) user.first_name = req.body.first_name;
    if(req.body.last_name) user.last_name = req.body.last_name;
    if(req.body.email) user.email = req.body.email;
    if(req.body.password) user.password = req.body.password;

    User.update(user)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "The user could not be updated. Please check your entries and try again."
        });
    });
};

exports.delete = (req, res) => {
    const id = req.param.user_id

    User.delete(id)
    .then(num =>{
        if (num == 1) {
            res.send({
                message: "User with id=" + id + " successfully deleted."
            })
        } else {
            res.status(400).send({
                message: "User with id=" + id + " could not be deleted. Check your request and try again."
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete user with id=" + id
        });
    });
};