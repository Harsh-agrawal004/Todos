const rTodo = require('./r-ToDo')
module.exports = (app) => {
    app.use("/toDo",rTodo)
   
}
