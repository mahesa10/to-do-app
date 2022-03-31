export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  setName(newName) {
    this.name = newName;
  }

  getProjectName() {
    return this.name;
  }

  getTask(name) {
    return this.tasks.find(task => task.name === name);
  }

  getTaskByID(id) {
    return this.tasks.find(task => task.id === id);
  }

  getAllTasks() {
    return this.tasks;
  }

  checkTask(id) {
    return this.tasks.some(task => task.id === id);
  }

  removeTask(id) {
    let filteredTasks = this.tasks.filter(task => task.id !== id);
    this.tasks = filteredTasks;
  }

  clearTask() {
    this.tasks = [];
  }
}