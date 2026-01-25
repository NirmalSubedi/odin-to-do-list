const actions = [];

function registerAction(action, ...elements) {
    if (elements.length === 0) return;
    if (typeof action !== 'function') throw new TypeError('Action must be a function.');
    for (const element of elements) {
        if (typeof element !== 'object') throw new TypeError('Element must be an object.');
        if (!(element instanceof HTMLElement)) throw new Error('Element must be an instance of HTMLElement.');
        if (getAction(element) !== undefined) throw new Error('Element is already registered.');
    };

    actions.push({
        validElements: elements,
        start: action,
    });
};

function getAction(element) {
    return actions.find(action =>
        action.validElements.find(validElement => validElement === element)
    );
};

function getRegistration(action) {
    return actions.find(registration => registration.start === action);
}

function unregisterAction(element) {
    if (typeof element !== 'object') throw new TypeError('Element must be an object.');
    if (!(element instanceof HTMLElement)) throw new Error('Element must be an instance of HTMLElement.');
    if (getAction(element) === undefined) throw new Error('Element is not registered.');

    const action = getAction(element);
    const actionIndex = actions.indexOf(action);
    actions.splice(actionIndex, 1);
};

function addElementToRegistration(action, element) {
    if (typeof action !== 'function') throw new TypeError('Action must be a function.');
    if (typeof element !== 'object') throw new TypeError('Element must be an object.');
    if (!(element instanceof HTMLElement)) throw new Error('Element must be an instance of HTMLElement.');
    if (getRegistration(action) === undefined) throw new Error('Action is not registered.');

    const registration = getRegistration(action);
    registration.validElements.push(element);
};

function removeElementFromRegistration(action, element) {
    if (typeof action !== 'function') throw new TypeError('Action must be a function.');
    if (typeof element !== 'object') throw new TypeError('Element must be an object.');
    if (!(element instanceof HTMLElement)) throw new Error('Element must be an instance of HTMLElement.');
    if (getRegistration(action) === undefined) throw new Error('Action is not registered.');
};


export { getAction, registerAction, unregisterAction, getRegistration };