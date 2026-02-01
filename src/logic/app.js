import { Project } from "./project.js";
import { getStored, populateStorage } from "./storage.js";

const App = {
    projects: [],

    createProject(name) {
        if (this.isDuplicateProject(name)) return alert("Same name Project already exists!");

        this.projects.push(new Project(`${name}`));
    },

    deleteProject(targetProject) {
        const targetProjectIndex = this.projects.findIndex(project => targetProject === project.name);
        this.projects.splice(targetProjectIndex, 1);
    },

    getProject(targetProject) {
        return this.projects.find(project => targetProject === project.name);
    },

    isDuplicateProject(targetName) {
        const index = this.projects.findIndex(project => project.name === targetName);
        return index !== -1;
    },
};

const processLocalStorage = () => {
    const storedApp = getStored();
    if (storedApp === 'No storage Available' || storedApp === null) {
        App.createProject('Home');
        App.openedProjectName = App.projects[0].name;
        return;
    };

    const storedProjects = storedApp.projects;
    App.openedProjectName = storedApp.openedProjectName;
    
    storedProjects.forEach(project => {
        App.createProject(project.name);
    });

    storedProjects.forEach(project=>{
        project.todos.forEach(todo=>{
            App.getProject(project.name).createTodo(todo);
        });
    });
}
processLocalStorage();

export { App, populateStorage };