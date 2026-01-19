import { query } from "./query.js";
import { App } from "../logic/app.js";

const showTodoDialog = () => {
    query.saveTodoDialogButton.removeAttribute('formnovalidate');
    query.todoDialog.showModal();
};

const toggleTodoControlButtons = () => {
    query.todoControlButtons.forEach(button => {
        button.classList.toggle('hide-button');
    });
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
            button.classList.toggle('hide-icon')});
}

const logTest = (element) => {
    // const todoLabel = element.parentElement.parentElement.previousElementSibling;
    // const todoNumber = todoLabel.getAttribute('for').at(-1); 
    // query.titleTextInput.value = todoNumber;
    // query.todoDialog.showModal();
};



export { showTodoDialog, toggleTodoControlButtons, logTest, saveTodoDetails, toggleProjectsControlButtons };