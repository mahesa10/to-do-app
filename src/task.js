export default class Task {
  constructor(title, dueDate = "No date", isCompleted = false, description = "-") {
    this.id = Task.generateId();
    this.title = title;
    this.dueDate = dueDate;
    this.isCompleted = isCompleted;
    this.description = description;
  }

  static generateId() {
    if (!this.latestId) {
      this.latestId = 1
    } else {
      this.latestId++
    }
    return this.latestId;
  }

  static setLatestId(id) {
    this.latestId = id
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