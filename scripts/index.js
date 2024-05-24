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
    let summary = document.getElementById("summary");

    let userId = document.getElementById("users");
    let category = document.getElementById("categories");
    let high = document.getElementById("high");
    let medium = document.getElementById("medium");
    let low = document.getElementById("low");

    console.log("High : " + high.checked);
    console.log("Medium : " + medium.checked);
    console.log("Low : " + low.checked);

    //console.log(userId.value);
    //console.log(category.value);

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
                cell1.innerText = "Category";
                cell2.innerText = "User";
                cell3.innerText = "Deadline";
                cell4.innerText = "Priority";
                cell5.innerText = "Completed";

                //console.log(data);
                let totalTodos = 0;
                let pendingTodos = 0;
                let highTodos = 0;
                let mediumTodos = 0;
                let lowTodos = 0;

                for(let todo of data) 
                {
                    if ((userId.value != -1) && (todo.userid != userId.value)) {
                        continue;
                    }
                    else if ((category.value != -1) && (todo.category != category.value))
                    {
                        continue;
                    }

                    if ((todo.priority === "High") && (high.checked === false))
                    {
                        continue;
                    }
                    if ((todo.priority === "Medium") && (medium.checked === false))
                    {
                        continue;
                    }
                    if ((todo.priority === "Low") && (low.checked === false))
                    {
                        continue;
                    }

                    totalTodos ++;
                        //let userName = getName(todo.userid);
                        //console.log("userName :" + userName);

                        let row = table.insertRow(-1);
                        let cell1 = row.insertCell(0);
                        let cell2 = row.insertCell(1);
                        let cell3 = row.insertCell(2);
                        let cell4 = row.insertCell(3);
                        let cell5 = row.insertCell(4);
                        cell1.innerText = todo.category;
                        //cell2.innerText = getName(todo.userid);
                        setUserName(cell2, todo.userid);
                        cell3.innerText = todo.deadline;
                        cell4.innerText = todo.priority;
                        cell5.innerText = todo.completed;
                        if (todo.completed === false) {
                            pendingTodos ++;
                            switch(todo.priority) {
                                case "High":
                                    highTodos++;
                                    break;
                                case "Medium":
                                    mediumTodos++;
                                    break;
                                default:
                                    lowTodos++;
                            } 
                        }

                }
                summary.innerHTML = `Total: ${totalTodos}, Pending: ${pendingTodos}, 
                                     High: ${highTodos}, Medium: ${mediumTodos}, Low: ${lowTodos}`;

                if (totalTodos === 0) {
                    table.deleteRow(0);
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

fetch(fetch_url)
.then(response => response.json())
.then(data => 
{
    console.log(data);
    for (let user of data){
        console.log("Got user id: "+ user.id);
        console.log("Given user id "+ userid)
        if (user.id == userid) {
            console.log("Matched ID");
            console.log("Matched user name "+ user.name);
            return user.name;
        }
    }
})
.catch(err => {
    console.log("Error retrieving user data")
});

console.log("Got user name "+ userName);
//return userName;

}

function setUserName(htmlElem, userid)
{

let userName = "TEST TEST";

let fetch_url = `http://localhost:8083/api/users/`;
    
fetch(fetch_url)
.then(response => response.json())
.then(data => 
{
    //console.log(data);
    for (let user of data){
        //console.log("Got user id: "+ user.id);
        //console.log("Given user id "+ userid)
        if (user.id == userid) {
            //console.log("Matched ID");
            htmlElem.innerText = user.name;
        }
    }
})
.catch(err => {
    console.log("Error retrieving user data")
})

return userName;

}
