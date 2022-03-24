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

  const displayTaskModal = () => {
    const taskInputModal = document.querySelector(".task-modal-container");
    taskInputModal.style.display = "flex";
  }

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

    return true;
  }

  const addProject = (projectName) => {
    const newProject = new _projects__WEBPACK_IMPORTED_MODULE_2__["default"](projectName);
    _logic__WEBPACK_IMPORTED_MODULE_1__["default"].addNewProject(newProject);
  }

  const hideTaskModal = () => {
    const taskInputModal = document.querySelector(".task-modal-container");
    taskInputModal.style.display = "none";
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
      taskDiv.appendChild(taskDeleteBtn);
      taskListDiv.appendChild(taskDiv);
    })
  }

  const displayProjectPage = () => {
    const projectTitle = document.querySelector(".project-title");
    projectTitle.textContent = _logic__WEBPACK_IMPORTED_MODULE_1__["default"].getActiveProjectName();
  }

  const taskBtnListener = () => {
    const addTaskInputBtn = document.querySelector(".add-task");
    addTaskInputBtn.addEventListener("click", displayTaskModal);

    const cancelAddTaskBtn = document.querySelector(".btn-cancel-task");
    cancelAddTaskBtn.addEventListener("click", hideTaskModal);

    const addTaskBtn = document.querySelector(".btn-add-task");
    addTaskBtn.addEventListener("click", () => {
      const activeProjectName = _logic__WEBPACK_IMPORTED_MODULE_1__["default"].getActiveProjectName();
      if (addTasktoProject(activeProjectName)) {
        displayTask();
        hideTaskModal();
      }
    })
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

  setTaskTitle(title) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDdkNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOMEI7QUFDTztBQUNGO0FBQ1E7QUFDdkM7QUFDQSwyREFBcUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2xvZ2ljLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy90YXNrLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUYXNrIGZyb20gXCIuL3Rhc2tcIjtcclxuaW1wb3J0IHRvRG9MaXN0IGZyb20gXCIuL2xvZ2ljXCI7XHJcbmltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3RzXCI7XHJcblxyXG5jb25zdCB3ZWJJbnRlcmZhY2UgPSAoKCkgPT4ge1xyXG5cclxuICBjb25zdCBkaXNwbGF5VGFza01vZGFsID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdGFza0lucHV0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbW9kYWwtY29udGFpbmVyXCIpO1xyXG4gICAgdGFza0lucHV0TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYWRkVGFza3RvUHJvamVjdCA9IChwcm9qZWN0TmFtZSkgPT4ge1xyXG4gICAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLXRpdGxlXCIpO1xyXG4gICAgY29uc3QgdGFza0Rlc2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZGVzY3JpcHRpb25cIik7XHJcbiAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kdWUtZGF0ZVwiKTtcclxuICAgIGNvbnN0IHByb2plY3QgPSB0b0RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3ROYW1lKTtcclxuICAgIGNvbnN0IHByb2plY3RUYXNrcyA9IHByb2plY3QuZ2V0QWxsVGFza3MoKTtcclxuXHJcbiAgICBpZiAocHJvamVjdFRhc2tzLnNvbWUodGFzayA9PiB0YXNrLnRpdGxlID09PSB0YXNrVGl0bGUudmFsdWUpKSB7XHJcbiAgICAgIGFsZXJ0KFwiVGFzayBhbHJlYWR5IGV4aXN0cyFcIik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayh0YXNrVGl0bGUudmFsdWUpO1xyXG4gICAgdGFzay5zZXREZXNjcmlwdGlvbih0YXNrRGVzYy52YWx1ZSk7XHJcbiAgICB0YXNrLnNldER1ZURhdGUodGFza0R1ZURhdGUudmFsdWUpO1xyXG4gICAgcHJvamVjdC5hZGRUYXNrKHRhc2spO1xyXG5cclxuICAgIHRhc2tUaXRsZS52YWx1ZSA9IFwiXCI7XHJcbiAgICB0YXNrRGVzYy52YWx1ZSA9IFwiXCI7XHJcbiAgICB0YXNrRHVlRGF0ZS52YWx1ZSA9IFwiXCI7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhZGRQcm9qZWN0ID0gKHByb2plY3ROYW1lKSA9PiB7XHJcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QocHJvamVjdE5hbWUpO1xyXG4gICAgdG9Eb0xpc3QuYWRkTmV3UHJvamVjdChuZXdQcm9qZWN0KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGhpZGVUYXNrTW9kYWwgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0YXNrSW5wdXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1tb2RhbC1jb250YWluZXJcIik7XHJcbiAgICB0YXNrSW5wdXRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkaXNwbGF5Q3VzdG9tUHJvamVjdHMgPSAoKSA9PiB7XHJcbiAgICBsZXQgcHJvamVjdExpc3QgPSB0b0RvTGlzdC5nZXRBbGxQcm9qZWN0cygpO1xyXG4gICAgY29uc3QgY3VzdG9tUHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1c3RvbS1wcm9qZWN0LWxpc3RcIik7XHJcbiAgICBjdXN0b21Qcm9qZWN0TGlzdC50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICBpZiAocHJvamVjdExpc3QubGVuZ3RoID4gMykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMzsgaSA8IHByb2plY3RMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgY3VzdG9tUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY3VzdG9tUHJvamVjdC5jbGFzc05hbWUgPSBcInByb2plY3QgY3VzdG9tLXByb2plY3RcIjtcclxuICAgICAgICBjdXN0b21Qcm9qZWN0LnNldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiLCBgJHtwcm9qZWN0TGlzdFtpXS5uYW1lfWApO1xyXG4gICAgICAgIGNvbnN0IGN1c3RvbVByb2plY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgY3VzdG9tUHJvamVjdE5hbWUudGV4dENvbnRlbnQgPSBwcm9qZWN0TGlzdFtpXS5uYW1lXHJcbiAgICAgICAgY3VzdG9tUHJvamVjdC5hcHBlbmRDaGlsZChjdXN0b21Qcm9qZWN0TmFtZSk7XHJcbiAgICAgICAgY3VzdG9tUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgIHRvRG9MaXN0LnNldEFjdGl2ZVByb2plY3ROYW1lKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnByb2plY3QpO1xyXG4gICAgICAgICAgZGlzcGxheVByb2plY3RQYWdlKCk7XHJcbiAgICAgICAgICBkaXNwbGF5VGFzaygpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY3VzdG9tUHJvamVjdExpc3QuYXBwZW5kQ2hpbGQoY3VzdG9tUHJvamVjdCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGRpc3BsYXlUYXNrRGV0YWlsID0gKHRhc2spID0+IHtcclxuICAgIGNvbnN0IHRhc2tEZXRhaWxNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kZXRhaWwtbW9kYWxcIik7XHJcbiAgICBjb25zdCB0YXNrRGV0YWlsVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGV0YWlsLXRpdGxlXCIpO1xyXG4gICAgY29uc3QgdGFza0RldGFpbERhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGV0YWlsLWRhdGVcIik7XHJcbiAgICBjb25zdCB0YXNrRGV0YWlsRGVzYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kZXRhaWwtZGVzY1wiKTtcclxuICAgIGNvbnN0IHRhc2tEZXRhaWxDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kZXRhaWwtY2xvc2VcIik7XHJcblxyXG4gICAgdGFza0RldGFpbFRpdGxlLnRleHRDb250ZW50ID0gdGFzay5nZXRUaXRsZSgpO1xyXG4gICAgdGFza0RldGFpbERhdGUudGV4dENvbnRlbnQgPSB0YXNrLmdldER1ZURhdGUoKTtcclxuICAgIHRhc2tEZXRhaWxEZXNjLnRleHRDb250ZW50ID0gdGFzay5nZXREZXNjcmlwdGlvbigpO1xyXG5cclxuICAgIHRhc2tEZXRhaWxDbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGFza0RldGFpbE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIik7XHJcblxyXG4gICAgdGFza0RldGFpbE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICB9XHJcblxyXG4gIGNvbnN0IGRpc3BsYXlUYXNrID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdGFza0xpc3REaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbGlzdFwiKTtcclxuICAgIHRhc2tMaXN0RGl2LnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gdG9Eb0xpc3QuZ2V0QWN0aXZlUHJvamVjdCgpO1xyXG4gICAgbGV0IHByb2plY3RUYXNrcyA9IGFjdGl2ZVByb2plY3QuZ2V0QWxsVGFza3MoKTtcclxuICAgIHByb2plY3RUYXNrcy5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xyXG4gICAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKFwidGFza1wiKVxyXG5cclxuICAgICAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgIHRhc2tUaXRsZS50ZXh0Q29udGVudCA9IHRhc2suZ2V0VGl0bGUoKTtcclxuICAgICAgdGFza1RpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLXRpdGxlLWJ0blwiKVxyXG4gICAgICB0YXNrVGl0bGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGRpc3BsYXlUYXNrRGV0YWlsKHRhc2spKVxyXG5cclxuICAgICAgY29uc3QgdGFza0NoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgIHRhc2tDaGVja2JveC5jbGFzc05hbWUgPSBcIm1hdGVyaWFsLWljb25zIHRhc2stY2hlY2tib3hcIjtcclxuICAgICAgdGFza0NoZWNrYm94LnRleHRDb250ZW50ID0gXCJjaGVja19ib3hfb3V0bGluZV9ibGFua1wiO1xyXG4gICAgICB0YXNrQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKHRhc2suZ2V0SXNDb21wbGV0ZWQoKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIGUuY3VycmVudFRhcmdldC50ZXh0Q29udGVudCA9IFwiY2hlY2tfYm94XCI7XHJcbiAgICAgICAgICB0YXNrLnNldENvbXBsZXRlU3RhdHVzKHRydWUpO1xyXG4gICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IFwiMC4zXCI7XHJcbiAgICAgICAgICB0YXNrVGl0bGUuc3R5bGUudGV4dERlY29yYXRpb24gPSBcImxpbmUtdGhyb3VnaFwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQudGV4dENvbnRlbnQgPSBcImNoZWNrX2JveF9vdXRsaW5lX2JsYW5rXCI7XHJcbiAgICAgICAgICB0YXNrLnNldENvbXBsZXRlU3RhdHVzKGZhbHNlKTtcclxuICAgICAgICAgIGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgICAgICAgIHRhc2tUaXRsZS5zdHlsZS50ZXh0RGVjb3JhdGlvbiA9IFwibm9uZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgIHRhc2tEdWVEYXRlLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWR1ZS1kYXRlXCIpO1xyXG4gICAgICB0YXNrRHVlRGF0ZS50ZXh0Q29udGVudCA9IHRhc2suZ2V0RHVlRGF0ZSgpO1xyXG5cclxuICAgICAgY29uc3QgdGFza0RlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICB0YXNrRGVsZXRlQnRuLmNsYXNzTmFtZSA9IFwibWF0ZXJpYWwtaWNvbnMgYnRuLWRlbGV0ZS10YXNrXCI7XHJcbiAgICAgIHRhc2tEZWxldGVCdG4udGV4dENvbnRlbnQgPSBcImRlbGV0ZV9vdXRsaW5lXCI7XHJcbiAgICAgIHRhc2tEZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgYWN0aXZlUHJvamVjdC5yZW1vdmVUYXNrKGluZGV4KTtcclxuICAgICAgICBlLmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tDaGVja2JveCk7XHJcbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza1RpdGxlKTsgICAgICBcclxuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrRHVlRGF0ZSk7ICAgICAgXHJcbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0RlbGV0ZUJ0bik7XHJcbiAgICAgIHRhc2tMaXN0RGl2LmFwcGVuZENoaWxkKHRhc2tEaXYpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGNvbnN0IGRpc3BsYXlQcm9qZWN0UGFnZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC10aXRsZVwiKTtcclxuICAgIHByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9IHRvRG9MaXN0LmdldEFjdGl2ZVByb2plY3ROYW1lKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB0YXNrQnRuTGlzdGVuZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhZGRUYXNrSW5wdXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrXCIpO1xyXG4gICAgYWRkVGFza0lucHV0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkaXNwbGF5VGFza01vZGFsKTtcclxuXHJcbiAgICBjb25zdCBjYW5jZWxBZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tY2FuY2VsLXRhc2tcIik7XHJcbiAgICBjYW5jZWxBZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoaWRlVGFza01vZGFsKTtcclxuXHJcbiAgICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tYWRkLXRhc2tcIik7XHJcbiAgICBhZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGFjdGl2ZVByb2plY3ROYW1lID0gdG9Eb0xpc3QuZ2V0QWN0aXZlUHJvamVjdE5hbWUoKTtcclxuICAgICAgaWYgKGFkZFRhc2t0b1Byb2plY3QoYWN0aXZlUHJvamVjdE5hbWUpKSB7XHJcbiAgICAgICAgZGlzcGxheVRhc2soKTtcclxuICAgICAgICBoaWRlVGFza01vZGFsKCk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIFxyXG4gIGNvbnN0IHByb2plY3RMaXN0ZW5lciA9ICgpID0+IHtcclxuICAgIGNvbnN0IHByb2plY3ROYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RcIik7XHJcbiAgICBwcm9qZWN0TmF2LmZvckVhY2gocHJvamVjdCA9PiB7XHJcbiAgICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgdG9Eb0xpc3Quc2V0QWN0aXZlUHJvamVjdE5hbWUoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQucHJvamVjdCk7XHJcbiAgICAgICAgZGlzcGxheVByb2plY3RQYWdlKCk7XHJcbiAgICAgICAgZGlzcGxheVRhc2soKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBjdXN0b21Qcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1c3RvbS1wcm9qZWN0LWlucHV0XCIpO1xyXG5cclxuICAgIGNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0XCIpO1xyXG4gICAgYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBjdXN0b21Qcm9qZWN0SW5wdXQuc3R5bGUuZGlzcGxheSA9IFwiZ3JpZFwiO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgYWRkTmV3UHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLWFkZC1wcm9qZWN0XCIpO1xyXG4gICAgYWRkTmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBjb25zdCBwcm9qZWN0TmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjdXN0b20tcHJvamVjdC1uYW1lXCIpO1xyXG4gICAgICBhZGRQcm9qZWN0KHByb2plY3ROYW1lSW5wdXQudmFsdWUpO1xyXG4gICAgICBkaXNwbGF5Q3VzdG9tUHJvamVjdHMoKTtcclxuICAgICAgY3VzdG9tUHJvamVjdElucHV0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgY2FuY2VsQWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLWNhbmNlbC1hZGQtcHJvamVjdFwiKTtcclxuICAgIGNhbmNlbEFkZFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgY3VzdG9tUHJvamVjdElucHV0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBjb25zdCBsb2FkUGFnZSA9ICgpID0+IHtcclxuICAgIHRhc2tCdG5MaXN0ZW5lcigpO1xyXG4gICAgZGlzcGxheUN1c3RvbVByb2plY3RzKCk7XHJcbiAgICBwcm9qZWN0TGlzdGVuZXIoKTtcclxuICAgIGRpc3BsYXlQcm9qZWN0UGFnZSgpO1xyXG4gICAgZGlzcGxheVRhc2soKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBsb2FkUGFnZVxyXG4gIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3ZWJJbnRlcmZhY2U7IiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdHNcIjtcclxuXHJcbmNvbnN0IHRvRG9MaXN0ID0gKCgpID0+IHtcclxuICBsZXQgcHJvamVjdExpc3QgPSBbXTtcclxuICBwcm9qZWN0TGlzdC5wdXNoKG5ldyBQcm9qZWN0KFwiSW5ib3hcIikpO1xyXG4gIHByb2plY3RMaXN0LnB1c2gobmV3IFByb2plY3QoXCJUb2RheVwiKSk7XHJcbiAgcHJvamVjdExpc3QucHVzaChuZXcgUHJvamVjdChcIlRoaXMgV2Vla1wiKSk7XHJcblxyXG4gIGxldCBhY3RpdmVQcm9qZWN0TmFtZSA9IFwiSW5ib3hcIjtcclxuXHJcbiAgY29uc3QgYWRkTmV3UHJvamVjdCA9IChwcm9qZWN0KSA9PiBwcm9qZWN0TGlzdC5wdXNoKHByb2plY3QpO1xyXG5cclxuICBjb25zdCBnZXRBbGxQcm9qZWN0cyA9ICgpID0+IHByb2plY3RMaXN0O1xyXG5cclxuICBjb25zdCBnZXRQcm9qZWN0ID0gKG5hbWUpID0+IHByb2plY3RMaXN0LmZpbmQoZWwgPT4gZWwubmFtZSA9PSBuYW1lKTtcclxuXHJcbiAgY29uc3Qgc2V0QWN0aXZlUHJvamVjdE5hbWUgPSAocHJvamVjdE5hbWUpID0+IGFjdGl2ZVByb2plY3ROYW1lID0gcHJvamVjdE5hbWU7XHJcblxyXG4gIGNvbnN0IGdldEFjdGl2ZVByb2plY3ROYW1lID0gKCkgPT4gYWN0aXZlUHJvamVjdE5hbWU7XHJcblxyXG4gIGNvbnN0IGdldEFjdGl2ZVByb2plY3QgPSAoKSA9PiBnZXRQcm9qZWN0KGdldEFjdGl2ZVByb2plY3ROYW1lKCkpO1xyXG4gIFxyXG4gIHJldHVybiB7XHJcbiAgICBhZGROZXdQcm9qZWN0LFxyXG4gICAgZ2V0QWxsUHJvamVjdHMsXHJcbiAgICBnZXRQcm9qZWN0LFxyXG4gICAgc2V0QWN0aXZlUHJvamVjdE5hbWUsXHJcbiAgICBnZXRBY3RpdmVQcm9qZWN0TmFtZSxcclxuICAgIGdldEFjdGl2ZVByb2plY3RcclxuICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdG9Eb0xpc3Q7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMudGFza3MgPSBbXTtcclxuICB9XHJcblxyXG4gIGFkZFRhc2sodGFzaykge1xyXG4gICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlVGFzayhpbmRleCkge1xyXG4gICAgdGhpcy50YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJvamVjdE5hbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGFzayhuYW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy50YXNrcy5maW5kKHRhc2sgPT4gdGFzay5uYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIGdldEFsbFRhc2tzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGFza3M7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XHJcbiAgY29uc3RydWN0b3IodGl0bGUsIGR1ZURhdGUgPSBcIk5vIGRhdGVcIiwgaXNDb21wbGV0ZWQgPSBmYWxzZSwgZGVzY3JpcHRpb24gPSBcIi1cIikge1xyXG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcclxuICAgIHRoaXMuaXNDb21wbGV0ZWQgPSBpc0NvbXBsZXRlZDtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICB9XHJcblxyXG4gIHNldFRhc2tUaXRsZSh0aXRsZSkge1xyXG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gIH1cclxuXHJcbiAgc2V0RHVlRGF0ZShkYXRlKSB7XHJcbiAgICB0aGlzLmR1ZURhdGUgPSBkYXRlO1xyXG4gIH1cclxuXHJcbiAgc2V0RGVzY3JpcHRpb24oZGVzYykge1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NcclxuICB9XHJcblxyXG4gIHNldENvbXBsZXRlU3RhdHVzKGlzQ29tcGxldGVkKSB7XHJcbiAgICB0aGlzLmlzQ29tcGxldGVkID0gaXNDb21wbGV0ZWQ7XHJcbiAgfVxyXG5cclxuICBnZXRUaXRsZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRpdGxlO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGVzY3JpcHRpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbjtcclxuICB9XHJcblxyXG4gIGdldER1ZURhdGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kdWVEYXRlO1xyXG4gIH1cclxuXHJcbiAgZ2V0SXNDb21wbGV0ZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pc0NvbXBsZXRlZDtcclxuICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBUYXNrIGZyb20gXCIuL3Rhc2tcIjtcclxuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdHNcIjtcclxuaW1wb3J0IHRvRG9MaXN0IGZyb20gXCIuL2xvZ2ljXCI7XHJcbmltcG9ydCB3ZWJJbnRlcmZhY2UgZnJvbSBcIi4vaW50ZXJmYWNlXCI7XHJcblxyXG53ZWJJbnRlcmZhY2UubG9hZFBhZ2UoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9