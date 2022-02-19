export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTasktoProject(task) {
    this.tasks.push(task);
  }

  getProjectName() {
    return this.name;
  }

  getProjectTasks() {
    return this.tasks;
  }
}