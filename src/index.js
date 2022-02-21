import Task from "./task";
import Project from "./projects";
import toDoList from "./logic";
import webInterface from "./interface";

const taskX = new Task("Task X");
const taskY = new Task("Task Y");
const taskZ = new Task("Task Z");
const taskA = new Task("Task A");
const taskB = new Task("Task B");
const taskC = new Task("Task C");

const todayProject = toDoList.getProject("Today");
const weekProject = toDoList.getProject("This Week");
const inboxProject = toDoList.getProject("Inbox");

inboxProject.addTask(taskX);
inboxProject.addTask(taskY);
inboxProject.addTask(taskZ);

todayProject.addTask(taskA);
todayProject.addTask(taskB);
todayProject.addTask(taskC);

const projectX = new Project("Project X");

toDoList.addNewProject(projectX);

webInterface.taskBtnListener();
webInterface.displayCustomProjects();
webInterface.projectListener();
webInterface.displayProjectPage();
webInterface.displayTask();