class ToDo {
    constructor({ title, description, dueDate, priority, notes, isComplete }) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.isComplete = isComplete;
    }

    set complete(value) {
        if (typeof value !== 'boolean') throw new Error(`Type needs to be boolean. ${value}'s type is ${typeof value}!`);

        this.isComplete = value;
    }
}

export { ToDo };