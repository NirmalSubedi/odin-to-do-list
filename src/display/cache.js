import "./webpage.js";

const cache = {};

// SideBar
cache.sidebar = document.querySelector('.sidebar');

cache.projectInputListItem = document.querySelector('li.new-project');
cache.projectInputTextbox = cache.projectInputListItem.querySelector('input[type=text]');

cache.editProjectsButton = document.querySelector('button.edit-projects-button');
cache.editProjectsButtonIcon = cache.editProjectsButton.querySelector('img');
cache.editProjectsButtonSpan = cache.editProjectsButton.querySelector('span');

cache.addProjectButton = document.querySelector('button.add-project-button');
cache.addProjectButtonIcon = cache.addProjectButton.querySelector('img');
cache.addProjectButtonSpan = cache.addProjectButton.querySelector('span');

// Main
cache.buttonsContainer = document.querySelector('.project-controls');
cache.addTodoButton = document.querySelector('.add-todo-button');
cache.addTodoButtonIcon = document.querySelector('.add-todo-button img');
cache.addTodoButtonSpan = document.querySelector('.add-todo-button span');
cache.editTodosButton = document.querySelector('.edit-todos-button');
cache.editTodosButtonIcon = document.querySelector('.edit-todos-button img');
cache.editTodosButtonSpan = document.querySelector('.edit-todos-button span');

cache.projectTodosContainer = document.querySelector('.project-todos');

cache.todoDialog = document.querySelector('.todo-dialog');
cache.todoDialogForm = cache.todoDialog.querySelector('form.todo-form');
cache.todoDialogCloseButton = cache.todoDialog.querySelector('button[class=close-button]');
cache.todoDialogCloseImg = cache.todoDialogCloseButton.querySelector('img');
cache.todoDialogTitleInput = cache.todoDialog.querySelector('input[name=title]');
cache.todoDialogDescriptionInput = cache.todoDialog.querySelector('input[name=description]');
cache.todoDialogDueDateInput = cache.todoDialog.querySelector('input[name=due-date]');
cache.todoDialogPriorityCheckbox = cache.todoDialog.querySelector('input[name=priority]');
cache.todoDialogNotesTextarea = cache.todoDialog.querySelector('textarea[name=notes]');
cache.todoDialogSaveButton = cache.todoDialog.querySelector('button[type=submit]');



export { cache };