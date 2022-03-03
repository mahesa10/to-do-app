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

  const displayTaskField = (e) => {
    const addTaskInput = document.querySelector(".add-task-input");
    addTaskInput.style.display = "grid";
    e.currentTarget.style.display = "none";
  }

  const addTasktoProject = (projectName) => {
    const taskTitle = document.querySelector("#task-title");
    const taskDesc = document.querySelector("#task-description");
    const taskDueDate = document.querySelector("#task-due-date");
    const task = new _task__WEBPACK_IMPORTED_MODULE_0__["default"](taskTitle.value);
    task.setDescription(taskDesc.value);
    task.setDueDate(taskDueDate.value);
    const project = _logic__WEBPACK_IMPORTED_MODULE_1__["default"].getProject(projectName);
    project.addTask(task);
  }

  const addProject = (projectName) => {
    const newProject = new _projects__WEBPACK_IMPORTED_MODULE_2__["default"](projectName);
    _logic__WEBPACK_IMPORTED_MODULE_1__["default"].addNewProject(newProject);
  }

  const hideTaskInput = () => {
    const addTaskInput = document.querySelector(".add-task-input");
    const addTaskInputBtn = document.querySelector(".add-task");
    addTaskInput.style.display = "none";
    addTaskInputBtn.style.display = "flex";
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

  const displayTask = () => {
    const taskListDiv = document.querySelector(".task-list");
    taskListDiv.textContent = "";
    let activeProject = _logic__WEBPACK_IMPORTED_MODULE_1__["default"].getActiveProject();
    let projectTasks = activeProject.getProjectTasks();
    projectTasks.forEach((task, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task")

      const taskCheckbox = document.createElement("span");
      taskCheckbox.className = "material-icons task-checkbox";
      taskCheckbox.textContent = "check_box_outline_blank";
      taskCheckbox.addEventListener("click", (e) => {
        if (task.getIsCompleted() === false) {
          e.currentTarget.textContent = "check_box";
          task.setCompleteStatus(true);
          e.currentTarget.parentElement.style.opacity = "0.3";
        } else {
          e.currentTarget.textContent = "check_box_outline_blank";
          task.setCompleteStatus(false);
          e.currentTarget.parentElement.style.opacity = "1";
        }
      })

      const taskTitle = document.createElement("p");
      taskTitle.textContent = task.getTaskTitle();

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
    addTaskInputBtn.addEventListener("click", displayTaskField);

    const cancelAddTaskBtn = document.querySelector(".btn-cancel-task");
    cancelAddTaskBtn.addEventListener("click", hideTaskInput);

    const addTaskBtn = document.querySelector(".btn-add-task");
    addTaskBtn.addEventListener("click", () => {
      addTasktoProject(_logic__WEBPACK_IMPORTED_MODULE_1__["default"].getActiveProjectName());
      displayTask();
      hideTaskInput();
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

  getProjectTasks() {
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
  constructor(title, dueDate = "No date", isCompleted = false, description = "") {
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

  getTaskTitle() {
    return this.title;
  }

  getTaskDescription() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ04wQjtBQUNPO0FBQ0Y7QUFDUTtBQUN2QztBQUNBLDJEQUFxQiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW50ZXJmYWNlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbG9naWMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRhc2sgZnJvbSBcIi4vdGFza1wiO1xyXG5pbXBvcnQgdG9Eb0xpc3QgZnJvbSBcIi4vbG9naWNcIjtcclxuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdHNcIjtcclxuXHJcbmNvbnN0IHdlYkludGVyZmFjZSA9ICgoKSA9PiB7XHJcblxyXG4gIGNvbnN0IGRpc3BsYXlUYXNrRmllbGQgPSAoZSkgPT4ge1xyXG4gICAgY29uc3QgYWRkVGFza0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1pbnB1dFwiKTtcclxuICAgIGFkZFRhc2tJbnB1dC5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XHJcbiAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYWRkVGFza3RvUHJvamVjdCA9IChwcm9qZWN0TmFtZSkgPT4ge1xyXG4gICAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLXRpdGxlXCIpO1xyXG4gICAgY29uc3QgdGFza0Rlc2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZGVzY3JpcHRpb25cIik7XHJcbiAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kdWUtZGF0ZVwiKTtcclxuICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayh0YXNrVGl0bGUudmFsdWUpO1xyXG4gICAgdGFzay5zZXREZXNjcmlwdGlvbih0YXNrRGVzYy52YWx1ZSk7XHJcbiAgICB0YXNrLnNldER1ZURhdGUodGFza0R1ZURhdGUudmFsdWUpO1xyXG4gICAgY29uc3QgcHJvamVjdCA9IHRvRG9MaXN0LmdldFByb2plY3QocHJvamVjdE5hbWUpO1xyXG4gICAgcHJvamVjdC5hZGRUYXNrKHRhc2spO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYWRkUHJvamVjdCA9IChwcm9qZWN0TmFtZSkgPT4ge1xyXG4gICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3ROYW1lKTtcclxuICAgIHRvRG9MaXN0LmFkZE5ld1Byb2plY3QobmV3UHJvamVjdCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBoaWRlVGFza0lucHV0ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYWRkVGFza0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1pbnB1dFwiKTtcclxuICAgIGNvbnN0IGFkZFRhc2tJbnB1dEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2tcIik7XHJcbiAgICBhZGRUYXNrSW5wdXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgYWRkVGFza0lucHV0QnRuLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICB9XHJcblxyXG4gIGNvbnN0IGRpc3BsYXlDdXN0b21Qcm9qZWN0cyA9ICgpID0+IHtcclxuICAgIGxldCBwcm9qZWN0TGlzdCA9IHRvRG9MaXN0LmdldEFsbFByb2plY3RzKCk7XHJcbiAgICBjb25zdCBjdXN0b21Qcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VzdG9tLXByb2plY3QtbGlzdFwiKTtcclxuICAgIGN1c3RvbVByb2plY3RMaXN0LnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgIGlmIChwcm9qZWN0TGlzdC5sZW5ndGggPiAzKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAzOyBpIDwgcHJvamVjdExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBjdXN0b21Qcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjdXN0b21Qcm9qZWN0LmNsYXNzTmFtZSA9IFwicHJvamVjdCBjdXN0b20tcHJvamVjdFwiO1xyXG4gICAgICAgIGN1c3RvbVByb2plY3Quc2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIsIGAke3Byb2plY3RMaXN0W2ldLm5hbWV9YCk7XHJcbiAgICAgICAgY29uc3QgY3VzdG9tUHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICBjdXN0b21Qcm9qZWN0TmFtZS50ZXh0Q29udGVudCA9IHByb2plY3RMaXN0W2ldLm5hbWVcclxuICAgICAgICBjdXN0b21Qcm9qZWN0LmFwcGVuZENoaWxkKGN1c3RvbVByb2plY3ROYW1lKTtcclxuICAgICAgICBjdXN0b21Qcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgdG9Eb0xpc3Quc2V0QWN0aXZlUHJvamVjdE5hbWUoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQucHJvamVjdCk7XHJcbiAgICAgICAgICBkaXNwbGF5UHJvamVjdFBhZ2UoKTtcclxuICAgICAgICAgIGRpc3BsYXlUYXNrKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBjdXN0b21Qcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChjdXN0b21Qcm9qZWN0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgZGlzcGxheVRhc2sgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0YXNrTGlzdERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1saXN0XCIpO1xyXG4gICAgdGFza0xpc3REaXYudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgbGV0IGFjdGl2ZVByb2plY3QgPSB0b0RvTGlzdC5nZXRBY3RpdmVQcm9qZWN0KCk7XHJcbiAgICBsZXQgcHJvamVjdFRhc2tzID0gYWN0aXZlUHJvamVjdC5nZXRQcm9qZWN0VGFza3MoKTtcclxuICAgIHByb2plY3RUYXNrcy5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xyXG4gICAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKFwidGFza1wiKVxyXG5cclxuICAgICAgY29uc3QgdGFza0NoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgIHRhc2tDaGVja2JveC5jbGFzc05hbWUgPSBcIm1hdGVyaWFsLWljb25zIHRhc2stY2hlY2tib3hcIjtcclxuICAgICAgdGFza0NoZWNrYm94LnRleHRDb250ZW50ID0gXCJjaGVja19ib3hfb3V0bGluZV9ibGFua1wiO1xyXG4gICAgICB0YXNrQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKHRhc2suZ2V0SXNDb21wbGV0ZWQoKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIGUuY3VycmVudFRhcmdldC50ZXh0Q29udGVudCA9IFwiY2hlY2tfYm94XCI7XHJcbiAgICAgICAgICB0YXNrLnNldENvbXBsZXRlU3RhdHVzKHRydWUpO1xyXG4gICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IFwiMC4zXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGUuY3VycmVudFRhcmdldC50ZXh0Q29udGVudCA9IFwiY2hlY2tfYm94X291dGxpbmVfYmxhbmtcIjtcclxuICAgICAgICAgIHRhc2suc2V0Q29tcGxldGVTdGF0dXMoZmFsc2UpO1xyXG4gICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICB0YXNrVGl0bGUudGV4dENvbnRlbnQgPSB0YXNrLmdldFRhc2tUaXRsZSgpO1xyXG5cclxuICAgICAgY29uc3QgdGFza0R1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgdGFza0R1ZURhdGUuY2xhc3NMaXN0LmFkZChcInRhc2stZHVlLWRhdGVcIik7XHJcbiAgICAgIHRhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gdGFzay5nZXREdWVEYXRlKCk7XHJcblxyXG4gICAgICBjb25zdCB0YXNrRGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgIHRhc2tEZWxldGVCdG4uY2xhc3NOYW1lID0gXCJtYXRlcmlhbC1pY29ucyBidG4tZGVsZXRlLXRhc2tcIjtcclxuICAgICAgdGFza0RlbGV0ZUJ0bi50ZXh0Q29udGVudCA9IFwiZGVsZXRlX291dGxpbmVcIjtcclxuICAgICAgdGFza0RlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICBhY3RpdmVQcm9qZWN0LnJlbW92ZVRhc2soaW5kZXgpO1xyXG4gICAgICAgIGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0NoZWNrYm94KTtcclxuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrVGl0bGUpOyAgICAgIFxyXG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tEdWVEYXRlKTsgICAgICBcclxuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrRGVsZXRlQnRuKTtcclxuICAgICAgdGFza0xpc3REaXYuYXBwZW5kQ2hpbGQodGFza0Rpdik7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgY29uc3QgZGlzcGxheVByb2plY3RQYWdlID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LXRpdGxlXCIpO1xyXG4gICAgcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gdG9Eb0xpc3QuZ2V0QWN0aXZlUHJvamVjdE5hbWUoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHRhc2tCdG5MaXN0ZW5lciA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFkZFRhc2tJbnB1dEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2tcIik7XHJcbiAgICBhZGRUYXNrSW5wdXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRpc3BsYXlUYXNrRmllbGQpO1xyXG5cclxuICAgIGNvbnN0IGNhbmNlbEFkZFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1jYW5jZWwtdGFza1wiKTtcclxuICAgIGNhbmNlbEFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhpZGVUYXNrSW5wdXQpO1xyXG5cclxuICAgIGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1hZGQtdGFza1wiKTtcclxuICAgIGFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgYWRkVGFza3RvUHJvamVjdCh0b0RvTGlzdC5nZXRBY3RpdmVQcm9qZWN0TmFtZSgpKTtcclxuICAgICAgZGlzcGxheVRhc2soKTtcclxuICAgICAgaGlkZVRhc2tJbnB1dCgpO1xyXG4gICAgfSlcclxuICB9XHJcbiAgXHJcbiAgY29uc3QgcHJvamVjdExpc3RlbmVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcHJvamVjdE5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdFwiKTtcclxuICAgIHByb2plY3ROYXYuZm9yRWFjaChwcm9qZWN0ID0+IHtcclxuICAgICAgcHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICB0b0RvTGlzdC5zZXRBY3RpdmVQcm9qZWN0TmFtZShlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5wcm9qZWN0KTtcclxuICAgICAgICBkaXNwbGF5UHJvamVjdFBhZ2UoKTtcclxuICAgICAgICBkaXNwbGF5VGFzaygpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGN1c3RvbVByb2plY3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VzdG9tLXByb2plY3QtaW5wdXRcIik7XHJcblxyXG4gICAgY29uc3QgYWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3RcIik7XHJcbiAgICBhZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGN1c3RvbVByb2plY3RJbnB1dC5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBhZGROZXdQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tYWRkLXByb2plY3RcIik7XHJcbiAgICBhZGROZXdQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHByb2plY3ROYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2N1c3RvbS1wcm9qZWN0LW5hbWVcIik7XHJcbiAgICAgIGFkZFByb2plY3QocHJvamVjdE5hbWVJbnB1dC52YWx1ZSk7XHJcbiAgICAgIGRpc3BsYXlDdXN0b21Qcm9qZWN0cygpO1xyXG4gICAgICBjdXN0b21Qcm9qZWN0SW5wdXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBjYW5jZWxBZGRQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tY2FuY2VsLWFkZC1wcm9qZWN0XCIpO1xyXG4gICAgY2FuY2VsQWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBjdXN0b21Qcm9qZWN0SW5wdXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGNvbnN0IGxvYWRQYWdlID0gKCkgPT4ge1xyXG4gICAgdGFza0J0bkxpc3RlbmVyKCk7XHJcbiAgICBkaXNwbGF5Q3VzdG9tUHJvamVjdHMoKTtcclxuICAgIHByb2plY3RMaXN0ZW5lcigpO1xyXG4gICAgZGlzcGxheVByb2plY3RQYWdlKCk7XHJcbiAgICBkaXNwbGF5VGFzaygpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGxvYWRQYWdlXHJcbiAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdlYkludGVyZmFjZTsiLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0c1wiO1xyXG5cclxuY29uc3QgdG9Eb0xpc3QgPSAoKCkgPT4ge1xyXG4gIGxldCBwcm9qZWN0TGlzdCA9IFtdO1xyXG4gIHByb2plY3RMaXN0LnB1c2gobmV3IFByb2plY3QoXCJJbmJveFwiKSk7XHJcbiAgcHJvamVjdExpc3QucHVzaChuZXcgUHJvamVjdChcIlRvZGF5XCIpKTtcclxuICBwcm9qZWN0TGlzdC5wdXNoKG5ldyBQcm9qZWN0KFwiVGhpcyBXZWVrXCIpKTtcclxuXHJcbiAgbGV0IGFjdGl2ZVByb2plY3ROYW1lID0gXCJJbmJveFwiO1xyXG5cclxuICBjb25zdCBhZGROZXdQcm9qZWN0ID0gKHByb2plY3QpID0+IHByb2plY3RMaXN0LnB1c2gocHJvamVjdCk7XHJcblxyXG4gIGNvbnN0IGdldEFsbFByb2plY3RzID0gKCkgPT4gcHJvamVjdExpc3Q7XHJcblxyXG4gIGNvbnN0IGdldFByb2plY3QgPSAobmFtZSkgPT4gcHJvamVjdExpc3QuZmluZChlbCA9PiBlbC5uYW1lID09IG5hbWUpO1xyXG5cclxuICBjb25zdCBzZXRBY3RpdmVQcm9qZWN0TmFtZSA9IChwcm9qZWN0TmFtZSkgPT4gYWN0aXZlUHJvamVjdE5hbWUgPSBwcm9qZWN0TmFtZTtcclxuXHJcbiAgY29uc3QgZ2V0QWN0aXZlUHJvamVjdE5hbWUgPSAoKSA9PiBhY3RpdmVQcm9qZWN0TmFtZTtcclxuXHJcbiAgY29uc3QgZ2V0QWN0aXZlUHJvamVjdCA9ICgpID0+IGdldFByb2plY3QoZ2V0QWN0aXZlUHJvamVjdE5hbWUoKSk7XHJcbiAgXHJcbiAgcmV0dXJuIHtcclxuICAgIGFkZE5ld1Byb2plY3QsXHJcbiAgICBnZXRBbGxQcm9qZWN0cyxcclxuICAgIGdldFByb2plY3QsXHJcbiAgICBzZXRBY3RpdmVQcm9qZWN0TmFtZSxcclxuICAgIGdldEFjdGl2ZVByb2plY3ROYW1lLFxyXG4gICAgZ2V0QWN0aXZlUHJvamVjdFxyXG4gIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0b0RvTGlzdDsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0IHtcclxuICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy50YXNrcyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgYWRkVGFzayh0YXNrKSB7XHJcbiAgICB0aGlzLnRhc2tzLnB1c2godGFzayk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVUYXNrKGluZGV4KSB7XHJcbiAgICB0aGlzLnRhc2tzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgfVxyXG5cclxuICBnZXRQcm9qZWN0TmFtZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbiAgfVxyXG5cclxuICBnZXRQcm9qZWN0VGFza3MoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50YXNrcztcclxuICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcclxuICBjb25zdHJ1Y3Rvcih0aXRsZSwgZHVlRGF0ZSA9IFwiTm8gZGF0ZVwiLCBpc0NvbXBsZXRlZCA9IGZhbHNlLCBkZXNjcmlwdGlvbiA9IFwiXCIpIHtcclxuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XHJcbiAgICB0aGlzLmlzQ29tcGxldGVkID0gaXNDb21wbGV0ZWQ7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgfVxyXG5cclxuICBzZXRUYXNrVGl0bGUodGl0bGUpIHtcclxuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICB9XHJcblxyXG4gIHNldER1ZURhdGUoZGF0ZSkge1xyXG4gICAgdGhpcy5kdWVEYXRlID0gZGF0ZTtcclxuICB9XHJcblxyXG4gIHNldERlc2NyaXB0aW9uKGRlc2MpIHtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjXHJcbiAgfVxyXG5cclxuICBzZXRDb21wbGV0ZVN0YXR1cyhpc0NvbXBsZXRlZCkge1xyXG4gICAgdGhpcy5pc0NvbXBsZXRlZCA9IGlzQ29tcGxldGVkO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGFza1RpdGxlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGl0bGU7XHJcbiAgfVxyXG5cclxuICBnZXRUYXNrRGVzY3JpcHRpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbjtcclxuICB9XHJcblxyXG4gIGdldER1ZURhdGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kdWVEYXRlO1xyXG4gIH1cclxuXHJcbiAgZ2V0SXNDb21wbGV0ZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pc0NvbXBsZXRlZDtcclxuICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBUYXNrIGZyb20gXCIuL3Rhc2tcIjtcclxuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdHNcIjtcclxuaW1wb3J0IHRvRG9MaXN0IGZyb20gXCIuL2xvZ2ljXCI7XHJcbmltcG9ydCB3ZWJJbnRlcmZhY2UgZnJvbSBcIi4vaW50ZXJmYWNlXCI7XHJcblxyXG53ZWJJbnRlcmZhY2UubG9hZFBhZ2UoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9