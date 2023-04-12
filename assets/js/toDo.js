const { response } = require("express");

function onSubmitTodo(event) {
    event.preventDefault()
    const todoData = $('#taskform').serializeArray()
    // console.log(todoData);
    const requestBody = todoData.reduce((obj, item) => {
        obj[item.name] = item.value;
        return obj;
    }, {});
    if (!todoData) {
        $('#errorMsg').html('Please fill all Mandatory Fields')
        return;
    }
    $.ajax({
        type: "POST",
        url: "/toDo/addToDo",
        data: todoData,
        success: function (response) {
            console.log("🚀 ~ file: toDo.js:26 ~ response:", response.toDoObj)
            const row = `<tr><td>${response.toDoObj.id}</td>
            <td>${response.toDoObj.todo}</td>
            <td><input type=checkbox class = "checkbox"  data-id = "${response.toDoObj.id}"   placeholder = "tick" onclick = "update(this)" value=${response.toDoObj.isDone}>
             <button id="btn" onclick = "updateTodo(this)" date-update = "${response.toDoObj.id}">Update</button></td></tr> `
     
            $('#toDoBody').append(row)


            // hide_loader();

        },
        error: function (response) {
            // hide_loader();

        },
    });

}
function deleted(event){
    console.log("working")
    event.preventDefault()
    $('#toDoBody').empty()
    $.ajax({
        type: "DELETE",
        url : "/toDo/deleteAll",
        success : function(response){
            console.log(response.toDoAll)
        }
    })
}

function update(_this){
    console.log("working");
    const check = $(_this).data('id');
    console.log(check)
    $.ajax({
        type: "PUT",
        url: "/toDo/check",
        data :{check},
        success:function(response){
            console.log(response)
        }
    })
}



