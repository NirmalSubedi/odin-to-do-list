import { ToDo } from "./todo.js";

class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    };

    createTodo(todo) {
        if(this.isDuplicateTodo(todo)) throw new Error("Same title todo already exists!");
        
        this.todos.push(new ToDo(todo));
    };

    deleteTodo(targetTitle) {
        const targetTodoIndex = this.todos.findIndex(todo => todo.title === targetTitle);
        this.todos.splice(targetTodoIndex, 1);
    };

    getTodo(targetTitle) {
        return this.todos.find(todo => targetTitle === todo.title);
    };

    isDuplicateTodo(inputTodo){
        const index = this.todos.findIndex(todo=>todo.title === inputTodo.title);
        return index !== -1;
    };
}

export { Project };