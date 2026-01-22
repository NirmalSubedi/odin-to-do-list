import { makeElement } from "./element-creator.js";
import { App } from "../logic/app.js";
import { cacheProjectsControlButtons, cacheNewProjectLi, cacheProjectNameButtons, cacheRemoveButtonsIcon } from "./cache.js";
import removeIcon from "../images/remove.svg";
import editIcon from "../images/edit.svg";
import addIcon from "../images/add.svg";

const projects = App.projects;
const currentProjectTodos = getProjectTodos();

function getProjectTodos() {
    const project = getCurrentProject();
    return App.getProject(project);
}
function getCurrentProject() {
}

const sidebar = makeElement({ classes: ['sidebar'] });

const h2 = makeElement({ tag: 'h2', text: 'Projects' });

const ul = makeElement({ tag: 'ul', classes: ['project-list'] });

const DEFAULT_PROJECT_INDEX = 0;
const lis = projects.map((project, index) => {
    if (index === DEFAULT_PROJECT_INDEX) {
        const li = makeElement({ tag: 'li', classes: ['project-list-item', 'default', 'active-project'] });
        const button = makeElement({ tag: 'button', classes: ['project-name'] });
        const span = makeElement({ tag: 'span', text: `${project.name}` });

        button.appendChild(span);
        li.appendChild(button);

        cacheProjectNameButtons(button);
        return li;
    }

    const li = makeElement({ tag: 'li', classes: ['project-list-item'] });
    const button = makeElement({ tag: 'button', classes: ['project-name', 'hide-icon'] });
    const span = makeElement({ tag: 'span', text: `${project.name}` })
    const img = makeElement({
        tag: 'img',
        attributes: {
            src: removeIcon,
            alt: 'remove icon',
            width: '20',
            height: '20',
            tabindex: '0',
        }
    });

    button.append(span, img);
    li.appendChild(button);

    cacheProjectNameButtons(button);
    cacheRemoveButtonsIcon(img);
    return li;
});

const inputLi = makeInputLi();
function makeInputLi() {
    const li = makeElement({ tag: 'li', classes: ['project-list-item', 'new-project', 'hide-input'] });
    const input = makeElement({
        tag: 'input',
        classes: ['input-project'],
        attributes: {
            type: 'text',
            placeholder: 'Name',
        },
    });

    li.appendChild(input);
    cacheNewProjectLi(li,input);
    return li;
};
lis.push(inputLi);

lis.forEach(li=>ul.appendChild(li));


const div = makeProjectsControl();
function makeProjectsControl() {
    const div = makeElement({ classes: ['projects-control'] });
    const editButton = makeElement({ tag: 'button', classes: ['edit-projects-button'] });
    const addButton = makeElement({ tag: 'button', classes: ['add-project-button'] });
    const editImg = makeElement({
        tag: 'img',
        attributes: {
            src: editIcon,
            alt: 'edit icon',
            width: '20',
            height: '20',
        }
    })
    const addImg = makeElement({
        tag: 'img',
        attributes: {
            src: addIcon,
            alt: 'add icon',
            width: '20',
            height: '20',
        }
    })
    const editSpan = makeElement({ tag: 'span', text: 'Edit' });
    const addSpan = makeElement({ tag: 'span', text: 'Add' });
    editButton.append(editImg,editSpan);
    addButton.append(addImg, addSpan),
    div.append(editButton,addButton);

    cacheProjectsControlButtons(div);
    return div;
};

sidebar.append(h2,ul,div);

// TODO: cache elements for events
function getSidebar() {
    return sidebar;
};

export { getSidebar };