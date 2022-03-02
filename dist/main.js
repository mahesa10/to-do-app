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
        if (e.currentTarget.textContent === "check_box_outline_blank") {
          e.currentTarget.textContent = "check_box";
        } else {
          e.currentTarget.textContent = "check_box_outline_blank";
        }
      })

      const taskTitle = document.createElement("p");
      taskTitle.textContent = task.getTaskTitle();

      const taskDeleteBtn = document.createElement("span");
      taskDeleteBtn.className = "material-icons btn-delete-task";
      taskDeleteBtn.textContent = "delete_outline";
      taskDeleteBtn.addEventListener("click", (e) => {
        activeProject.removeTask(index);
        e.currentTarget.parentElement.remove();
      });
      
      taskDiv.appendChild(taskCheckbox);
      taskDiv.appendChild(taskTitle);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTjBCO0FBQ087QUFDRjtBQUNRO0FBQ3ZDO0FBQ0EsMkRBQXFCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9sb2dpYy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFzayBmcm9tIFwiLi90YXNrXCI7XHJcbmltcG9ydCB0b0RvTGlzdCBmcm9tIFwiLi9sb2dpY1wiO1xyXG5pbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0c1wiO1xyXG5cclxuY29uc3Qgd2ViSW50ZXJmYWNlID0gKCgpID0+IHtcclxuXHJcbiAgY29uc3QgZGlzcGxheVRhc2tGaWVsZCA9IChlKSA9PiB7XHJcbiAgICBjb25zdCBhZGRUYXNrSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLWlucHV0XCIpO1xyXG4gICAgYWRkVGFza0lucHV0LnN0eWxlLmRpc3BsYXkgPSBcImdyaWRcIjtcclxuICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhZGRUYXNrdG9Qcm9qZWN0ID0gKHByb2plY3ROYW1lKSA9PiB7XHJcbiAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stdGl0bGVcIik7XHJcbiAgICBjb25zdCB0YXNrRGVzYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kZXNjcmlwdGlvblwiKTtcclxuICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWR1ZS1kYXRlXCIpO1xyXG4gICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKHRhc2tUaXRsZS52YWx1ZSk7XHJcbiAgICB0YXNrLnNldERlc2NyaXB0aW9uKHRhc2tEZXNjLnZhbHVlKTtcclxuICAgIHRhc2suc2V0RHVlRGF0ZSh0YXNrRHVlRGF0ZS52YWx1ZSk7XHJcbiAgICBjb25zdCBwcm9qZWN0ID0gdG9Eb0xpc3QuZ2V0UHJvamVjdChwcm9qZWN0TmFtZSk7XHJcbiAgICBwcm9qZWN0LmFkZFRhc2sodGFzayk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhZGRQcm9qZWN0ID0gKHByb2plY3ROYW1lKSA9PiB7XHJcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QocHJvamVjdE5hbWUpO1xyXG4gICAgdG9Eb0xpc3QuYWRkTmV3UHJvamVjdChuZXdQcm9qZWN0KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGhpZGVUYXNrSW5wdXQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhZGRUYXNrSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLWlucHV0XCIpO1xyXG4gICAgY29uc3QgYWRkVGFza0lucHV0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcclxuICAgIGFkZFRhc2tJbnB1dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBhZGRUYXNrSW5wdXRCdG4uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZGlzcGxheUN1c3RvbVByb2plY3RzID0gKCkgPT4ge1xyXG4gICAgbGV0IHByb2plY3RMaXN0ID0gdG9Eb0xpc3QuZ2V0QWxsUHJvamVjdHMoKTtcclxuICAgIGNvbnN0IGN1c3RvbVByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXN0b20tcHJvamVjdC1saXN0XCIpO1xyXG4gICAgY3VzdG9tUHJvamVjdExpc3QudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgaWYgKHByb2plY3RMaXN0Lmxlbmd0aCA+IDMpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDM7IGkgPCBwcm9qZWN0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGN1c3RvbVByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGN1c3RvbVByb2plY3QuY2xhc3NOYW1lID0gXCJwcm9qZWN0IGN1c3RvbS1wcm9qZWN0XCI7XHJcbiAgICAgICAgY3VzdG9tUHJvamVjdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgYCR7cHJvamVjdExpc3RbaV0ubmFtZX1gKTtcclxuICAgICAgICBjb25zdCBjdXN0b21Qcm9qZWN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgIGN1c3RvbVByb2plY3ROYW1lLnRleHRDb250ZW50ID0gcHJvamVjdExpc3RbaV0ubmFtZVxyXG4gICAgICAgIGN1c3RvbVByb2plY3QuYXBwZW5kQ2hpbGQoY3VzdG9tUHJvamVjdE5hbWUpO1xyXG4gICAgICAgIGN1c3RvbVByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICB0b0RvTGlzdC5zZXRBY3RpdmVQcm9qZWN0TmFtZShlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5wcm9qZWN0KTtcclxuICAgICAgICAgIGRpc3BsYXlQcm9qZWN0UGFnZSgpO1xyXG4gICAgICAgICAgZGlzcGxheVRhc2soKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIGN1c3RvbVByb2plY3RMaXN0LmFwcGVuZENoaWxkKGN1c3RvbVByb2plY3QpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBkaXNwbGF5VGFzayA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRhc2tMaXN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWxpc3RcIik7XHJcbiAgICB0YXNrTGlzdERpdi50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICBsZXQgYWN0aXZlUHJvamVjdCA9IHRvRG9MaXN0LmdldEFjdGl2ZVByb2plY3QoKTtcclxuICAgIGxldCBwcm9qZWN0VGFza3MgPSBhY3RpdmVQcm9qZWN0LmdldFByb2plY3RUYXNrcygpO1xyXG4gICAgcHJvamVjdFRhc2tzLmZvckVhY2goKHRhc2ssIGluZGV4KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpXHJcblxyXG4gICAgICBjb25zdCB0YXNrQ2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgdGFza0NoZWNrYm94LmNsYXNzTmFtZSA9IFwibWF0ZXJpYWwtaWNvbnMgdGFzay1jaGVja2JveFwiO1xyXG4gICAgICB0YXNrQ2hlY2tib3gudGV4dENvbnRlbnQgPSBcImNoZWNrX2JveF9vdXRsaW5lX2JsYW5rXCI7XHJcbiAgICAgIHRhc2tDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICBpZiAoZS5jdXJyZW50VGFyZ2V0LnRleHRDb250ZW50ID09PSBcImNoZWNrX2JveF9vdXRsaW5lX2JsYW5rXCIpIHtcclxuICAgICAgICAgIGUuY3VycmVudFRhcmdldC50ZXh0Q29udGVudCA9IFwiY2hlY2tfYm94XCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGUuY3VycmVudFRhcmdldC50ZXh0Q29udGVudCA9IFwiY2hlY2tfYm94X291dGxpbmVfYmxhbmtcIjtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgdGFza1RpdGxlLnRleHRDb250ZW50ID0gdGFzay5nZXRUYXNrVGl0bGUoKTtcclxuXHJcbiAgICAgIGNvbnN0IHRhc2tEZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgdGFza0RlbGV0ZUJ0bi5jbGFzc05hbWUgPSBcIm1hdGVyaWFsLWljb25zIGJ0bi1kZWxldGUtdGFza1wiO1xyXG4gICAgICB0YXNrRGVsZXRlQnRuLnRleHRDb250ZW50ID0gXCJkZWxldGVfb3V0bGluZVwiO1xyXG4gICAgICB0YXNrRGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgIGFjdGl2ZVByb2plY3QucmVtb3ZlVGFzayhpbmRleCk7XHJcbiAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrQ2hlY2tib3gpO1xyXG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tUaXRsZSk7XHJcbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0RlbGV0ZUJ0bik7XHJcbiAgICAgIHRhc2tMaXN0RGl2LmFwcGVuZENoaWxkKHRhc2tEaXYpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGNvbnN0IGRpc3BsYXlQcm9qZWN0UGFnZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC10aXRsZVwiKTtcclxuICAgIHByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9IHRvRG9MaXN0LmdldEFjdGl2ZVByb2plY3ROYW1lKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB0YXNrQnRuTGlzdGVuZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhZGRUYXNrSW5wdXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrXCIpO1xyXG4gICAgYWRkVGFza0lucHV0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkaXNwbGF5VGFza0ZpZWxkKTtcclxuXHJcbiAgICBjb25zdCBjYW5jZWxBZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tY2FuY2VsLXRhc2tcIik7XHJcbiAgICBjYW5jZWxBZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoaWRlVGFza0lucHV0KTtcclxuXHJcbiAgICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tYWRkLXRhc2tcIik7XHJcbiAgICBhZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGFkZFRhc2t0b1Byb2plY3QodG9Eb0xpc3QuZ2V0QWN0aXZlUHJvamVjdE5hbWUoKSk7XHJcbiAgICAgIGRpc3BsYXlUYXNrKCk7XHJcbiAgICAgIGhpZGVUYXNrSW5wdXQoKTtcclxuICAgIH0pXHJcbiAgfVxyXG4gIFxyXG4gIGNvbnN0IHByb2plY3RMaXN0ZW5lciA9ICgpID0+IHtcclxuICAgIGNvbnN0IHByb2plY3ROYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RcIik7XHJcbiAgICBwcm9qZWN0TmF2LmZvckVhY2gocHJvamVjdCA9PiB7XHJcbiAgICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgdG9Eb0xpc3Quc2V0QWN0aXZlUHJvamVjdE5hbWUoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQucHJvamVjdCk7XHJcbiAgICAgICAgZGlzcGxheVByb2plY3RQYWdlKCk7XHJcbiAgICAgICAgZGlzcGxheVRhc2soKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBjdXN0b21Qcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1c3RvbS1wcm9qZWN0LWlucHV0XCIpO1xyXG5cclxuICAgIGNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0XCIpO1xyXG4gICAgYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBjdXN0b21Qcm9qZWN0SW5wdXQuc3R5bGUuZGlzcGxheSA9IFwiZ3JpZFwiO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgYWRkTmV3UHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLWFkZC1wcm9qZWN0XCIpO1xyXG4gICAgYWRkTmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBjb25zdCBwcm9qZWN0TmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjdXN0b20tcHJvamVjdC1uYW1lXCIpO1xyXG4gICAgICBhZGRQcm9qZWN0KHByb2plY3ROYW1lSW5wdXQudmFsdWUpO1xyXG4gICAgICBkaXNwbGF5Q3VzdG9tUHJvamVjdHMoKTtcclxuICAgICAgY3VzdG9tUHJvamVjdElucHV0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgY2FuY2VsQWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLWNhbmNlbC1hZGQtcHJvamVjdFwiKTtcclxuICAgIGNhbmNlbEFkZFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgY3VzdG9tUHJvamVjdElucHV0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBjb25zdCBsb2FkUGFnZSA9ICgpID0+IHtcclxuICAgIHRhc2tCdG5MaXN0ZW5lcigpO1xyXG4gICAgZGlzcGxheUN1c3RvbVByb2plY3RzKCk7XHJcbiAgICBwcm9qZWN0TGlzdGVuZXIoKTtcclxuICAgIGRpc3BsYXlQcm9qZWN0UGFnZSgpO1xyXG4gICAgZGlzcGxheVRhc2soKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBsb2FkUGFnZVxyXG4gIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3ZWJJbnRlcmZhY2U7IiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdHNcIjtcclxuXHJcbmNvbnN0IHRvRG9MaXN0ID0gKCgpID0+IHtcclxuICBsZXQgcHJvamVjdExpc3QgPSBbXTtcclxuICBwcm9qZWN0TGlzdC5wdXNoKG5ldyBQcm9qZWN0KFwiSW5ib3hcIikpO1xyXG4gIHByb2plY3RMaXN0LnB1c2gobmV3IFByb2plY3QoXCJUb2RheVwiKSk7XHJcbiAgcHJvamVjdExpc3QucHVzaChuZXcgUHJvamVjdChcIlRoaXMgV2Vla1wiKSk7XHJcblxyXG4gIGxldCBhY3RpdmVQcm9qZWN0TmFtZSA9IFwiSW5ib3hcIjtcclxuXHJcbiAgY29uc3QgYWRkTmV3UHJvamVjdCA9IChwcm9qZWN0KSA9PiBwcm9qZWN0TGlzdC5wdXNoKHByb2plY3QpO1xyXG5cclxuICBjb25zdCBnZXRBbGxQcm9qZWN0cyA9ICgpID0+IHByb2plY3RMaXN0O1xyXG5cclxuICBjb25zdCBnZXRQcm9qZWN0ID0gKG5hbWUpID0+IHByb2plY3RMaXN0LmZpbmQoZWwgPT4gZWwubmFtZSA9PSBuYW1lKTtcclxuXHJcbiAgY29uc3Qgc2V0QWN0aXZlUHJvamVjdE5hbWUgPSAocHJvamVjdE5hbWUpID0+IGFjdGl2ZVByb2plY3ROYW1lID0gcHJvamVjdE5hbWU7XHJcblxyXG4gIGNvbnN0IGdldEFjdGl2ZVByb2plY3ROYW1lID0gKCkgPT4gYWN0aXZlUHJvamVjdE5hbWU7XHJcblxyXG4gIGNvbnN0IGdldEFjdGl2ZVByb2plY3QgPSAoKSA9PiBnZXRQcm9qZWN0KGdldEFjdGl2ZVByb2plY3ROYW1lKCkpO1xyXG4gIFxyXG4gIHJldHVybiB7XHJcbiAgICBhZGROZXdQcm9qZWN0LFxyXG4gICAgZ2V0QWxsUHJvamVjdHMsXHJcbiAgICBnZXRQcm9qZWN0LFxyXG4gICAgc2V0QWN0aXZlUHJvamVjdE5hbWUsXHJcbiAgICBnZXRBY3RpdmVQcm9qZWN0TmFtZSxcclxuICAgIGdldEFjdGl2ZVByb2plY3RcclxuICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdG9Eb0xpc3Q7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMudGFza3MgPSBbXTtcclxuICB9XHJcblxyXG4gIGFkZFRhc2sodGFzaykge1xyXG4gICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlVGFzayhpbmRleCkge1xyXG4gICAgdGhpcy50YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJvamVjdE5hbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJvamVjdFRhc2tzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGFza3M7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XHJcbiAgY29uc3RydWN0b3IodGl0bGUsIGR1ZURhdGUgPSBcIk5vIGRhdGVcIiwgaXNDb21wbGV0ZWQgPSBmYWxzZSwgZGVzY3JpcHRpb24gPSBcIlwiKSB7XHJcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xyXG4gICAgdGhpcy5pc0NvbXBsZXRlZCA9IGlzQ29tcGxldGVkO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2V0VGFza1RpdGxlKHRpdGxlKSB7XHJcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgfVxyXG5cclxuICBzZXREdWVEYXRlKGRhdGUpIHtcclxuICAgIHRoaXMuZHVlRGF0ZSA9IGRhdGU7XHJcbiAgfVxyXG5cclxuICBzZXREZXNjcmlwdGlvbihkZXNjKSB7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY1xyXG4gIH1cclxuXHJcbiAgZ2V0VGFza1RpdGxlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGl0bGU7XHJcbiAgfVxyXG5cclxuICBnZXRUYXNrRGVzY3JpcHRpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbjtcclxuICB9XHJcblxyXG4gIGdldER1ZURhdGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kdWVEYXRlO1xyXG4gIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFRhc2sgZnJvbSBcIi4vdGFza1wiO1xyXG5pbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0c1wiO1xyXG5pbXBvcnQgdG9Eb0xpc3QgZnJvbSBcIi4vbG9naWNcIjtcclxuaW1wb3J0IHdlYkludGVyZmFjZSBmcm9tIFwiLi9pbnRlcmZhY2VcIjtcclxuXHJcbndlYkludGVyZmFjZS5sb2FkUGFnZSgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=