const  todos = require('../models/todotable')

const TODO  = []
let id =0

const index = (req,res) => {
    try{
        return res.render('ToDo')
    } catch (error){
        console.error(error);
    } 
}

const addTodo =  async(req,res) =>{
    try{
        console.log("dbjbjc");
        const reqData = req.body ;
        const userId = req.user.id ;
        if(!reqData.taskinput) {
            return res.send('please fill all mandatory fields')
        }
        const insertData = await todos.create({
            todo : reqData.taskinput,
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
        console.log("reached");
        const deleted = await todos.destroy({where: {}, truncate: true})
        return res.json({ message : 'Todo Deleted' , status:true ,toDoAll : deleted})
    } catch(error){
        console.error(error)
    }
}

const check = async(req,res)=>{
    try{
        console.log("working");
        const userId = req.body.check
        console.log(userId);
        const result = await todos.update({isDone :"true"},{where:{id:NewUserId}})
        return res.json({message:"Task completed successfully",status:true,toDocheck:result})
    }catch(error){
        console.log(error)
    }
}



module.exports = {
    index,
    addTodo,
    deleteAll,
    check
} 


