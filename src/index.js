import Task from "./task";
import Project from "./projects";
import toDoList from "./logic";
import webInterface from "./interface";

webInterface.taskBtnListener();
webInterface.displayCustomProjects();

const task1 = new Task("Task 1");
const task2 = new Task("Task 2");
let activeProject = toDoList.getActiveProject();

activeProject.addTask(task1);
activeProject.addTask(task2);
console.log(activeProject);

webInterface.displayTask();