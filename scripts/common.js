"use strict";

window.onload = getInput;

function getInput () {
    const urlParams = new URLSearchParams(location.search);
    
    let newTodo = {};

    if (urlParams.has("ADD"))
    {
        newTodo.userid = urlParams.get("users");
        newTodo.category = urlParams.get("categories");
        newTodo.description = urlParams.get("description");
        newTodo.deadline = urlParams.get("deadline");
        newTodo.priority = urlParams.get("priority");

        console.log(newTodo);
        console.log(JSON.stringify(newTodo));

        addTodo(JSON.stringify(newTodo));
    }

}

function addTodo(newTodo) {

   fetch('http://localhost:8083/api/todos/', {
      method: "POST",
      body: newTodo,
      headers: { "Content-type": "application/json; charset = UTF-8" }
      })
    .then(response => response.json())
    .then(data => {
       // this returns a single course!
       const container = 
          document.getElementById('divMessage');

       for (let elem in data) {
       // display one course property in a <p>
       const todo = document.createElement('p');
       todo.textContent = `${elem}: ${data[elem]}`;
       container.appendChild(todo);   
       // repeat for each field you want to display
       }})
      .catch(error => {
         const container = 
         document.getElementById('divMessage');

         const todo = document.createElement('p');
         todo.textContent = `ERROR !!!`;
         container.appendChild(todo);   
         // handle errors that occurred during the fetch request
       });
   
 }

 function deleteTodo(id) {

    fetch(`http://localhost:8081/api/todos/${id}`, {
      method: "DELETE" })
    .then(response => {
        console.log("Status code: " + response.status);
       })
      .catch(error => {
         console.log(error);
       });
}


