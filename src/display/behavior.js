import { query } from "./webpage.js";
import { App } from "../logic/app.js";
import { renderPage, refreshTodoList } from "./webpage.js";
import editIcon from "../images/edit.svg";
import closeIcon from "../images/close.svg";
import removeIcon from "../images/remove.svg";
import addIcon from "../images/add.svg";

const showTodoDialog = () => {
    query.saveTodoDialogButton.removeAttribute('formnovalidate');
    query.todoDialog.showModal();
};

const toggleTodoControlButtons = () => {
    query.todoControlButtons.forEach(button => {
        button.classList.toggle('hide-button');
    });
    query.editTodosButton.classList.toggle('showing');

    if (query.editTodosButton.classList.contains('showing')) {
        query.editTodosButtonSpan.textContent = 'Cancel';
        query.editTodosButtonIcon.setAttribute('src', closeIcon);
        query.editTodosButtonIcon.setAttribute('alt', 'close icon');
        query.addTodoButtonSpan.textContent = "Delete Tasks";
        query.addTodoButtonIcon.setAttribute('src', removeIcon);
        query.addTodoButtonIcon.setAttribute('alt', 'remove icon');
    } else {
        query.editTodosButtonSpan.textContent = 'Edit Tasks';
        query.editTodosButtonIcon.setAttribute('src', editIcon);
        query.editTodosButtonIcon.setAttribute('alt', 'edit icon');
        query.addTodoButtonSpan.textContent = "Add Task";
        query.addTodoButtonIcon.setAttribute('src', addIcon);
        query.addTodoButtonIcon.setAttribute('alt', ' icon');
    }
};

const saveTodoDetails = () => {
    const titleValue = query.todoDialogTitleInput.value;
    if (titleValue === '') return 'Title is required!';
    const descriptionValue = query.todoDialogDescriptionInput.value;
    const dueDateValue = query.todoDialogDueDateInput.value;
    const priorityValue = query.todoDialogPriorityCheckbox.checked;
    const notesValue = query.todoDialogNotesTextarea.value;

    const currentProjectName = getCurrentProjectName();
    const currentProject = App.getProject(currentProjectName);
    currentProject.createTodo({
        title: titleValue,
        description: descriptionValue,
        dueDate: dueDateValue,
        priority: priorityValue,
        notes: notesValue,
    });

    console.log(App.getProject(currentProjectName).getTodo(titleValue))
    refreshTodoList();

    clearTodoFields();
}

const clearTodoFields = () => {
    query.saveTodoDialogButton.setAttribute('formnovalidate', true);
    query.todoDialog.firstElementChild.reset();
}

const toggleProjectsControlButtons = () => {
    query.projectNameButtons.forEach(
        button => {
            button.classList.toggle('hide-icon')
        });
    query.editProjectsButton.classList.toggle('showing');
    if (query.editProjectsButton.classList.contains('showing')) {
        query.editProjectsButtonSpan.textContent = "Cancel";
        query.editProjectsButtonIcon.setAttribute('src', closeIcon);
        query.editProjectsButtonIcon.setAttribute('alt', 'close icon');
    } else {
        query.editProjectsButtonSpan.textContent = "Edit";
        query.editProjectsButtonIcon.setAttribute('src', editIcon);
        query.editProjectsButtonIcon.setAttribute('alt', 'edit icon');
    }
}

const showProjectInput = () => {
    query.projectInputListItem.classList.remove('hide-input');
    query.projectInputTextbox.focus();
};

const processProjectInput = () => {
    const inputValue = query.projectInputTextbox.value;
    query.projectInputListItem.classList.add('hide-input');
    query.projectInputTextbox.value = '';
    if (inputValue === "") return;

    App.createProject(inputValue);
    // TODO: create element
    // and render before input
};

const getCurrentProjectName = () => {
    const button = query.projectNameButtons.find(project=>{
        return project.parentElement.classList.contains('active-project');
    });
    const name = button.firstElementChild.textContent;
    return name;
}

const logTest = (element) => {
    // const todoLabel = element.parentElement.parentElement.previousElementSibling;
    // const todoNumber = todoLabel.getAttribute('for').at(-1); 
    // query.titleTextInput.value = todoNumber;
    // query.todoDialog.showModal();
};



export { showTodoDialog, toggleTodoControlButtons, logTest, saveTodoDetails, toggleProjectsControlButtons, showProjectInput, processProjectInput };