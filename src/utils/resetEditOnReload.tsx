export function resetEditOnReload() {
    let todos = JSON.parse(localStorage.getItem("todos") || "[]");
    todos.forEach((todo: any) => {
        todo.EditOn = false;
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}
