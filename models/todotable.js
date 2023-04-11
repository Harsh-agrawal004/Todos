const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;
const users = require('./users')

const todos = sequelize.define('todos' , {
    todo: {
        type : Sequelize.STRING,
        allowNull : false
    },

    isDone : {
        type: Sequelize.BOOLEAN
    }
})

todos.belongsTo(users)
module.exports= todos;