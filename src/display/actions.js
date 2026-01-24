const actions = [];

function registerAction(action, ...elements) {
    if (typeof action !== 'function') throw new TypeError('Action must be a function.');
    if (elements.length === 0) throw new Error('Need at least one element to register.');
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

function unregisterAction(element) {
    if (typeof element !== 'object') throw new TypeError('Element must be an object.');
    if (!(element instanceof HTMLElement)) throw new Error('Element must be an instance of HTMLElement.');
    if (getAction(element) === undefined) throw new Error('Element is not registered.');

    const action = getAction(element);
    const actionIndex = actions.indexOf(action);
    actions.splice(actionIndex,1);
};


export { getAction, registerAction, unregisterAction };