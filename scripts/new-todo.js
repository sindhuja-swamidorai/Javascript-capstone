"use strict"

window.onload = init;

function init() {

    let formData = document.getElementById("newTodoForm");

    loadUsers();
    loadCategories();

    formData.elements["CANCEL"].onclick = gotoCommon;
    formData.addEventListener("submit",checkFormData);
    formData.addEventListener("change",checkFormData);
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

function checkFormData(event) {

    let formData = document.getElementById("newTodoForm");
    //console.log(formData.elements);
    console.log("Check form elements ---");

    if (formData.elements['users'].selectedIndex == 0) {
        formData.elements['users'].setCustomValidity("Not a valid user! Please select a user from the list.")
        formData.elements['users'].classList.add("is-invalid");
        event.preventDefault();
    } 
    else {
        formData.elements['users'].setCustomValidity("")
        formData.elements['users'].classList.remove("is-invalid");
        formData.elements['users'].classList.add("is-valid");
    }

    if (formData.elements['categories'].selectedIndex == 0) {
        formData.elements['categories'].setCustomValidity("Not a valid category! Please select a category from the list")
        formData.elements['categories'].classList.add("is-invalid");
        event.preventDefault();
    } 
    else {
        formData.elements['categories'].setCustomValidity("")
        formData.elements['categories'].classList.remove("is-invalid");
        formData.elements['categories'].classList.add("is-valid");
    }

    if (formData.elements['description'].value === "") {
        formData.elements['description'].setCustomValidity("Description cannot be empty!")
        formData.elements['description'].classList.add("is-invalid");
        event.preventDefault();
    } 
    else {
        formData.elements['description'].setCustomValidity("")
        formData.elements['description'].classList.remove("is-invalid");
        formData.elements['description'].classList.add("is-valid");
    }    

    let date = new Date(formData.elements['deadline'].value);
    
    if ( Object.prototype.toString.call(date) === "[object Date]") {
        if ( !isNaN(date.getTime()) )         
        {
            formData.elements['deadline'].classList.remove("is-invalid");
            formData.elements['deadline'].setCustomValidity("")
            formData.elements['deadline'].classList.add("is-valid");
        } 
        else {
            formData.elements['deadline'].setCustomValidity("Invalid date format. Please enter a valid date!")
            formData.elements['deadline'].classList.add("is-invalid");
           event.preventDefault();
       }
    }
    else {
        formData.elements['deadline'].setCustomValidity("Invalid date format. Please enter a valid date!")
        formData.elements['deadline'].classList.add("is-invalid");
        event.preventDefault();
    }

}

function gotoCommon() {
    let formData = document.getElementById("newTodoForm");

    formData.removeEventListener("submit",checkFormData);
    formData.removeEventListener("change",checkFormData);
}
