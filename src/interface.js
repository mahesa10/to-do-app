import Task from "./task";
import toDoList from "./logic";
import Project from "./projects";
import storage from "./storage";

const webInterface = (() => {

  const addTasktoProject = (projectName) => {
    const taskTitle = document.querySelector("#task-title");
    const taskDesc = document.querySelector("#task-description");
    const taskDueDate = document.querySelector("#task-due-date");
    const project = toDoList.getProject(projectName);
    const projectTasks = project.getAllTasks();

    if (projectTasks.some(task => task.title === taskTitle.value)) {
      alert("Task already exists!");
      return false;
    }
    const task = new Task(taskTitle.value);
    task.setDescription(taskDesc.value);
    task.setDueDate(taskDueDate.value);
    project.addTask(task);

    const todayCheck = toDoList.checkIsToday(taskDueDate.value);
    if (todayCheck) toDoList.addTodayTask(task);

    const thisWeekCheck = toDoList.checkThisWeek(taskDueDate.value);
    if (thisWeekCheck) toDoList.addThisWeekTask(task);

    storage.saveData();

    taskTitle.value = "";
    taskDesc.value = "";
    taskDueDate.value = "";

    return true;
  }

  const addProject = (projectName) => {
    const newProject = new Project(projectName);
    toDoList.addNewProject(newProject);
  }

  const setActiveClass = (projectName) => {
    const activeProjectNav = document.querySelector(".active-project");
    const projectNav = document.querySelector(`[data-project="${projectName}"]`)
    if (activeProjectNav !== null) activeProjectNav.classList.remove("active-project");
    projectNav.classList.add("active-project");
  }

  const displayCustomProjects = () => {
    let projectList = toDoList.getAllProjects();
    const customProjectList = document.querySelector(".custom-project-list");
    customProjectList.textContent = "";
    if (projectList.length > 3) {
      for (let i = 3; i < projectList.length; i++) {
        const projectName = projectList[i].getProjectName();
        const customProject = document.createElement("div");
        customProject.className = "project custom-project";
        customProject.setAttribute("data-project", `${projectName}`);

        const customProjectName = document.createElement("p");
        customProjectName.textContent = projectList[i].name;

        const deleteProjectBtn = document.createElement("span");
        deleteProjectBtn.className = "material-icons btn-delete-project";
        deleteProjectBtn.textContent = "delete_outline";
        deleteProjectBtn.addEventListener("click", (e) => {
          const activeProjectName = toDoList.getActiveProjectName();

          toDoList.deleteProject(projectName);
          customProject.remove();
          storage.saveData();
          e.stopPropagation();
          if (toDoList.getActiveProjectName() === projectName) {
            toDoList.setActiveProjectName("Inbox")
            displayProjectPage("Inbox");
            displayTask();
            displayInputTaskBtn();
            setActiveClass("Inbox");
          } else {
            setActiveClass(activeProjectName);
          }
        })

        customProject.appendChild(customProjectName);
        customProject.appendChild(deleteProjectBtn);
        customProject.addEventListener("click", (e) => {
          toDoList.setActiveProjectName(e.currentTarget.dataset.project);
          displayProjectPage(e.currentTarget.dataset.project);
          displayTask();
          setActiveClass(e.currentTarget.dataset.project);
        })

        customProjectList.appendChild(customProject);
      }
    }
  }

  const displayTaskDetail = (task) => {
    const taskDetailModal = document.querySelector(".task-detail-modal");
    const taskDetailTitle = document.querySelector(".task-detail-title");
    const taskDetailDate = document.querySelector(".task-detail-date");
    const taskDetailDesc = document.querySelector(".task-detail-desc");
    const taskDetailClose = document.querySelector(".task-detail-close");

    taskDetailTitle.textContent = task.getTitle();
    taskDetailDate.textContent = task.getDueDate();
    taskDetailDesc.textContent = task.getDescription();

    taskDetailClose.addEventListener("click", () => taskDetailModal.style.display = "none");

    taskDetailModal.style.display = "flex";
  }

  const displayTask = () => {
    const taskListDiv = document.querySelector(".task-list");
    taskListDiv.textContent = "";
    let activeProject = toDoList.getActiveProject();
    let projectTasks = activeProject.getAllTasks();
    projectTasks.forEach(task => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task")
      taskDiv.setAttribute("id", `task-${task.id}`);

      const taskTitle = document.createElement("p");
      taskTitle.textContent = task.getTitle();
      taskTitle.classList.add("task-title-btn")
      taskTitle.addEventListener("click", () => displayTaskDetail(task))

      const taskCheckbox = document.createElement("span");
      taskCheckbox.className = "material-icons task-checkbox";
      taskCheckbox.textContent = "check_box_outline_blank";
      taskCheckbox.addEventListener("click", (e) => {
        if (task.getIsCompleted() === false) {
          e.currentTarget.textContent = "check_box";
          task.setCompleteStatus(true);
          e.currentTarget.parentElement.style.opacity = "0.3";
          taskTitle.style.textDecoration = "line-through";
        } else {
          e.currentTarget.textContent = "check_box_outline_blank";
          task.setCompleteStatus(false);
          e.currentTarget.parentElement.style.opacity = "1";
          taskTitle.style.textDecoration = "none";
        }
      })

      const taskDueDate = document.createElement("span");
      taskDueDate.classList.add("task-due-date");
      taskDueDate.textContent = task.getDueDate();

      const taskEditBtn = document.createElement("span");
      taskEditBtn.className = "material-icons-outlined btn-edit-task";
      taskEditBtn.textContent = "edit";
      taskEditBtn.addEventListener("click", () => displayTaskModal("edit", task));

      const taskDeleteBtn = document.createElement("span");
      taskDeleteBtn.className = "material-icons btn-delete-task";
      taskDeleteBtn.textContent = "delete_outline";
      taskDeleteBtn.addEventListener("click", (e) => {
        toDoList.removeTaskfromProject(task.id);
        e.currentTarget.parentElement.remove();
        storage.saveData();
      });
      
      taskDiv.appendChild(taskCheckbox);
      taskDiv.appendChild(taskTitle);      
      taskDiv.appendChild(taskDueDate);
      taskDiv.appendChild(taskEditBtn);
      taskDiv.appendChild(taskDeleteBtn);
      taskListDiv.appendChild(taskDiv);
    })
  }

  const updateTaskDisplay = (task) => {
    const taskDisplay = document.querySelector(`#task-${task.id}`)
    const taskTitleDisplay = taskDisplay.querySelector(".task-title-btn");
    const taskDateDisplay = taskDisplay.querySelector(".task-due-date");
    taskTitleDisplay.textContent = task.getTitle();
    taskDateDisplay.textContent = task.getDueDate();
  }

  const hideTaskModal = () => {
    const taskInputModal = document.querySelector(".task-input-modal");
    taskInputModal.style.display = "none";

    const taskTitle = document.querySelector("#task-title");
    const taskDesc = document.querySelector("#task-description");
    const taskDueDate = document.querySelector("#task-due-date");

    taskTitle.value = "";
    taskDesc.value = "";
    taskDueDate.value = "";
  }
  
  const displayTaskModal = (modalType, task) => {
    const inputTaskBtn = document.querySelector(".input-task-btn");
    inputTaskBtn.textContent = "";

    const cancelAddTaskBtn = document.createElement("button");
    cancelAddTaskBtn.classList.add("btn-cancel-task");
    cancelAddTaskBtn.textContent = "Cancel"
    cancelAddTaskBtn.addEventListener("click", hideTaskModal);

    const submitTaskBtn = document.createElement("button");

    if (modalType === "add") {
      submitTaskBtn.textContent = "Add Task";
      submitTaskBtn.classList.add("btn-add-task");
      submitTaskBtn.addEventListener("click", () => {
        const activeProjectName = toDoList.getActiveProjectName();
        if (addTasktoProject(activeProjectName)) {
          displayTask();
          hideTaskModal();
        }
      })
    } else if (modalType === "edit") {
      const taskTitle = document.querySelector("#task-title");
      const taskDesc = document.querySelector("#task-description");
      const taskDueDate = document.querySelector("#task-due-date");

      taskTitle.value = task.getTitle();
      taskDesc.value = task.getDescription();
      taskDueDate.value = task.getDueDate();
      submitTaskBtn.textContent = "Edit Task";
      submitTaskBtn.classList.add("btn-edit-task");

      submitTaskBtn.addEventListener("click", (e) => {
        task.setTitle(taskTitle.value);
        task.setDueDate(taskDueDate.value);
        task.setDescription(taskDesc.value);
        updateTaskDisplay(task);
        hideTaskModal();
        storage.saveData();
      })
    }

    inputTaskBtn.appendChild(submitTaskBtn);
    inputTaskBtn.appendChild(cancelAddTaskBtn);
    
    const taskInputModal = document.querySelector(".task-input-modal");
    taskInputModal.style.display = "flex";
  }

  const editProjectField = () => {
    const projectTitle = document.querySelector(".project-title");
    const inputEditProject = document.createElement("input");
    const activeProject = toDoList.getActiveProject();

    inputEditProject.setAttribute("type", "text");
    inputEditProject.className = "input-edit-project";
    inputEditProject.value = activeProject.getProjectName();
    inputEditProject.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        const newProjectName = inputEditProject.value
        toDoList.setActiveProjectName(newProjectName);
        activeProject.setName(newProjectName);
        projectTitle.textContent = "";
        displayCustomProjects();
        displayProjectPage(newProjectName);
        storage.saveData()
      }
    })

    projectTitle.textContent = "";
    projectTitle.appendChild(inputEditProject);
  }

  const displayProjectPage = (projectName) => {
    const projectTitle = document.querySelector(".project-title");
    const defaultProject = ["Inbox", "Today", "This Week"];

    projectTitle.textContent = projectName;
    
    if (!defaultProject.some(project => project === projectName)) {
      const editProjectBtn = document.createElement("span");
      editProjectBtn.className = "material-icons-outlined btn-edit-project"
      editProjectBtn.textContent = "edit"
      editProjectBtn.addEventListener("click", () => {
        editProjectField();
      })
      projectTitle.appendChild(editProjectBtn);
    }
  }

  const taskBtnListener = () => {
    const addTaskInputBtn = document.querySelector(".add-task");
    addTaskInputBtn.addEventListener("click", () => displayTaskModal("add"));
  }
  
  const displayInputTaskBtn = () => {
    const addTaskInputBtn = document.querySelector(".add-task");
    addTaskInputBtn.style.display = "flex";
  }

  const hideInputTaskBtn = () => {
    const addTaskInputBtn = document.querySelector(".add-task");
    addTaskInputBtn.style.display = "none";
  }

  const projectListener = () => {
    const projectNav = document.querySelectorAll(".project");
    projectNav.forEach(project => {
      project.addEventListener("click", (e) => {
        let projectName = e.currentTarget.dataset.project;
        toDoList.setActiveProjectName(projectName);
        displayProjectPage(projectName);
        displayTask();
        if (projectName === "Today" || projectName === "This Week") {
          hideInputTaskBtn();
        } else {
          displayInputTaskBtn();
        }
        setActiveClass(projectName);
      });
    });

    const addProjectModal = document.querySelector(".add-project-modal");

    const addProjectBtn = document.querySelector(".add-project-btn");
    addProjectBtn.addEventListener("click", () => {
      addProjectModal.style.display = "flex";
    });

    const submitProjectBtn = document.querySelector(".submit-project-btn");
    submitProjectBtn.addEventListener("click", () => {
      const projectList = toDoList.getAllProjects();
      const projectNameInput = document.querySelector("#custom-project-name");
      const projectName = projectNameInput.value;
      const activeProjectName = toDoList.getActiveProjectName();
      
      if (projectList.some(project => project.getProjectName() === projectName)) {
        alert("Project already exists!");
        return;
      }

      addProject(projectName);
      displayCustomProjects();
      addProjectModal.style.display = "none";
      projectNameInput.value = "";
      storage.saveData();
      setActiveClass(activeProjectName);
    })

    const cancelAddProjectBtn = document.querySelector(".cancel-submit-project");
    cancelAddProjectBtn.addEventListener("click", () => {
      addProjectModal.style.display = "none";
    })
  }

  const loadPage = () => {
    taskBtnListener();
    displayCustomProjects();
    projectListener();
    displayProjectPage("Inbox");
    displayTask();
  }

  return {
    loadPage
  };
})();

export default webInterface;