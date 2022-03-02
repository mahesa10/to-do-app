export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
  }

  getProjectName() {
    return this.name;
  }

  getProjectTasks() {
    return this.tasks;
  }
}