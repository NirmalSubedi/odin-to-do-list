class ToDo {
    constructor({ title, description, dueDate, priority, notes}) {
        this.title = title, 
        this.description = description, 
        this.dueDate = dueDate, 
        this.priority = priority, 
        this.notes = notes, 
        this.isComplete = false 
    }
}

export {ToDo};