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
    const span = element.previousElementSibling;
    const projectName = span.textContent;
    App.deleteProject(projectName);

    unregisterAction(element);
    refreshProjectList();
    registerAction(removeProject, ...cache.sidebar.querySelectorAll('.project-name img'));
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
    cache.saveTodoDialogButton.removeAttribute('formnovalidate');
    cache.todoDialog.showModal();
};

const toggleTodoControlButtons = () => {
    cache.todoControlButtons.forEach(([editButton, removeButton]) => {
        editButton.classList.toggle('hide-button');
        removeButton.classList.toggle('hide-button');
    });
    cache.editTodosButton.classList.toggle('showing');

    if (cache.editTodosButton.classList.contains('showing')) {
        cache.editTodosButtonSpan.textContent = 'Cancel';
        cache.editTodosButtonIcon.setAttribute('src', closeIcon);
        cache.editTodosButtonIcon.setAttribute('alt', 'close icon');
        cache.addTodoButtonSpan.textContent = "Delete Tasks";
        cache.addTodoButtonIcon.setAttribute('src', removeIcon);
        cache.addTodoButtonIcon.setAttribute('alt', 'remove icon');
    } else {
        cache.editTodosButtonSpan.textContent = 'Edit Tasks';
        cache.editTodosButtonIcon.setAttribute('src', editIcon);
        cache.editTodosButtonIcon.setAttribute('alt', 'edit icon');
        cache.addTodoButtonSpan.textContent = "Add Task";
        cache.addTodoButtonIcon.setAttribute('src', addIcon);
        cache.addTodoButtonIcon.setAttribute('alt', ' icon');
    }
};

const saveTodoDetails = () => {
    const titleValue = cache.todoDialogTitleInput.value;
    if (titleValue === '') return 'Title is required!';
    const descriptionValue = cache.todoDialogDescriptionInput.value;
    const dueDateValue = cache.todoDialogDueDateInput.value;
    const priorityValue = cache.todoDialogPriorityCheckbox.checked;
    const notesValue = cache.todoDialogNotesTextarea.value;

    const currentProjectName = getCurrentProjectName();
    const currentProject = App.getProject(currentProjectName);
    currentProject.createTodo({
        title: titleValue,
        description: descriptionValue,
        dueDate: dueDateValue,
        priority: priorityValue,
        notes: notesValue,
    });

    cache.projectTodosContainer.removeChild(cache.projectTodosContainer.querySelector('ul'));
    cache.projectTodosContainer.insertBefore(makeTodosUl(), cache.projectTodosContainer.lastElementChild);

    clearTodoFields();
};

const clearTodoFields = () => {
    cache.saveTodoDialogButton.setAttribute('formnovalidate', true);
    cache.todoDialogForm.reset();
};



// sidebar
registerAction(toggleProjectsControlButtons, cache.editProjectsButton, cache.editProjectsButtonIcon, cache.editProjectsButtonSpan);
registerAction(showProjectInput, cache.addProjectButton, cache.addProjectButtonIcon, cache.addProjectButtonSpan);
registerAction(removeProject, ...cache.sidebar.querySelectorAll('button.project-name img'));

// main
registerAction(showTodoDialog, cache.addTodoButton, cache.addTodoButtonIcon, cache.addTodoButtonSpan);
// registerAction(toggleTodoControlButtons, cache.editTodosButton, cache.editTodosButtonIcon, cache.editTodosButtonSpan);
registerAction(saveTodoDetails, cache.saveTodoDialogButton);


export {
    cache,
    getAction,
    showTodoDialog,
    toggleTodoControlButtons,
    saveTodoDetails,
    toggleProjectsControlButtons,
    showProjectInput,
    processProjectInput,
    removeProject,
};