"use strict";

window.onload = init;


function init() {

    let getBtn = document.getElementById("getBtn");

    loadUsers();
    loadCategories();

    getBtn.onclick = displayTodos;
    
}

function loadUsers() {

    let selectTable = document.getElementById("users");

    let fetch_url = `http://localhost:8083/api/users`;

    let option = new Option("All Users", "-1");
    selectTable.append(option);
    fetch(fetch_url)
        .then(response => response.json())
        .then(data => 
        {
            for(let user of data) 
            {
                let option = new Option(user.name, user.id);
                selectTable.append(option);
            }
        })
        .catch(err => {
            console.log("Unable to get users data")
        });

}

function loadCategories() {

    let categoriesTable = document.getElementById("categories");

    let fetch_url = `http://localhost:8083/api/categories`;

    let option = new Option("All Categories", "-1");
    categoriesTable.append(option);
    fetch(fetch_url)
        .then(response => response.json())
        .then(data => 
        {
            for(let category of data) 
            {
                let option = new Option(category.name, category.name);
                categoriesTable.append(option);
            }
        })
        .catch(err => {
            console.log("Unable to get categories data")
        });
}

function displayTodos() {

    let table = document.getElementById("todosTable");

    let userId = document.getElementById("users");
    let category = document.getElementById("categories");

    console.log(userId.value);
    console.log(category.value);

        let fetch_url = `http://localhost:8083/api/todos/`;

        console.log("Table length is "+ table.rows.length)
    
        for (let i=table.rows.length-1; i >= 0 ; i--) {
            table.deleteRow(i);
        }
    
        fetch(fetch_url)
            .then(response => response.json())
            .then(data => 
            {
                let row = table.insertRow(-1);
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);
                let cell5 = row.insertCell(4);
                cell1.innerHTML = "Category";
                cell2.innerHTML = "User";
                cell3.innerHTML = "Deadline";
                cell4.innerHTML = "Priority";
                cell5.innerHTML = "Completed";

                //console.log(data);
    
                for(let todo of data) 
                {
                    if ((userId.value != -1) && (todo.userid != userId.value)) {
                        continue;
                    }
                    else if ((category.value != -1) && (todo.category != category.value))
                    {
                        continue;
                    }
                        let userName = getName(todo.userid);
                        console.log("userName :" + userName);

                        let row = table.insertRow(-1);
                        let cell1 = row.insertCell(0);
                        let cell2 = row.insertCell(1);
                        let cell3 = row.insertCell(2);
                        let cell4 = row.insertCell(3);
                        let cell5 = row.insertCell(4);
                        cell1.innerHTML = todo.category;
                        setUserName(cell2, todo.userid);
                        cell3.innerHTML = todo.deadline;
                        cell4.innerHTML = todo.priority;
                        cell5.innerHTML = todo.completed;
                }
            })
            .catch(err => {
                console.log("Not able to display Todos");
            });
}


function getName(userid)
{

let userName = "TEST TEST";

let usersList = {};

let fetch_url = `http://localhost:8083/api/users/`;
    
let resolvedProm = fetch(fetch_url)
.then(response => response.json())
.then(data => 
{
    console.log(data);
    for (let user of data){
        console.log("Got user id: "+ user.id);
        console.log("Given user id "+ userid)
        if (user.id == userid) {
            console.log("Matched ID");
            return user.name;
        }
    }
})
.catch(err => {
    console.log("Error retrieving user data")
})


/* console.log("Given list " + usersList);
for (let user of usersList){
    if (user.userid == userid) {
        console.log("Matched ID");
        return user.name;
    }
}
*/
console.log("Resolved Promise :" + JSON.stringify(resolvedProm));
return userName;

}

function setUserName(htmlElem, userid)
{

let userName = "TEST TEST";

let usersList = {};

let fetch_url = `http://localhost:8083/api/users/`;
    
let resolvedProm = fetch(fetch_url)
.then(response => response.json())
.then(data => 
{
    console.log(data);
    for (let user of data){
        console.log("Got user id: "+ user.id);
        console.log("Given user id "+ userid)
        if (user.id == userid) {
            console.log("Matched ID");
            htmlElem.innerHTML = user.name;
        }
    }
})
.catch(err => {
    console.log("Error retrieving user data")
})


/* console.log("Given list " + usersList);
for (let user of usersList){
    if (user.userid == userid) {
        console.log("Matched ID");
        return user.name;
    }
}
*/
console.log("Resolved Promise :" + JSON.stringify(resolvedProm));
return userName;

}
