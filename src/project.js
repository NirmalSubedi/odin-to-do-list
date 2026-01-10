import { ToDo } from "./todo.js";

class Project{
    constructor(name){
        this.name = name;
        this.todos = [];
    }

    createTodo(todo){
        this.todos.push(new ToDo(todo));
    }

    deleteTodo(todo){
        const targetTodoIndex = this.todos.findIndex(todo.title === todo.title);
        this.todos.splice(targetTodoIndex, 1);
    }

    getTodo(targetTodo){
        this.todos.find(todo=>targetTodo.title === todo.title);
    }
}

export {Project};