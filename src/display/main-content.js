import { makeElement } from "./element-creator.js";
import { App } from "../logic/app.js";
import { parseISO, formatDistanceToNowStrict } from "date-fns";
import editIcon from "../images/edit.svg";
import addIcon from "../images/add.svg";
import removeIcon from "../images/remove.svg";
import closeIcon from "../images/close.svg";

const main = makeElement({ classes: ['main'] });
const projectTodosContainer = makeElement({ classes: ['project-todos'] });

const projectDetails = makeProjectDetails();
function makeProjectDetails() {
    const openedProject = App.openedProjectName;
    const detailsDiv = makeElement({ classes: ['project-details'] });
    const h1 = makeElement({ tag: 'h1', text: `${openedProject}` });
    const controls = makeElement({ classes: ['project-controls'] });
    const editButton = makeElement({ tag: 'button', classes: ['edit-todos-button'] });
    const addButton = makeElement({ tag: 'button', classes: ['add-todo-button'] });
    const editImg = makeElement({
        tag: 'img',
        attributes: {
            src: editIcon,
            alt: 'edit icon',
            width: '20',
            height: '20',
        }
    });
    const addImg = makeElement({
        tag: 'img',
        attributes: {
            src: addIcon,
            alt: 'add icon',
            width: '20',
            height: '20',
        }
    });
    const editSpan = makeElement({ tag: 'span', text: 'Edit Tasks' });
    const addSpan = makeElement({ tag: 'span', text: 'Add Task' });

    editButton.append(editImg, editSpan);
    addButton.append(addImg, addSpan);
    controls.append(editButton, addButton);
    detailsDiv.append(h1, controls);

    return detailsDiv;
};

let todosUl = makeTodosUl();
function makeTodosUl() {
    const openedTodos = App.getProject(App.openedProjectName).todos;
    const ul = makeElement({ tag: 'ul' });
    const lis = openedTodos.map((todo, index) => {
        const li = makeElement({ tag: 'li' });
        const label = makeElement({
            tag: 'label',
            attributes: {
                for: `todo${index + 1}`,
            }
        });
        const titleDiv = makeElement({ classes: ['todo-title'] });
        const textContainer = makeElement({ tag: 'p' });
        const checkbox = makeElement({
            tag: 'input',
            attributes: {
                type: 'checkbox',
                id: `todo${index + 1}`,
                name: `todo${index + 1}`,
            }
        });
        const span = makeElement({ tag: 'span', classes: ['todo-title-text'], text: `${todo.title}` });
        let priorityTag;
        if (todo.priority === undefined) {
            priorityTag = makeElement({ tag: 'p', text: 'Priority', classes: ['todo-priority-tag', 'hide-tag'] });
        } else {
            priorityTag = makeElement({ tag: 'p', text: 'Priority', classes: ['todo-priority-tag'] });
        };
        let dueDate;
        if (todo.dueDate === undefined || todo.dueDate === '') {
            dueDate = makeElement({ tag: 'p', text: ``, classes: ['todo-due-date', 'hide-tag'] });
        } else {
            const displayDate = formatDistanceToNowStrict(parseISO(todo.dueDate), {addSuffix:true});
            dueDate = makeElement({
                tag: 'p',
                text: `${displayDate}`,
                classes: ['todo-due-date']
            });
            if(displayDate.includes('ago')) dueDate.classList.add('overdue');
        }
        const controls = makeElement({ classes: ['todo-controls'] });
        const editButton = makeElement({ tag: 'button', classes: ['edit-todo-button', 'hide-button'] });
        const removeButton = makeElement({ tag: 'button', classes: ['remove-todo-button', 'hide-button'] });
        const editImg = makeElement({
            tag: 'img',
            attributes: {
                src: editIcon,
                alt: 'edit icon',
                width: '20',
                height: '20',
            }
        });
        const removeImg = makeElement({
            tag: 'img',
            attributes: {
                src: removeIcon,
                alt: 'remove icon',
                width: '20',
                height: '20',
            }
        });

        textContainer.append(checkbox, span);
        titleDiv.append(textContainer, priorityTag);
        label.append(titleDiv, dueDate);
        editButton.appendChild(editImg);
        removeButton.appendChild(removeImg);
        controls.append(editButton, removeButton);
        li.append(label, controls);

        if (todo.priority === false) priorityTag.classList.add('hide-tag');
        return li;
    });
    lis.forEach(li => {
        ul.appendChild(li);
    });
    return ul;
};

