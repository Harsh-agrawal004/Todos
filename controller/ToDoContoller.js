const TODO = []
const addTodo = (req,res) =>{
    try{
        const reqData = req.body;
        const id = 0 ;
        if(!reqData.taskinput) {
            return res.send('please fill required fields')
        }
        const toDoObj = {
            toDoId: ++id ,
            toDoData: reqData.taskinput,
            isToDoDone: false
        }
        TODO.push(toDoObj)
        return res.send('Todo added')

    } catch(error){}

}
const index = (req,res) => {
    try{
        return res.render('ToDo')
    } catch (error){} 
}

module.exports = {
    index,
    addTodo
} 


