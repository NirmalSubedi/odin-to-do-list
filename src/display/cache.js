const cache = {
    todoControlButtons: [],
    projectNameButtons: [],
    removeProjectButtonsIcon: [],
    editTodoButtonIcons: [],
    removeTodoButtonIcons: [],
};

function uncache(key) {
    cache[key].length = 0;
};

function removeCache(key) {
    delete cache[key];
};

// Main
function cacheProjectDetails(obj) {
    Object.entries(obj).forEach(([key, value]) => {
        cache[key] = value;
    });
};

function cacheTodoControlButtons(listItem) {
    const todoControls = [];
    const editButton = listItem.lastElementChild.firstElementChild;
    const editImg = editButton.firstElementChild;
    const removeButton = listItem.lastElementChild.lastElementChild;
    const removeImg = removeButton.firstElementChild;
    cache.editTodoButtonIcons.push(editImg);
    cache.removeTodoButtonIcons.push(removeImg);
    todoControls.push(editButton, removeButton);
    cache.todoControlButtons.push(todoControls);
};

function cacheTodoDialog (dialog){
    cache.todoDialog = dialog;
};

function cacheTodoDialogFields(obj) {
    Object.entries(obj).forEach(([key, value]) => {
        cache[key] = value;
    });
};

// SideBar
function cacheProjectsControlButtons(controlsDiv) {
    cache.editProjectsButton = controlsDiv.firstElementChild;
    cache.editProjectsButtonIcon = cache.editProjectsButton.firstElementChild;
    cache.editProjectsButtonSpan = cache.editProjectsButton.lastElementChild;

    cache.addProjectButton = controlsDiv.lastElementChild;
    cache.addProjectButtonIcon = cache.addProjectButton.firstElementChild;
    cache.addProjectButtonSpan = cache.addProjectButton.lastElementChild;
};

function cacheNewProjectLi(li, input) {
    cache.projectInputListItem = li;
    cache.projectInputTextbox = input;
};

function cacheProjectNameButtons(button) {
    cache.projectNameButtons.push(button);
};

function cacheRemoveButtonsIcon(img) {
    cache.removeProjectButtonsIcon.push(img);
};


export { 
    cache, 
    cacheProjectDetails, 
    cacheTodoControlButtons, 
    cacheTodoDialogFields, 
    cacheProjectsControlButtons, 
    cacheNewProjectLi, 
    cacheProjectNameButtons, 
    cacheRemoveButtonsIcon, 
    cacheTodoDialog };