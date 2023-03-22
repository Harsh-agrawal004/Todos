const router = require('express').Router();

const toDoController = require('../controller/ToDoContoller')
router.get('/',toDoController.index)
router.post('/addTodo', toDoController.addTodo)
module.exports = router