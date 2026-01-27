import { App } from "../logic/app.js";
import { cache } from "./cache.js";
import { getAction, registerAction, unregisterAction, getRegistration } from "./actions.js";
import { makeTodosUl } from "./main-content.js";
import { makeProjectsUl } from "./sidebar.js";
import editIcon from "../images/edit.svg";
import closeIcon from "../images/close.svg";
import removeIcon from "../images/remove.svg";
import addIcon from "../images/add.svg";

// Sidebar
const showProjectInput = () => {
    cache.projectInputListItem.classList.remove('hide-input');
    cache.projectInputTextbox.focus();
};

const processProjectInput = () => {
    const inputLi = cache.projectInputListItem;
    const inputValue = inputLi.firstElementChild.value;
    cache.projectInputListItem.classList.add('hide-input');
    cache.projectInputTextbox.value = '';
    if (inputValue.trim() === "") return;

    App.createProject(inputValue);

    const previousLiRemoveIcon = inputLi.previousElementSibling.firstElementChild.lastElementChild;
    if (getRegistration(removeProject) !== undefined) unregisterAction(previousLiRemoveIcon);
    refreshProjectList();
    registerAction(removeProject, ...cache.sidebar.querySelectorAll('.project-name img'));
};

const refreshProjectList = () => {
    cache.sidebar.removeChild(cache.sidebar.querySelector('ul'));
    cache.sidebar.insertBefore(makeProjectsUl(), cache.sidebar.lastElementChild);

    cache.projectInputListItem = cache.sidebar.querySelector('li.new-project');
    cache.projectInputTextbox = cache.projectInputListItem.querySelector('input[type=text]');
};

const getCurrentProjectName = () => {
    const listItem = cache.sidebar.querySelector('.active-project');
    const name = listItem.querySelector('span').textContent;
    return name;
};

const removeProject = (element) => {
    const removeImg = element;
    const span = removeImg.previousElementSibling;
    const projectName = span.textContent;
    App.deleteProject(projectName);

    unregisterAction(removeImg);
    refreshProjectList();
    registerAction(removeProject, ...cache.sidebar.querySelectorAll('li .project-name img'));
    toggleProjectsEditButton();
};

const toggleProjectsControlButtons = () => {
    toggleProjectNameIcons();
    toggleProjectsEditButton();
};

const toggleProjectNameIcons = () => {
    const projectNameButtons = cache.sidebar.querySelectorAll('button.project-name');
    projectNameButtons.forEach(button => button.classList.toggle('hide-icon'));
};

const toggleProjectsEditButton = () => {
    cache.editProjectsButton.classList.toggle('showing');
    if (cache.editProjectsButton.classList.contains('showing')) {
        cache.editProjectsButtonSpan.textContent = 'Cancel';
        cache.editProjectsButtonIcon.setAttribute('src', closeIcon);
        cache.editProjectsButtonIcon.setAttribute('alt', 'close icon');
    } else {
        cache.editProjectsButtonSpan.textContent = 'Edit';
        cache.editProjectsButtonIcon.setAttribute('src', editIcon);
        cache.editProjectsButtonIcon.setAttribute('alt', 'edit icon');
    };
};

// Main
const showTodoDialog = () => {
    // TODO: change logic to integrate delete checked
    cache.todoDialogSaveButton.removeAttribute('formnovalidate');
    cache.todoDialog.showModal();

    const currentProjectName = getCurrentProjectName();
    App.getProject(currentProjectName).openedTodoTitle = null;
};

const toggleAllTodoButtons = () => {
    toggleEachTodoControlButtons();
    toggleTodosControlButtons();
};

const toggleEachTodoControlButtons = () => {
    const controlButtons = cache.projectTodosContainer.querySelectorAll('ul .todo-controls>*');
    controlButtons.forEach(button => button.classList.toggle('hide-button'));
};

const toggleTodosControlButtons = () => {
    cache.editTodosButton.classList.toggle('showing');
    if (cache.editTodosButton.classList.contains('showing')) {
        cache.editTodosButtonSpan.textContent = 'Cancel';
        cache.editTodosButtonIcon.setAttribute('src', closeIcon);
        cache.editTodosButtonIcon.setAttribute('alt', 'close icon');
        cache.addTodoButtonSpan.textContent = "Delete Checked";
        cache.addTodoButtonIcon.setAttribute('src', removeIcon);
        cache.addTodoButtonIcon.setAttribute('alt', 'remove icon');
    } else {
        cache.editTodosButtonSpan.textContent = 'Edit Tasks';
        cache.editTodosButtonIcon.setAttribute('src', editIcon);
        cache.editTodosButtonIcon.setAttribute('alt', 'edit icon');
        cache.addTodoButtonSpan.textContent = "Add Task";
        cache.addTodoButtonIcon.setAttribute('src', addIcon);
        cache.addTodoButtonIcon.setAttribute('alt', ' icon');
    };
};