const todoDialog = makeTodoDialog();
function makeTodoDialog() {
    const dialog = makeElement({ tag: 'dialog', classes: ['todo-dialog'] });
    const form = makeElement({
        tag: 'form',
        classes: ['todo-form'],
        attributes: {
            method: 'dialog',
        }
    });
    const closeButton = makeElement({
        tag: 'button',
        classes: ['close-button'],
        attributes: {
            formnovalidate: '',
        }
    });
    const closeImg = makeElement({
        tag: 'img',
        attributes: {
            src: closeIcon,
            alt: 'close icon',
            width: '20',
            height: '20',
        }
    });
    const details = makeElement({ classes: ['todo-form-detail'] });
    const h4 = makeElement({ tag: 'h4', text: 'Task Information' });
    const disclaimer = makeElement({ tag: 'span', classes: ['note'] });
    const disclaimerText1 = document.createTextNode('Fields with (');
    const disclaimerText2 = document.createTextNode(') are required.');
    const requiredSpan = makeElement({ tag: 'span', text: '*', classes: ['required'] });
    const titleContainer = makeElement({ tag: 'p' });
    const titleLabel = makeElement({
        tag: 'label',
        text: 'Title',
        attributes: {
            for: 'title',
        }
    });
    const titleField = makeElement({
        tag: 'input',
        attributes: {
            type: 'text',
            name: 'title',
            id: 'title',
            autofocus: '',
            required: '',
        }
    });
    const descriptionContainer = makeElement({ tag: 'p' });
    const descriptionLabel = makeElement({
        type: 'text',
        tag: 'label',
        text: 'Description',
        attributes: {
            for: 'description',
        }
    });
    const descriptionField = makeElement({
        tag: 'input',
        attributes: {
            type: 'text',
            name: 'description',
            id: 'description',
        }
    });
    const dueDateContainer = makeElement({ tag: 'p' });
    const dueDateLabel = makeElement({
        tag: 'label',
        text: 'Due Date',
        attributes: {
            for: 'due-date',
        }
    });
    const dueDateField = makeElement({
        tag: 'input',
        attributes: {
            type: 'datetime-local',
            name: 'due-date',
            id: 'due-date',
        }
    });
    const priorityContainer = makeElement({ tag: 'p' });
    const priorityLabel = makeElement({
        tag: 'label',
        text: 'Priority?',
        attributes: {
            for: 'priority',
        }
    });
    const priorityField = makeElement({
        tag: 'input',
        attributes: {
            type: 'checkbox',
            name: 'priority',
            id: 'priority',
        }
    });
    const notesContainer = makeElement({ tag: 'p' });
    const notesLabel = makeElement({
        tag: 'label',
        text: 'Notes',
        attributes: {
            for: 'notes',
        }
    });
    const notesField = makeElement({
        tag: 'textarea',
        attributes: {
            name: 'notes',
            id: 'notes',
            rows: 4,
        }
    });
    const submitButton = makeElement({
        tag: 'button',
        text: 'Save',
        attributes: {
            type: 'submit',
            value: 'save',
        }
    });

    closeButton.appendChild(closeImg);
    disclaimer.append(disclaimerText1, requiredSpan, disclaimerText2);
    details.append(h4, disclaimer);
    titleLabel.appendChild(requiredSpan.cloneNode(true));
    titleContainer.append(titleLabel, titleField);
    descriptionContainer.append(descriptionLabel, descriptionField);
    dueDateContainer.append(dueDateLabel, dueDateField);
    priorityContainer.append(priorityField, priorityLabel);
    notesContainer.append(notesLabel, notesField);
    form.append(closeButton, details, titleContainer, descriptionContainer, dueDateContainer, priorityContainer, notesContainer, submitButton);
    dialog.appendChild(form);

    return dialog;
};

projectTodosContainer.append(projectDetails, todosUl, todoDialog);
main.append(projectTodosContainer);

function getMain() {
    return main;
};

export { getMain, makeElement, makeTodosUl };