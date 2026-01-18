import { query } from "./query.js";

const showTodoDialog = () => {
    query.todoDialog.showModal();
};

const showTodoControlButtons = () => {
    query.todoControlButtons.forEach(button => {
        button.classList.toggle('hide-button');
    });
};

const logTest = () => { 
    console.log('test success') 
};

export { showTodoDialog, showTodoControlButtons, logTest };