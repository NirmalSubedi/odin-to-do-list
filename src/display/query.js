const query = {};
query.todoDialog = document.querySelector('.todo-dialog');

query.addTodoButton = document.querySelector('.add-todo-button');
query.addTodoButtonIcon = query.addTodoButton.firstElementChild;

query.editTodosButton = document.querySelector('.edit-todos-button');
query.editTodosButtonIcon = query.editTodosButton.firstElementChild;

query.todoControlButtons = document.querySelectorAll('.todo-controls>*');

query.saveTodoDialogButton = document.querySelector('.todo-dialog button[value=save]');
query.todoDialogTitleInput = document.querySelector('.todo-dialog input[name=title]');
query.todoDialogDescriptionInput = document.querySelector('.todo-dialog input[name=description]');
query.todoDialogDueDateInput = document.querySelector('.todo-dialog input[name=due-date]');
query.todoDialogPriorityCheckbox = document.querySelector('.todo-dialog input[name=priority]');
query.todoDialogNotesTextarea = document.querySelector('.todo-dialog textarea[name=notes]');

query.activeProjectSpan = document.querySelector('.active-project span');
query.editProjectsButton = document.querySelector('.edit-projects-button');
query.editProjectsButtonIcon = query.editProjectsButton.firstElementChild;

query.projectNameButtons = document.querySelectorAll('.project-list .project-name');
query.removeProjectButtonsIcon = document.querySelectorAll('.project-name img[alt=remove]');

// query.editTodoButtonIcons = document.querySelectorAll('.edit-todo-button img');
// query.titleTextInput = document.querySelector('.todo-form input[name=title]')
export { query };