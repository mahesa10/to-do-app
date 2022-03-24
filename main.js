/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/interface.js":
/*!**************************!*\
  !*** ./src/interface.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic */ "./src/logic.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projects */ "./src/projects.js");




const webInterface = (() => {

  const addTasktoProject = (projectName) => {
    const taskTitle = document.querySelector("#task-title");
    const taskDesc = document.querySelector("#task-description");
    const taskDueDate = document.querySelector("#task-due-date");
    const project = _logic__WEBPACK_IMPORTED_MODULE_1__["default"].getProject(projectName);
    const projectTasks = project.getAllTasks();

    if (projectTasks.some(task => task.title === taskTitle.value)) {
      alert("Task already exists!");
      return false;
    }
    const task = new _task__WEBPACK_IMPORTED_MODULE_0__["default"](taskTitle.value);
    task.setDescription(taskDesc.value);
    task.setDueDate(taskDueDate.value);
    project.addTask(task);

    taskTitle.value = "";
    taskDesc.value = "";
    taskDueDate.value = "";

    console.log("triggered")

    return true;
  }

  const addProject = (projectName) => {
    const newProject = new _projects__WEBPACK_IMPORTED_MODULE_2__["default"](projectName);
    _logic__WEBPACK_IMPORTED_MODULE_1__["default"].addNewProject(newProject);
  }

  const displayCustomProjects = () => {
    let projectList = _logic__WEBPACK_IMPORTED_MODULE_1__["default"].getAllProjects();
    const customProjectList = document.querySelector(".custom-project-list");
    customProjectList.textContent = "";
    if (projectList.length > 3) {
      for (let i = 3; i < projectList.length; i++) {
        const customProject = document.createElement("div");
        customProject.className = "project custom-project";
        customProject.setAttribute("data-project", `${projectList[i].name}`);
        const customProjectName = document.createElement("p");
        customProjectName.textContent = projectList[i].name
        customProject.appendChild(customProjectName);
        customProject.addEventListener("click", (e) => {
          _logic__WEBPACK_IMPORTED_MODULE_1__["default"].setActiveProjectName(e.currentTarget.dataset.project);
          displayProjectPage();
          displayTask();
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
    let activeProject = _logic__WEBPACK_IMPORTED_MODULE_1__["default"].getActiveProject();
    let projectTasks = activeProject.getAllTasks();
    projectTasks.forEach((task, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task")

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
        activeProject.removeTask(index);
        e.currentTarget.parentElement.remove();
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
    const taskTitleDisplay = document.querySelector(".task-title-btn");
    const taskDateDisplay = document.querySelector(".task-due-date");
    taskTitleDisplay.textContent = task.getTitle();
    taskDateDisplay.textContent = task.getDueDate();
  }

  const hideTaskModal = () => {
    const taskInputModal = document.querySelector(".task-modal-container");
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
      submitTaskBtn.classList.add("btn-edit-task");
      submitTaskBtn.addEventListener("click", () => {
        const activeProjectName = _logic__WEBPACK_IMPORTED_MODULE_1__["default"].getActiveProjectName();
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

      submitTaskBtn.addEventListener("click", () => {
        task.setTitle(taskTitle.value);
        task.setDueDate(taskDueDate.value);
        task.setDescription(taskDesc.value);
        updateTaskDisplay(task);
        hideTaskModal();
      })
    }

    inputTaskBtn.appendChild(submitTaskBtn);
    inputTaskBtn.appendChild(cancelAddTaskBtn);
    
    const taskInputModal = document.querySelector(".task-modal-container");
    taskInputModal.style.display = "flex";
  }

  const displayProjectPage = () => {
    const projectTitle = document.querySelector(".project-title");
    projectTitle.textContent = _logic__WEBPACK_IMPORTED_MODULE_1__["default"].getActiveProjectName();
  }

  const taskBtnListener = () => {
    const addTaskInputBtn = document.querySelector(".add-task");
    addTaskInputBtn.addEventListener("click", () => displayTaskModal("add"));
  }
  
  const projectListener = () => {
    const projectNav = document.querySelectorAll(".project");
    projectNav.forEach(project => {
      project.addEventListener("click", (e) => {
        _logic__WEBPACK_IMPORTED_MODULE_1__["default"].setActiveProjectName(e.currentTarget.dataset.project);
        displayProjectPage();
        displayTask();
      });
    });

    const customProjectInput = document.querySelector(".custom-project-input");

    const addProjectBtn = document.querySelector(".add-project");
    addProjectBtn.addEventListener("click", () => {
      customProjectInput.style.display = "grid";
    });

    const addNewProjectBtn = document.querySelector(".btn-add-project");
    addNewProjectBtn.addEventListener("click", () => {
      const projectNameInput = document.querySelector("#custom-project-name");
      addProject(projectNameInput.value);
      displayCustomProjects();
      customProjectInput.style.display = "none";
    })

    const cancelAddProjectBtn = document.querySelector(".btn-cancel-add-project");
    cancelAddProjectBtn.addEventListener("click", () => {
      customProjectInput.style.display = "none";
    })
  }

  const loadPage = () => {
    taskBtnListener();
    displayCustomProjects();
    projectListener();
    displayProjectPage();
    displayTask();
  }

  return {
    loadPage
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (webInterface);

/***/ }),

/***/ "./src/logic.js":
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");


const toDoList = (() => {
  let projectList = [];
  projectList.push(new _projects__WEBPACK_IMPORTED_MODULE_0__["default"]("Inbox"));
  projectList.push(new _projects__WEBPACK_IMPORTED_MODULE_0__["default"]("Today"));
  projectList.push(new _projects__WEBPACK_IMPORTED_MODULE_0__["default"]("This Week"));

  let activeProjectName = "Inbox";

  const addNewProject = (project) => projectList.push(project);

  const getAllProjects = () => projectList;

  const getProject = (name) => projectList.find(el => el.name == name);

  const setActiveProjectName = (projectName) => activeProjectName = projectName;

  const getActiveProjectName = () => activeProjectName;

  const getActiveProject = () => getProject(getActiveProjectName());
  
  return {
    addNewProject,
    getAllProjects,
    getProject,
    setActiveProjectName,
    getActiveProjectName,
    getActiveProject
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toDoList);

/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Project)
/* harmony export */ });
class Project {
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

  getTask(name) {
    return this.tasks.find(task => task.name === name);
  }

  getAllTasks() {
    return this.tasks;
  }
}

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Task)
/* harmony export */ });
class Task {
  constructor(title, dueDate = "No date", isCompleted = false, description = "-") {
    this.title = title;
    this.dueDate = dueDate;
    this.isCompleted = isCompleted;
    this.description = description;
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logic */ "./src/logic.js");
/* harmony import */ var _interface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interface */ "./src/interface.js");





_interface__WEBPACK_IMPORTED_MODULE_3__["default"].loadPage();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNLO0FBQ0U7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IseURBQW1CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw2Q0FBSTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGlEQUFPO0FBQ2xDLElBQUksNERBQXNCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw2REFBdUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHdCQUF3QjtBQUM5QztBQUNBO0FBQ0Esc0RBQXNELG9CQUFvQjtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsbUVBQTZCO0FBQ3ZDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLCtEQUF5QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLG1FQUE2QjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtRUFBNkI7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsbUVBQTZCO0FBQ3JDO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLGlFQUFlLFlBQVk7Ozs7Ozs7Ozs7Ozs7OztBQzdQTTtBQUNqQztBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsaURBQU87QUFDOUIsdUJBQXVCLGlEQUFPO0FBQzlCLHVCQUF1QixpREFBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsaUVBQWUsUUFBUTs7Ozs7Ozs7Ozs7Ozs7QUNoQ1I7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN6QmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ3ZDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTjBCO0FBQ087QUFDRjtBQUNRO0FBQ3ZDO0FBQ0EsMkRBQXFCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9sb2dpYy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFzayBmcm9tIFwiLi90YXNrXCI7XHJcbmltcG9ydCB0b0RvTGlzdCBmcm9tIFwiLi9sb2dpY1wiO1xyXG5pbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0c1wiO1xyXG5cclxuY29uc3Qgd2ViSW50ZXJmYWNlID0gKCgpID0+IHtcclxuXHJcbiAgY29uc3QgYWRkVGFza3RvUHJvamVjdCA9IChwcm9qZWN0TmFtZSkgPT4ge1xyXG4gICAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLXRpdGxlXCIpO1xyXG4gICAgY29uc3QgdGFza0Rlc2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZGVzY3JpcHRpb25cIik7XHJcbiAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kdWUtZGF0ZVwiKTtcclxuICAgIGNvbnN0IHByb2plY3QgPSB0b0RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3ROYW1lKTtcclxuICAgIGNvbnN0IHByb2plY3RUYXNrcyA9IHByb2plY3QuZ2V0QWxsVGFza3MoKTtcclxuXHJcbiAgICBpZiAocHJvamVjdFRhc2tzLnNvbWUodGFzayA9PiB0YXNrLnRpdGxlID09PSB0YXNrVGl0bGUudmFsdWUpKSB7XHJcbiAgICAgIGFsZXJ0KFwiVGFzayBhbHJlYWR5IGV4aXN0cyFcIik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayh0YXNrVGl0bGUudmFsdWUpO1xyXG4gICAgdGFzay5zZXREZXNjcmlwdGlvbih0YXNrRGVzYy52YWx1ZSk7XHJcbiAgICB0YXNrLnNldER1ZURhdGUodGFza0R1ZURhdGUudmFsdWUpO1xyXG4gICAgcHJvamVjdC5hZGRUYXNrKHRhc2spO1xyXG5cclxuICAgIHRhc2tUaXRsZS52YWx1ZSA9IFwiXCI7XHJcbiAgICB0YXNrRGVzYy52YWx1ZSA9IFwiXCI7XHJcbiAgICB0YXNrRHVlRGF0ZS52YWx1ZSA9IFwiXCI7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJ0cmlnZ2VyZWRcIilcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGFkZFByb2plY3QgPSAocHJvamVjdE5hbWUpID0+IHtcclxuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0TmFtZSk7XHJcbiAgICB0b0RvTGlzdC5hZGROZXdQcm9qZWN0KG5ld1Byb2plY3QpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZGlzcGxheUN1c3RvbVByb2plY3RzID0gKCkgPT4ge1xyXG4gICAgbGV0IHByb2plY3RMaXN0ID0gdG9Eb0xpc3QuZ2V0QWxsUHJvamVjdHMoKTtcclxuICAgIGNvbnN0IGN1c3RvbVByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXN0b20tcHJvamVjdC1saXN0XCIpO1xyXG4gICAgY3VzdG9tUHJvamVjdExpc3QudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgaWYgKHByb2plY3RMaXN0Lmxlbmd0aCA+IDMpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDM7IGkgPCBwcm9qZWN0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGN1c3RvbVByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGN1c3RvbVByb2plY3QuY2xhc3NOYW1lID0gXCJwcm9qZWN0IGN1c3RvbS1wcm9qZWN0XCI7XHJcbiAgICAgICAgY3VzdG9tUHJvamVjdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgYCR7cHJvamVjdExpc3RbaV0ubmFtZX1gKTtcclxuICAgICAgICBjb25zdCBjdXN0b21Qcm9qZWN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgIGN1c3RvbVByb2plY3ROYW1lLnRleHRDb250ZW50ID0gcHJvamVjdExpc3RbaV0ubmFtZVxyXG4gICAgICAgIGN1c3RvbVByb2plY3QuYXBwZW5kQ2hpbGQoY3VzdG9tUHJvamVjdE5hbWUpO1xyXG4gICAgICAgIGN1c3RvbVByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICB0b0RvTGlzdC5zZXRBY3RpdmVQcm9qZWN0TmFtZShlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5wcm9qZWN0KTtcclxuICAgICAgICAgIGRpc3BsYXlQcm9qZWN0UGFnZSgpO1xyXG4gICAgICAgICAgZGlzcGxheVRhc2soKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIGN1c3RvbVByb2plY3RMaXN0LmFwcGVuZENoaWxkKGN1c3RvbVByb2plY3QpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBkaXNwbGF5VGFza0RldGFpbCA9ICh0YXNrKSA9PiB7XHJcbiAgICBjb25zdCB0YXNrRGV0YWlsTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGV0YWlsLW1vZGFsXCIpO1xyXG4gICAgY29uc3QgdGFza0RldGFpbFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRldGFpbC10aXRsZVwiKTtcclxuICAgIGNvbnN0IHRhc2tEZXRhaWxEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRldGFpbC1kYXRlXCIpO1xyXG4gICAgY29uc3QgdGFza0RldGFpbERlc2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGV0YWlsLWRlc2NcIik7XHJcbiAgICBjb25zdCB0YXNrRGV0YWlsQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGV0YWlsLWNsb3NlXCIpO1xyXG5cclxuICAgIHRhc2tEZXRhaWxUaXRsZS50ZXh0Q29udGVudCA9IHRhc2suZ2V0VGl0bGUoKTtcclxuICAgIHRhc2tEZXRhaWxEYXRlLnRleHRDb250ZW50ID0gdGFzay5nZXREdWVEYXRlKCk7XHJcbiAgICB0YXNrRGV0YWlsRGVzYy50ZXh0Q29udGVudCA9IHRhc2suZ2V0RGVzY3JpcHRpb24oKTtcclxuXHJcbiAgICB0YXNrRGV0YWlsQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRhc2tEZXRhaWxNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIpO1xyXG5cclxuICAgIHRhc2tEZXRhaWxNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkaXNwbGF5VGFzayA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRhc2tMaXN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWxpc3RcIik7XHJcbiAgICB0YXNrTGlzdERpdi50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICBsZXQgYWN0aXZlUHJvamVjdCA9IHRvRG9MaXN0LmdldEFjdGl2ZVByb2plY3QoKTtcclxuICAgIGxldCBwcm9qZWN0VGFza3MgPSBhY3RpdmVQcm9qZWN0LmdldEFsbFRhc2tzKCk7XHJcbiAgICBwcm9qZWN0VGFza3MuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgdGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZChcInRhc2tcIilcclxuXHJcbiAgICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICB0YXNrVGl0bGUudGV4dENvbnRlbnQgPSB0YXNrLmdldFRpdGxlKCk7XHJcbiAgICAgIHRhc2tUaXRsZS5jbGFzc0xpc3QuYWRkKFwidGFzay10aXRsZS1idG5cIilcclxuICAgICAgdGFza1RpdGxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBkaXNwbGF5VGFza0RldGFpbCh0YXNrKSlcclxuXHJcbiAgICAgIGNvbnN0IHRhc2tDaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICB0YXNrQ2hlY2tib3guY2xhc3NOYW1lID0gXCJtYXRlcmlhbC1pY29ucyB0YXNrLWNoZWNrYm94XCI7XHJcbiAgICAgIHRhc2tDaGVja2JveC50ZXh0Q29udGVudCA9IFwiY2hlY2tfYm94X291dGxpbmVfYmxhbmtcIjtcclxuICAgICAgdGFza0NoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgIGlmICh0YXNrLmdldElzQ29tcGxldGVkKCkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQudGV4dENvbnRlbnQgPSBcImNoZWNrX2JveFwiO1xyXG4gICAgICAgICAgdGFzay5zZXRDb21wbGV0ZVN0YXR1cyh0cnVlKTtcclxuICAgICAgICAgIGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBcIjAuM1wiO1xyXG4gICAgICAgICAgdGFza1RpdGxlLnN0eWxlLnRleHREZWNvcmF0aW9uID0gXCJsaW5lLXRocm91Z2hcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnRleHRDb250ZW50ID0gXCJjaGVja19ib3hfb3V0bGluZV9ibGFua1wiO1xyXG4gICAgICAgICAgdGFzay5zZXRDb21wbGV0ZVN0YXR1cyhmYWxzZSk7XHJcbiAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcbiAgICAgICAgICB0YXNrVGl0bGUuc3R5bGUudGV4dERlY29yYXRpb24gPSBcIm5vbmVcIjtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICB0YXNrRHVlRGF0ZS5jbGFzc0xpc3QuYWRkKFwidGFzay1kdWUtZGF0ZVwiKTtcclxuICAgICAgdGFza0R1ZURhdGUudGV4dENvbnRlbnQgPSB0YXNrLmdldER1ZURhdGUoKTtcclxuXHJcbiAgICAgIGNvbnN0IHRhc2tFZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgIHRhc2tFZGl0QnRuLmNsYXNzTmFtZSA9IFwibWF0ZXJpYWwtaWNvbnMtb3V0bGluZWQgYnRuLWVkaXQtdGFza1wiO1xyXG4gICAgICB0YXNrRWRpdEJ0bi50ZXh0Q29udGVudCA9IFwiZWRpdFwiO1xyXG4gICAgICB0YXNrRWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gZGlzcGxheVRhc2tNb2RhbChcImVkaXRcIiwgdGFzaykpO1xyXG5cclxuICAgICAgY29uc3QgdGFza0RlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICB0YXNrRGVsZXRlQnRuLmNsYXNzTmFtZSA9IFwibWF0ZXJpYWwtaWNvbnMgYnRuLWRlbGV0ZS10YXNrXCI7XHJcbiAgICAgIHRhc2tEZWxldGVCdG4udGV4dENvbnRlbnQgPSBcImRlbGV0ZV9vdXRsaW5lXCI7XHJcbiAgICAgIHRhc2tEZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgYWN0aXZlUHJvamVjdC5yZW1vdmVUYXNrKGluZGV4KTtcclxuICAgICAgICBlLmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tDaGVja2JveCk7XHJcbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza1RpdGxlKTsgICAgICBcclxuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrRHVlRGF0ZSk7XHJcbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0VkaXRCdG4pO1xyXG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tEZWxldGVCdG4pO1xyXG4gICAgICB0YXNrTGlzdERpdi5hcHBlbmRDaGlsZCh0YXNrRGl2KTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBjb25zdCB1cGRhdGVUYXNrRGlzcGxheSA9ICh0YXNrKSA9PiB7XHJcbiAgICBjb25zdCB0YXNrVGl0bGVEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLXRpdGxlLWJ0blwiKTtcclxuICAgIGNvbnN0IHRhc2tEYXRlRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kdWUtZGF0ZVwiKTtcclxuICAgIHRhc2tUaXRsZURpc3BsYXkudGV4dENvbnRlbnQgPSB0YXNrLmdldFRpdGxlKCk7XHJcbiAgICB0YXNrRGF0ZURpc3BsYXkudGV4dENvbnRlbnQgPSB0YXNrLmdldER1ZURhdGUoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGhpZGVUYXNrTW9kYWwgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0YXNrSW5wdXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1tb2RhbC1jb250YWluZXJcIik7XHJcbiAgICB0YXNrSW5wdXRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblxyXG4gICAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLXRpdGxlXCIpO1xyXG4gICAgY29uc3QgdGFza0Rlc2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZGVzY3JpcHRpb25cIik7XHJcbiAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kdWUtZGF0ZVwiKTtcclxuXHJcbiAgICB0YXNrVGl0bGUudmFsdWUgPSBcIlwiO1xyXG4gICAgdGFza0Rlc2MudmFsdWUgPSBcIlwiO1xyXG4gICAgdGFza0R1ZURhdGUudmFsdWUgPSBcIlwiO1xyXG4gIH1cclxuICBcclxuICBjb25zdCBkaXNwbGF5VGFza01vZGFsID0gKG1vZGFsVHlwZSwgdGFzaykgPT4ge1xyXG4gICAgY29uc3QgaW5wdXRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnB1dC10YXNrLWJ0blwiKTtcclxuICAgIGlucHV0VGFza0J0bi50ZXh0Q29udGVudCA9IFwiXCI7XHJcblxyXG4gICAgY29uc3QgY2FuY2VsQWRkVGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBjYW5jZWxBZGRUYXNrQnRuLmNsYXNzTGlzdC5hZGQoXCJidG4tY2FuY2VsLXRhc2tcIik7XHJcbiAgICBjYW5jZWxBZGRUYXNrQnRuLnRleHRDb250ZW50ID0gXCJDYW5jZWxcIlxyXG4gICAgY2FuY2VsQWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGlkZVRhc2tNb2RhbCk7XHJcblxyXG4gICAgY29uc3Qgc3VibWl0VGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcblxyXG4gICAgaWYgKG1vZGFsVHlwZSA9PT0gXCJhZGRcIikge1xyXG4gICAgICBzdWJtaXRUYXNrQnRuLnRleHRDb250ZW50ID0gXCJBZGQgVGFza1wiO1xyXG4gICAgICBzdWJtaXRUYXNrQnRuLmNsYXNzTGlzdC5hZGQoXCJidG4tZWRpdC10YXNrXCIpO1xyXG4gICAgICBzdWJtaXRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlUHJvamVjdE5hbWUgPSB0b0RvTGlzdC5nZXRBY3RpdmVQcm9qZWN0TmFtZSgpO1xyXG4gICAgICAgIGlmIChhZGRUYXNrdG9Qcm9qZWN0KGFjdGl2ZVByb2plY3ROYW1lKSkge1xyXG4gICAgICAgICAgZGlzcGxheVRhc2soKTtcclxuICAgICAgICAgIGhpZGVUYXNrTW9kYWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2UgaWYgKG1vZGFsVHlwZSA9PT0gXCJlZGl0XCIpIHtcclxuICAgICAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLXRpdGxlXCIpO1xyXG4gICAgICBjb25zdCB0YXNrRGVzYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kZXNjcmlwdGlvblwiKTtcclxuICAgICAgY29uc3QgdGFza0R1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZHVlLWRhdGVcIik7XHJcblxyXG4gICAgICB0YXNrVGl0bGUudmFsdWUgPSB0YXNrLmdldFRpdGxlKCk7XHJcbiAgICAgIHRhc2tEZXNjLnZhbHVlID0gdGFzay5nZXREZXNjcmlwdGlvbigpO1xyXG4gICAgICB0YXNrRHVlRGF0ZS52YWx1ZSA9IHRhc2suZ2V0RHVlRGF0ZSgpO1xyXG4gICAgICBzdWJtaXRUYXNrQnRuLnRleHRDb250ZW50ID0gXCJFZGl0IFRhc2tcIjtcclxuICAgICAgc3VibWl0VGFza0J0bi5jbGFzc0xpc3QuYWRkKFwiYnRuLWVkaXQtdGFza1wiKTtcclxuXHJcbiAgICAgIHN1Ym1pdFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICB0YXNrLnNldFRpdGxlKHRhc2tUaXRsZS52YWx1ZSk7XHJcbiAgICAgICAgdGFzay5zZXREdWVEYXRlKHRhc2tEdWVEYXRlLnZhbHVlKTtcclxuICAgICAgICB0YXNrLnNldERlc2NyaXB0aW9uKHRhc2tEZXNjLnZhbHVlKTtcclxuICAgICAgICB1cGRhdGVUYXNrRGlzcGxheSh0YXNrKTtcclxuICAgICAgICBoaWRlVGFza01vZGFsKCk7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRUYXNrQnRuLmFwcGVuZENoaWxkKHN1Ym1pdFRhc2tCdG4pO1xyXG4gICAgaW5wdXRUYXNrQnRuLmFwcGVuZENoaWxkKGNhbmNlbEFkZFRhc2tCdG4pO1xyXG4gICAgXHJcbiAgICBjb25zdCB0YXNrSW5wdXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1tb2RhbC1jb250YWluZXJcIik7XHJcbiAgICB0YXNrSW5wdXRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkaXNwbGF5UHJvamVjdFBhZ2UgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtdGl0bGVcIik7XHJcbiAgICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSB0b0RvTGlzdC5nZXRBY3RpdmVQcm9qZWN0TmFtZSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdGFza0J0bkxpc3RlbmVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYWRkVGFza0lucHV0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcclxuICAgIGFkZFRhc2tJbnB1dEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gZGlzcGxheVRhc2tNb2RhbChcImFkZFwiKSk7XHJcbiAgfVxyXG4gIFxyXG4gIGNvbnN0IHByb2plY3RMaXN0ZW5lciA9ICgpID0+IHtcclxuICAgIGNvbnN0IHByb2plY3ROYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RcIik7XHJcbiAgICBwcm9qZWN0TmF2LmZvckVhY2gocHJvamVjdCA9PiB7XHJcbiAgICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgdG9Eb0xpc3Quc2V0QWN0aXZlUHJvamVjdE5hbWUoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQucHJvamVjdCk7XHJcbiAgICAgICAgZGlzcGxheVByb2plY3RQYWdlKCk7XHJcbiAgICAgICAgZGlzcGxheVRhc2soKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBjdXN0b21Qcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1c3RvbS1wcm9qZWN0LWlucHV0XCIpO1xyXG5cclxuICAgIGNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0XCIpO1xyXG4gICAgYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBjdXN0b21Qcm9qZWN0SW5wdXQuc3R5bGUuZGlzcGxheSA9IFwiZ3JpZFwiO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgYWRkTmV3UHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLWFkZC1wcm9qZWN0XCIpO1xyXG4gICAgYWRkTmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBjb25zdCBwcm9qZWN0TmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjdXN0b20tcHJvamVjdC1uYW1lXCIpO1xyXG4gICAgICBhZGRQcm9qZWN0KHByb2plY3ROYW1lSW5wdXQudmFsdWUpO1xyXG4gICAgICBkaXNwbGF5Q3VzdG9tUHJvamVjdHMoKTtcclxuICAgICAgY3VzdG9tUHJvamVjdElucHV0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgY2FuY2VsQWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLWNhbmNlbC1hZGQtcHJvamVjdFwiKTtcclxuICAgIGNhbmNlbEFkZFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgY3VzdG9tUHJvamVjdElucHV0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBjb25zdCBsb2FkUGFnZSA9ICgpID0+IHtcclxuICAgIHRhc2tCdG5MaXN0ZW5lcigpO1xyXG4gICAgZGlzcGxheUN1c3RvbVByb2plY3RzKCk7XHJcbiAgICBwcm9qZWN0TGlzdGVuZXIoKTtcclxuICAgIGRpc3BsYXlQcm9qZWN0UGFnZSgpO1xyXG4gICAgZGlzcGxheVRhc2soKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBsb2FkUGFnZVxyXG4gIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3ZWJJbnRlcmZhY2U7IiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdHNcIjtcclxuXHJcbmNvbnN0IHRvRG9MaXN0ID0gKCgpID0+IHtcclxuICBsZXQgcHJvamVjdExpc3QgPSBbXTtcclxuICBwcm9qZWN0TGlzdC5wdXNoKG5ldyBQcm9qZWN0KFwiSW5ib3hcIikpO1xyXG4gIHByb2plY3RMaXN0LnB1c2gobmV3IFByb2plY3QoXCJUb2RheVwiKSk7XHJcbiAgcHJvamVjdExpc3QucHVzaChuZXcgUHJvamVjdChcIlRoaXMgV2Vla1wiKSk7XHJcblxyXG4gIGxldCBhY3RpdmVQcm9qZWN0TmFtZSA9IFwiSW5ib3hcIjtcclxuXHJcbiAgY29uc3QgYWRkTmV3UHJvamVjdCA9IChwcm9qZWN0KSA9PiBwcm9qZWN0TGlzdC5wdXNoKHByb2plY3QpO1xyXG5cclxuICBjb25zdCBnZXRBbGxQcm9qZWN0cyA9ICgpID0+IHByb2plY3RMaXN0O1xyXG5cclxuICBjb25zdCBnZXRQcm9qZWN0ID0gKG5hbWUpID0+IHByb2plY3RMaXN0LmZpbmQoZWwgPT4gZWwubmFtZSA9PSBuYW1lKTtcclxuXHJcbiAgY29uc3Qgc2V0QWN0aXZlUHJvamVjdE5hbWUgPSAocHJvamVjdE5hbWUpID0+IGFjdGl2ZVByb2plY3ROYW1lID0gcHJvamVjdE5hbWU7XHJcblxyXG4gIGNvbnN0IGdldEFjdGl2ZVByb2plY3ROYW1lID0gKCkgPT4gYWN0aXZlUHJvamVjdE5hbWU7XHJcblxyXG4gIGNvbnN0IGdldEFjdGl2ZVByb2plY3QgPSAoKSA9PiBnZXRQcm9qZWN0KGdldEFjdGl2ZVByb2plY3ROYW1lKCkpO1xyXG4gIFxyXG4gIHJldHVybiB7XHJcbiAgICBhZGROZXdQcm9qZWN0LFxyXG4gICAgZ2V0QWxsUHJvamVjdHMsXHJcbiAgICBnZXRQcm9qZWN0LFxyXG4gICAgc2V0QWN0aXZlUHJvamVjdE5hbWUsXHJcbiAgICBnZXRBY3RpdmVQcm9qZWN0TmFtZSxcclxuICAgIGdldEFjdGl2ZVByb2plY3RcclxuICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdG9Eb0xpc3Q7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMudGFza3MgPSBbXTtcclxuICB9XHJcblxyXG4gIGFkZFRhc2sodGFzaykge1xyXG4gICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlVGFzayhpbmRleCkge1xyXG4gICAgdGhpcy50YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJvamVjdE5hbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGFzayhuYW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy50YXNrcy5maW5kKHRhc2sgPT4gdGFzay5uYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIGdldEFsbFRhc2tzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGFza3M7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XHJcbiAgY29uc3RydWN0b3IodGl0bGUsIGR1ZURhdGUgPSBcIk5vIGRhdGVcIiwgaXNDb21wbGV0ZWQgPSBmYWxzZSwgZGVzY3JpcHRpb24gPSBcIi1cIikge1xyXG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcclxuICAgIHRoaXMuaXNDb21wbGV0ZWQgPSBpc0NvbXBsZXRlZDtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICB9XHJcblxyXG4gIHNldFRpdGxlKHRpdGxlKSB7XHJcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgfVxyXG5cclxuICBzZXREdWVEYXRlKGRhdGUpIHtcclxuICAgIHRoaXMuZHVlRGF0ZSA9IGRhdGU7XHJcbiAgfVxyXG5cclxuICBzZXREZXNjcmlwdGlvbihkZXNjKSB7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY1xyXG4gIH1cclxuXHJcbiAgc2V0Q29tcGxldGVTdGF0dXMoaXNDb21wbGV0ZWQpIHtcclxuICAgIHRoaXMuaXNDb21wbGV0ZWQgPSBpc0NvbXBsZXRlZDtcclxuICB9XHJcblxyXG4gIGdldFRpdGxlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGl0bGU7XHJcbiAgfVxyXG5cclxuICBnZXREZXNjcmlwdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uO1xyXG4gIH1cclxuXHJcbiAgZ2V0RHVlRGF0ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmR1ZURhdGU7XHJcbiAgfVxyXG5cclxuICBnZXRJc0NvbXBsZXRlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLmlzQ29tcGxldGVkO1xyXG4gIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFRhc2sgZnJvbSBcIi4vdGFza1wiO1xyXG5pbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0c1wiO1xyXG5pbXBvcnQgdG9Eb0xpc3QgZnJvbSBcIi4vbG9naWNcIjtcclxuaW1wb3J0IHdlYkludGVyZmFjZSBmcm9tIFwiLi9pbnRlcmZhY2VcIjtcclxuXHJcbndlYkludGVyZmFjZS5sb2FkUGFnZSgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=