const saveTodoDetails = () => {
    const titleValue = cache.todoDialogTitleInput.value.trim();
    if (titleValue === '') return console.warn('Title is required!');
    const descriptionValue = cache.todoDialogDescriptionInput.value.trim();
    const dueDateValue = cache.todoDialogDueDateInput.value;
    const priorityValue = cache.todoDialogPriorityCheckbox.checked;
    const notesValue = cache.todoDialogNotesTextarea.value.trim();

    const currentProjectName = getCurrentProjectName();
    const currentProject = App.getProject(currentProjectName);
    const openingTodoTitle = currentProject.openedTodoTitle;
    const todo = currentProject.getTodo(openingTodoTitle);

    if (todo === undefined) {
        currentProject.createTodo({
            title: titleValue,
            description: descriptionValue,
            dueDate: dueDateValue,
            priority: priorityValue,
            notes: notesValue,
        });
    } else {
        todo.title = titleValue;
        todo.description = descriptionValue;
        todo.dueDate = dueDateValue;
        todo.priority = priorityValue;
        todo.notes = notesValue;
    };

    refreshTodoListRegistration();
    clearTodoFields();
    if (todo !== undefined) toggleTodosControlButtons();
};

const refreshTodoList = () => {
    cache.projectTodosContainer.removeChild(cache.projectTodosContainer.querySelector('ul'));
    cache.projectTodosContainer.insertBefore(makeTodosUl(), cache.projectTodosContainer.lastElementChild);
};

const clearTodoFields = () => {
    cache.todoDialogSaveButton.setAttribute('formnovalidate', true);
    cache.todoDialogForm.reset();
};

const editTodoDetails = (element) => {
    const todoTitle = getTodoTitle(element);

    const currentProjectName = getCurrentProjectName();
    const storedTodo = App.getProject(currentProjectName).getTodo(todoTitle);
    App.getProject(currentProjectName).openedTodoTitle = storedTodo.title;

    cache.todoDialogTitleInput.value = storedTodo.title;
    if (storedTodo.description !== undefined) cache.todoDialogDescriptionInput.value = storedTodo.description;
    cache.todoDialogDueDateInput.value = storedTodo.dueDate;
    cache.todoDialogPriorityCheckbox.checked = storedTodo.priority;
    if (storedTodo.notes !== undefined) cache.todoDialogNotesTextarea.value = storedTodo.notes;

    cache.todoDialogSaveButton.removeAttribute('formnovalidate');
    cache.todoDialog.showModal();
};

const deleteTodo = (element) => {
    const todoTitle = getTodoTitle(element);

    const currentProjectName = getCurrentProjectName();
    App.getProject(currentProjectName).deleteTodo(todoTitle);

    refreshTodoListRegistration();
    toggleTodosControlButtons();
};

const getTodoTitle = (imgElement) => {
    const removeImg = imgElement;
    const label = removeImg.parentElement.parentElement.previousElementSibling;
    const span = label.firstElementChild.firstElementChild.lastElementChild;
    return span.textContent;
};

const refreshTodoListRegistration = () => {
    unregisterAction(cache.projectTodosContainer.querySelector('ul .remove-todo-button img'));
    unregisterAction(cache.projectTodosContainer.querySelector('ul .edit-todo-button img'));
    refreshTodoList();
    registerAction(editTodoDetails, ...cache.projectTodosContainer.querySelectorAll('ul .edit-todo-button img'));
    registerAction(deleteTodo, ...cache.projectTodosContainer.querySelectorAll('ul .remove-todo-button img'));
};

// sidebar
registerAction(toggleProjectsControlButtons, cache.editProjectsButton, cache.editProjectsButtonIcon, cache.editProjectsButtonSpan);
registerAction(showProjectInput, cache.addProjectButton, cache.addProjectButtonIcon, cache.addProjectButtonSpan);
registerAction(removeProject, ...cache.sidebar.querySelectorAll('button.project-name img'));

// main
registerAction(showTodoDialog, cache.addTodoButton, cache.addTodoButtonIcon, cache.addTodoButtonSpan);
registerAction(toggleAllTodoButtons, cache.editTodosButton, cache.editTodosButtonIcon, cache.editTodosButtonSpan);
registerAction(saveTodoDetails, cache.todoDialogSaveButton);
registerAction(editTodoDetails, ...cache.projectTodosContainer.querySelectorAll('ul .edit-todo-button img'));
registerAction(clearTodoFields, cache.todoDialogCloseButton, cache.todoDialogCloseImg);
registerAction(deleteTodo, ...cache.projectTodosContainer.querySelectorAll('ul .remove-todo-button img'));

export { cache, getAction, processProjectInput, clearTodoFields };