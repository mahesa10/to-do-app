export default class Task {
  constructor(title, description = "", dueDate = "No date") {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
  }

  setTaskTitle(title) {
    this.title = title;
  }

  setDueDate(date) {
    this.dueDate = date;
  }

  setDescriptionn(desc) {
    this.description = desc
  }

  getTaskTitle() {
    return this.title;
  }

  getTaskDescription() {
    return this.description;
  }

  getDueDate() {
    return this.dueDate;
  }
}