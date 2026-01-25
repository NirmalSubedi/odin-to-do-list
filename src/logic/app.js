import { Project } from "./project.js";

const App = {
    projects: [
        new Project('Home'),
    ],

    createProject(name) {
        if(this.isDuplicateProject(name)) throw new Error("Same name Project already exists!");
        
        this.projects.push(new Project(`${name}`));
    },

    deleteProject(targetProject) {
        const targetProjectIndex = this.projects.findIndex(project => targetProject === project.name);
        this.projects.splice(targetProjectIndex, 1);
    },

    getProject(targetProject) {
        return this.projects.find(project => targetProject === project.name);
    },

    isDuplicateProject(targetName){
        const index = this.projects.findIndex(project=>project.name === targetName);
        return index !== -1;
    },
};

App.getProject('Home').createTodo({title:'test'})
App.getProject('Home').createTodo({title:'test2', description:'this is a test', priority: true, notes: 'testing notes', dueDate:'2026-01-28T14:15'})
App.createProject('About');
App.createProject('Contact');

export { App };