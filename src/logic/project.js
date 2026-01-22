import { ToDo } from "./todo.js";

class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    };

    createTodo(todo) {
        this.todos.push(new ToDo(todo));
    };

    deleteTodo(targetTodo) {
        const targetTodoIndex = this.todos.findIndex(todo => todo.title === targetTodo.title);
        this.todos.splice(targetTodoIndex, 1);
    };

    getTodo(targetTodo) {
        return this.todos.find(todo => targetTodo.title === todo.title);
    };
}

export { Project };