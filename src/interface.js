import Task from "./task";
import toDoList from "./logic";

const webInterface = (() => {

  const displayTaskField = (e) => {
    const addTaskInput = document.querySelector(".add-task-input");
    addTaskInput.style.display = "flex";
    e.currentTarget.style.display = "none";
  }

  const addTask = (projectName) => {
    const taskTitle = document.querySelector("#task-title");
    const taskDesc = document.querySelector("#task-description")
    const task = new Task(taskTitle.value);
    task.setDescription(taskDesc.value);
    const project = toDoList.getProject(projectName);
    project.addTasktoProject(task);
  }

  const cancelTaskInput = () => {
    const addTaskInput = document.querySelector(".add-task-input");
    const addTaskInputBtn = document.querySelector(".add-task");
    addTaskInput.style.display = "none";
    addTaskInputBtn.style.display = "flex";
  }

  const taskBtnListener = () => {
    const addTaskInputBtn = document.querySelector(".add-task");
    addTaskInputBtn.addEventListener("click", displayTaskField);

    const cancelAddTaskBtn = document.querySelector(".btn-cancel-task");
    cancelAddTaskBtn.addEventListener("click", cancelTaskInput);

    const addTaskBtn = document.querySelector(".btn-add-task");
    addTaskBtn.addEventListener("click", () => {
      addTask(getActiveProject());
    })
  }

  const displayCustomProjects = () => {
    let projectList = toDoList.getAllProjects();
    const customProjectContainer = document.querySelector(".custom-project-container");

    if (projectList.length > 3) {
      for (let i = 3; i < projectList.length; i++) {
        const customProject = document.createElement("div");
        customProject.classList.add("custom-project");
        const customProjectName = document.createElement("p");
        customProjectName.textContent = projectList[i].name
        customProject.appendChild(customProjectName);
        customProjectContainer.appendChild(customProject);
      }
    }
  }

  const displayTask = () => {
    const taskListDiv = document.querySelector(".task-list");
    let activeProject = toDoList.getActiveProject();
    let projectTasks = activeProject.getProjectTasks();
    projectTasks.forEach((task, index) => {
      const taskLabel = document.createElement("label");
      taskLabel.classList.add("task")
      taskLabel.setAttribute("for", `task-${index}`);

      const taskCheckbox = document.createElement("input");
      taskCheckbox.setAttribute("type", "checkbox");
      taskCheckbox.setAttribute("id", `task-${index}`);

      const taskTitle = document.createElement("p");
      taskTitle.textContent = task.getTaskTitle();
      
      taskLabel.appendChild(taskCheckbox);
      taskLabel.appendChild(taskTitle);
      taskListDiv.appendChild(taskLabel);
    })
  }

  return { taskBtnListener, displayCustomProjects, displayTask };
})();

export default webInterface;