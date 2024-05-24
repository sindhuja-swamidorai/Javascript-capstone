"use strict"

window.onload = loadUsers;

function loadUsers() {

    let selectTable = document.getElementById("users");

    let fetch_url = `http://localhost:8083/api/users`;

    let option = new Option("Select a user", -1);
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

    selectTable.onchange = displayTodos;
}


function displayTodos() {

    let table = document.getElementById("todosTable");
    let formData = document.getElementById("formInput");
    let summary = document.querySelector("#formInput p");
    let colorCodes = document.getElementById("colorCodes");
    let pColors = document.querySelector('#colorCodes p');


    let userId = document.getElementById("users");

    let fetch_url = `http://localhost:8083/api/todos/byuser/${userId.value}`;

    console.log("Table length is "+ table.rows.length)

    for (let i=table.rows.length-1; i >= 0 ; i--) {
        table.deleteRow(i);
    }

    let delBtn = document.getElementById("delBtn");
    if (delBtn) {
        delBtn.remove();
    }

    fetch(fetch_url)
        .then(response => response.json())
        .then(data => 
        {
            let row = table.insertRow(-1);
            let selectCell = row.insertCell(0);
            let cell1 = row.insertCell(1);
            let cell2 = row.insertCell(2);
            let cell3 = row.insertCell(3);
            let cell4 = row.insertCell(4);
            let cell5 = row.insertCell(5);
            selectCell.innerText = "Select";
            cell1.innerText = "Category";
            cell2.innerText = "Description";
            cell3.innerText = "Deadline";
            cell4.innerText = "Priority";
            cell5.innerText = "Status";

            let totalTodos = 0;
            let pendingTodos=0;
            let highTodos = 0;
            let mediumTodos = 0;
            let lowTodos=0;

            for(let todo of data) 
            {
                    let row = table.insertRow(-1);
                    let selectCell = row.insertCell(0);
                    let sel = document.createElement("INPUT");
                    sel.setAttribute("type", "checkbox");
                    sel.setAttribute("name", "todoId");
                    sel.setAttribute("value", todo.id);
                    selectCell.append(sel);
                    let cell1 = row.insertCell(1);
                    let cell2 = row.insertCell(2);
                    let cell3 = row.insertCell(3);
                    let cell4 = row.insertCell(4);
                    let cell5 = row.insertCell(5);
                    cell1.innerText = todo.category;
                    cell2.innerText = todo.description;
                    cell3.innerText = todo.deadline;
                    cell4.innerText = todo.priority;
                    let x = document.createElement("button");
                    if(todo.completed === false) {
                        x.innerText = "Mark as complete";
                        x.onclick = () => { x.innerText = "Completed"; x.disabled = true;};
                    }
                    else {
                        x.innerText = "Completed";
                        x.disabled = true;
                    }
                    x.style.textAlign = "center";
                    cell5.append(x);
                    
                    totalTodos++;

                    if(todo.completed == false)
                    {
                        pendingTodos++;
                        //row.style.color = "red";

                        switch(todo.priority){
                            case "High":
                                highTodos++;
                                cell4.style.backgroundColor = "Coral"
                                break;
                            case "Medium":
                                mediumTodos++;
                                cell4.style.backgroundColor = "Orange"
                                break;
                            default:
                                cell4.style.backgroundColor = "LightYellow"
                                lowTodos++;
                                break;
                        }   
                    }
                    else 
                    {
                           row.style.color = "green";
                        
                    }
            }

            pColors.innerHTML = `<span style="background-color:Coral"> High &nbsp;</span>
            <span style="background-color:orange"> Medium &nbsp;</span>
            <span style="background-color:lightyellow"> Low </span>`;

            summary.innerHTML = `Total: ${totalTodos}, Pending: ${pendingTodos}, 
                                High: ${highTodos}, Medium: ${mediumTodos}, Low: ${lowTodos}`;

            if (totalTodos === 0) {
                table.deleteRow(0);
            }
            else {
                delBtn = document.createElement("INPUT");
                delBtn.setAttribute("id", "delBtn");
                delBtn.setAttribute("type", "submit");
                delBtn.setAttribute("name", "DELETE");
                delBtn.setAttribute("value", "DELETE");
                formData.append(delBtn);    
            }

        })
        .catch(err => {
            console.log("Not able to display Todos");
        });
}

