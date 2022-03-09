module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING
        },
    });

    return User;
};
