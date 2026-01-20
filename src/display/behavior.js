import { query } from "./query.js";
import { App } from "../logic/app.js";
import editIcon from "../images/edit.svg";
import closeIcon from "../images/close.svg";

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
        query.editTodosButton.lastElementChild.textContent = 'Cancel';
        query.editTodosButtonIcon.setAttribute('src', closeIcon);
        query.editTodosButtonIcon.setAttribute('alt', 'close icon');
    } else {
        query.editTodosButton.lastElementChild.textContent = 'Edit Tasks';
        query.editTodosButtonIcon.setAttribute('src', editIcon);
        query.editTodosButtonIcon.setAttribute('alt', 'edit icon');
    }
};

const saveTodoDetails = () => {
    const titleValue = query.todoDialogTitleInput.value;
    if (titleValue === '') return 'Title is required!';
    const descriptionValue = query.todoDialogDescriptionInput.value;
    const dueDateValue = query.todoDialogDueDateInput.value;
    const priorityValue = query.todoDialogPriorityCheckbox.checked;
    const notesValue = query.todoDialogNotesTextarea.value;

    const currentProjectName = query.activeProjectSpan.textContent;
    const currentProject = App.getProject(currentProjectName);
    currentProject.createTodo({
        title: titleValue,
        description: descriptionValue,
        dueDate: dueDateValue,
        priority: priorityValue,
        notes: notesValue,
    });
    // TODO: render addition (preview)


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

const logTest = (element) => {
    // const todoLabel = element.parentElement.parentElement.previousElementSibling;
    // const todoNumber = todoLabel.getAttribute('for').at(-1); 
    // query.titleTextInput.value = todoNumber;
    // query.todoDialog.showModal();
};



export { showTodoDialog, toggleTodoControlButtons, logTest, saveTodoDetails, toggleProjectsControlButtons };