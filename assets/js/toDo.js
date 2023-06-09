function onSubmitTodo(event) {
    console.log(".....")
    event.preventDefault()
    const todoData = $('#taskinput').val()
    $.ajax({
        type: "POST",
        url: "/toDo/addToDo",
        data: { todoData },
        success: function (response) {
            console.log("🚀 ~ file: toDo.js:26 ~ response:", response.toDoObj)
            const row = `<tr><td>${response.toDoObj.id}</td>
            <td id="todo_box">${response.toDoObj.todo}</td>
            <td><input type=checkbox class = "checkbox"  data-todoId = "${response.toDoObj.id}"   placeholder = "tick" onclick = "update(this)" value=${response.toDoObj.isDone}>
             <button id="btn" onclick = "getTodo(this)" data-update = "${response.toDoObj.id}">Update</button></td></tr> `
     
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
    const todoId = $(_this).data('todoid');
    console.log(todoId)
    $.ajax({
        type: "PUT",
        url: "/toDo/check",
        data :{todoId},
        success:function(response){
            console.log(response)
        }
    })
}

function getTodo(_this){
    console.log("updateTodo working", 
    _this);
    const update = $(_this).data('todoid');
    console.log(update,"update working");
    $.ajax({
        type:"GET",
        url: "/toDo/getSingleToDo",
        data:{update},
        success :function(response){
            console.log(response);
            $('#taskinput').val(response.toDoObj.todo)
            $('#tasksubmit').val("Update Task") ;
            $('#submitTodo').html(`
            <input type="button" id="updatetasksubmit" onclick="updatetask(this)" value="Update Task" data-todoid=${response.toDoObj.id}>`)
            
           
        }
    })
}

function updatetask(_this){
   
    const todoId = $(_this).data('todoid');
    const value = $("#taskinput").val();
    console.log(todoId);
    $.ajax({
        type:"PUT",
        url:"/toDo/updatedTask",
        data:{todoId,value},
        success:
        function(response){
            console.log(response);
            window.location.reload();
          
        }
    })
}
function user(_this){
    document.querySelector('#header').style.display = "none";
    document.querySelector('#header').style.pointerEvents = "none";
     document.querySelector('#main').style.display = "none";
     document.querySelector('#main').style.pointerEvents = "none";
     document.querySelector('.form').style.display = "block";
     document.querySelector('.form').style.pointerEvents = "all";
 $(".btn-info").val("HOME");
    $(".user").html(` <input type="submit" class="btn btn-info" value="HOME" onclick="userToHome(event)">`);
    const userid = $(_this).data('user');
    $.ajax({
        type:"GET",
        url:"/toDo/userData",
      
        data:{userid},
        success:
        function(response){
            console.log(response);
            $('#exampleInputfirstName').val(response.object1.firstName);
            $('#exampleInputlastname').val(response.object1.lastName);
            $('#exampleInputEmail1').val(response.object1.email);
            $('#exampleInputPassword1').val(response.object1.password);
        }})

}

function userToHome(event){
    
    window.location.reload();
}
function Submituser(event){
    event.preventDefault();
    const newEmail = $('#exampleInputEmail1').val();
    const newFname =  $('#exampleInputfirstName').val();
    const newLname =  $('#exampleInputlastname').val();
    // const newPass =  $('#exampleInputPassword1').val();
   
    $.ajax({
        type:"PUT",
        url:"/toDo/changeUserDetails",

        data:{newEmail,newFname,newLname},
        success:
        function(response){
            console.log(response);
            
        }
        })
}



