const router = require('express').Router();

const toDoController = require('../controller/ToDoContoller')
router.get('/',toDoController.index)
router.post('/addTodo', toDoController.addTodo)
router.delete('/deleteAll',toDoController.deleteAll)
router.put("/check",toDoController.check)
router.get("/getSingleToDo",toDoController.getSingleToDo)
router.put("/updatedTask",toDoController.updatedTask)
router.get("/userData",toDoController.userData)
router.put('/changeUserDetails',toDoController.changeUserDetails)
// router.put("/updateTodo",toDoController.update)

module.exports = router