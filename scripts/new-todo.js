"use strict"

window.onload = init;

function init() {

    loadUsers();
    loadCategories();
}

function loadUsers() {

    let selectTable = document.getElementById("users");

    let fetch_url = `http://localhost:8083/api/users`;

    let option = new Option("Select a user", "");
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

    let option = new Option("Select a category", "");
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

    let table = document.getElementById("todos");

    let userId = document.getElementById("users");

    let fetch_url = `http://localhost:8083/api/todos/byuser/${userId.value}`;

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
            cell2.innerHTML = "Description";
            cell3.innerHTML = "Deadline";
            cell4.innerHTML = "Priority";
            cell5.innerHTML = "Completed";

            for(let todo of data) 
            {
                    let row = table.insertRow(-1);
                    let cell1 = row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    let cell3 = row.insertCell(2);
                    let cell4 = row.insertCell(3);
                    let cell5 = row.insertCell(4);
                    cell1.innerHTML = todo.category;
                    cell2.innerHTML = todo.description;
                    cell3.innerHTML = todo.deadline;
                    cell4.innerHTML = todo.priority;
                    cell5.innerHTML = todo.completed;
            }
        })
        .catch(err => {
            console.log("Not able to display Todos");
        });
}
