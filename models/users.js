const Sequelize = require('sequelize')
const sequelize = require('./index').sequelize
const roles = require('./roles');

const user = sequelize.define('users', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    designation: {
        type: Sequelize.STRING,
        allowNull: true
    },
})

user.belongsTo(roles);

module.exports = user