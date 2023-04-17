const  todos = require('../models/todotable')

const TODO  = []
let id =0

const index = async(req,res) => {
    try{
        const allTodos = await todos.findAll({where:{userId:req.user.id}})
        console.log(allTodos);
        return res.render('ToDo',{allTodos})
    } catch (error){
        console.error(error);
    } 
}

const addTodo =  async(req,res) =>{
    try{
        
        const reqData = req.body ;
        const userId = req.user.id ;
        if(!reqData.todoData) {
            return res.send('please fill all mandatory fields')
        }
        const insertData = await todos.create({
            todo : reqData.todoData,
            userId,
            isDone : false

        })
        if(!insertData){
            return res.send("Something went wrong");
        }
        return res.json({ message: "todo added successful",status: true , toDoObj : insertData})
       
    } catch(error){
        console.error(error)
    }

}

const deleteAll = async(req,res) => {
    try{
        const userId = req.body.userId;
        console.log("reached");
        const deleted = await todos.destroy({where: {userId}, truncate: true})
        return res.json({ message : 'Todo Deleted' , status:true ,toDoAll : deleted})
    } catch(error){
        console.error(error)
    }
}

const check = async(req,res)=>{
    try{
        console.log("working");
        const todoId = req.body.todoId;
        console.log(todoId);
        const result = await todos.update({isDone : true},{where:{id:todoId }})
        return res.json({message:"Task completed successfully",status:true,toDocheck:result})
    }catch(error){
        console.log(error)
    }
}

const getSingleToDo = async(req,res)=>{
    try{
        const todoId = req.query.update;
        console.log(todoId);
        const getAToDo = await todos.findOne({where:{id:todoId}})
        console.log(getAToDo);
        return res.json({message:"update task working",status:true,toDoObj:getAToDo})
    }
    catch(error){
        console.log(error)
    }
}

const updatedTask = async(req,res)=>{
    try{
        console.log(req.body)
        const getUpdatedTodoId = req.body.todooo;
        console.log("response from updated task",getUpdatedTodoId)
        
        
        console.log(getUpdatedTodoId);
        const updateTodo = await todos.update({todo: req.body.value},{where:{id:getUpdatedTodoId}})
        return res.json({message:"update on screen working",status:true,updatedObj:updateTodo})
    }
    catch(error){
            console.log(error)
    }
}
    




module.exports = {
    index,
    addTodo,
    deleteAll,
    check,
    getSingleToDo,
    updatedTask,
} 


