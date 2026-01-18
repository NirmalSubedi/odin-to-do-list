const query = {};
query.todoDialog = document.querySelector('.todo-dialog');

query.addTodoButton = document.querySelector('.add-todo-button');
query.addTodoButtonIcon = query.addTodoButton.firstElementChild;

query.editTodosButton = document.querySelector('.edit-todos-button');
query.editTodosButtonIcon = query.editTodosButton.firstElementChild;

query.todoControlButtons = document.querySelectorAll('.todo-controls>*');
// query.todoControlButtonsIcon = [...query.todoControlButtons].map(button=>button.firstElementChild);
export { query };