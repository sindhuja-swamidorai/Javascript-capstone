function deleteTodo(id) {

    fetch(`http://localhost:8083/api/todos/${id}`, {
      method: "DELETE" })
    .then(response => {
        console.log("Status code: " + response.status);
       })
      .catch(error => {
         console.log(error);
       });
}

deleteTodo(16);

