import { Project } from "./project.js";

const App = {
    projects: [],

    createProject(name) {
        this.projects.push(new Project(`${name}`));
    },

    deleteProject(targetProject) {
        const targetProjectIndex = this.projects.findIndex(project => targetProject.name === project.name);
        this.projects.splice(targetProjectIndex, 1);
    },

    getProject(targetProject) {
        return this.projects.find(project => targetProject === project.name);
    }
};

App.createProject('Default');

export { App };