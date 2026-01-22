import { Project } from "./project.js";

const App = {
    projects: [],

    createProject(name) {
        if(this.isDuplicateProject(name)) throw new Error("Same name Project already exists!");
        
        this.projects.push(new Project(`${name}`));
    },

    deleteProject(targetProject) {
        const targetProjectIndex = this.projects.findIndex(project => targetProject.name === project.name);
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

App.createProject('Home');
App.createProject('About');
App.createProject('Contact');

export { App };