export default class Task {
  constructor(title, dueDate = "No date", isCompleted = false, description = "-") {
    this.id = Task.generateId();
    this.title = title;
    this.dueDate = dueDate;
    this.isCompleted = isCompleted;
    this.description = description;
  }

  static generateId() {
    if (!this.latestID) {
      this.latestID = 1
    } else {
      this.latestID++
    }
    return this.latestID;
  }

  setTitle(title) {
    this.title = title;
  }

  setDueDate(date) {
    this.dueDate = date;
  }

  setDescription(desc) {
    this.description = desc
  }

  setCompleteStatus(isCompleted) {
    this.isCompleted = isCompleted;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getDueDate() {
    return this.dueDate;
  }

  getIsCompleted() {
    return this.isCompleted;
  }
}