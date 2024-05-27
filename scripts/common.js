"use strict";

window.onload = init;

function init() {
   
   getInput();
}

function getInput () {
    const urlParams = new URLSearchParams(location.search);
    
    let newTodo = {};
    let newUser = {};

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

    if (urlParams.has("ADD-USER"))
    {
      newUser.name = urlParams.get("name");
      newUser.username = urlParams.get("password");
      newUser.password = urlParams.get("description");

      console.log(newUser);
      console.log(JSON.stringify(newUser));

      addUser(JSON.stringify(newUser));
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

       const todo = document.createElement('p');
       todo.textContent = "Successfully added Todo. Redirecting to home page...";
       container.appendChild(todo);   
       setTimeout(() => {
         window.location.replace("index.html");
       }, "2000");
       // repeat for each field you want to display
       })
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

function matchPasswords() {
   let formData = document.getElementById("newUserForm");

   if (formData.elements['ConfirmPassword'] === formData.elements['Password'])
   {
      formData.elements['ConfirmPassword'].setCustomValidity("Passwords do not match.Please try again")
      formData.elements['ConfirmPassword'].classList.add("is-invalid");
   }
   else
   {
      formData.elements['ConfirmPassword'].setCustomValidity("")
      formData.elements['ConfirmPassword'].classList.remove("is-invalid");
      formData.elements['ConfirmPassword'].classList.add("is-valid");
   }
}

function addUser(newUser) {

   fetch('http://localhost:8083/api/users/', {
      method: "POST",
      body: newUser,
      headers: { "Content-type": "application/json; charset = UTF-8" }
      })
    .then(response => response.json())
    .then(data => {
       // this returns a single course!
       const container = 
          document.getElementById('divMessage');

       const todo = document.createElement('p');
       todo.textContent = "Successfully added User. Redirecting to home page...";
       container.appendChild(todo);   
       setTimeout(() => {
         window.location.replace("index.html");
       }, "2000");
       // repeat for each field you want to display
       })
      .catch(error => {
         const container = 
         document.getElementById('divMessage');

         const todo = document.createElement('p');
         todo.textContent = `ERROR !!!`;
         container.appendChild(todo);   
         // handle errors that occurred during the fetch request
       });
   
 }
