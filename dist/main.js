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



const webInterface = (() => {

  const displayTaskField = (e) => {
    const addTaskInput = document.querySelector(".add-task-input");
    addTaskInput.style.display = "flex";
    e.currentTarget.style.display = "none";
  }

  const addTask = (projectName) => {
    const taskTitle = document.querySelector("#task-title");
    const taskDesc = document.querySelector("#task-description")
    const task = new _task__WEBPACK_IMPORTED_MODULE_0__["default"](taskTitle.value);
    task.setDescription(taskDesc.value);
    const project = _logic__WEBPACK_IMPORTED_MODULE_1__["default"].getProject(projectName);
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
    let projectList = _logic__WEBPACK_IMPORTED_MODULE_1__["default"].getAllProjects();
    const customProjectContainer = document.querySelector(".custom-project-container");

    if (projectList.length > 3) {
      for (let i = 3; i < projectList.length; i++) {
        const customProject = document.createElement("div");
        customProject.className = "project custom-project";
        customProject.setAttribute("data-project", `${projectList[i].name}`);
        const customProjectName = document.createElement("p");
        customProjectName.textContent = projectList[i].name
        customProject.appendChild(customProjectName);
        customProjectContainer.appendChild(customProject);
      }
    }
  }

  const displayTask = () => {
    const taskListDiv = document.querySelector(".task-list");
    taskListDiv.textContent = "";
    let activeProject = _logic__WEBPACK_IMPORTED_MODULE_1__["default"].getActiveProject();
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

  const displayProjectPage = () => {
    const projectTitle = document.querySelector(".project-title");
    projectTitle.textContent = _logic__WEBPACK_IMPORTED_MODULE_1__["default"].getActiveProjectName();
  }

  const projectListener = () => {
    const defaultProject = document.querySelectorAll(".project");
    defaultProject.forEach(project => {
      project.addEventListener("click", (e) => {
        _logic__WEBPACK_IMPORTED_MODULE_1__["default"].setActiveProjectName(e.currentTarget.dataset.project);
        displayProjectPage();
        displayTask();
      })
    })    
  }

  return {
    taskBtnListener,
    displayCustomProjects,
    displayTask,
    displayProjectPage,
    projectListener
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

  // const addInboxTask = (task) => getProject("Inbox").addTasktoProject(task);

  // const addTodayTask = (task) => getProject("Today").addTasktoProject(task);

  // const addThisWeekTask = (task) => getProject("This Week").addTasktoProject(task);
  

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





const taskX = new _task__WEBPACK_IMPORTED_MODULE_0__["default"]("Task X");
const taskY = new _task__WEBPACK_IMPORTED_MODULE_0__["default"]("Task Y");
const taskZ = new _task__WEBPACK_IMPORTED_MODULE_0__["default"]("Task Z");
const taskA = new _task__WEBPACK_IMPORTED_MODULE_0__["default"]("Task A");
const taskB = new _task__WEBPACK_IMPORTED_MODULE_0__["default"]("Task B");
const taskC = new _task__WEBPACK_IMPORTED_MODULE_0__["default"]("Task C");

const todayProject = _logic__WEBPACK_IMPORTED_MODULE_2__["default"].getProject("Today");
const weekProject = _logic__WEBPACK_IMPORTED_MODULE_2__["default"].getProject("This Week");
const inboxProject = _logic__WEBPACK_IMPORTED_MODULE_2__["default"].getProject("Inbox");

inboxProject.addTask(taskX);
inboxProject.addTask(taskY);
inboxProject.addTask(taskZ);

todayProject.addTask(taskA);
todayProject.addTask(taskB);
todayProject.addTask(taskC);

const projectX = new _projects__WEBPACK_IMPORTED_MODULE_1__["default"]("Project X");

_logic__WEBPACK_IMPORTED_MODULE_2__["default"].addNewProject(projectX);

_interface__WEBPACK_IMPORTED_MODULE_3__["default"].taskBtnListener();
_interface__WEBPACK_IMPORTED_MODULE_3__["default"].displayCustomProjects();
_interface__WEBPACK_IMPORTED_MODULE_3__["default"].projectListener();
_interface__WEBPACK_IMPORTED_MODULE_3__["default"].displayProjectPage();
_interface__WEBPACK_IMPORTED_MODULE_3__["default"].displayTask();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlEQUFPO0FBQzVCO0FBQ0EsNERBQXNCO0FBQ3RCO0FBQ0Esa0VBQTRCO0FBQzVCLHdFQUFrQztBQUNsQyxrRUFBNEI7QUFDNUIscUVBQStCO0FBQy9CLDhEQUF3QixHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9sb2dpYy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFzayBmcm9tIFwiLi90YXNrXCI7XHJcbmltcG9ydCB0b0RvTGlzdCBmcm9tIFwiLi9sb2dpY1wiO1xyXG5cclxuY29uc3Qgd2ViSW50ZXJmYWNlID0gKCgpID0+IHtcclxuXHJcbiAgY29uc3QgZGlzcGxheVRhc2tGaWVsZCA9IChlKSA9PiB7XHJcbiAgICBjb25zdCBhZGRUYXNrSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLWlucHV0XCIpO1xyXG4gICAgYWRkVGFza0lucHV0LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhZGRUYXNrID0gKHByb2plY3ROYW1lKSA9PiB7XHJcbiAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stdGl0bGVcIik7XHJcbiAgICBjb25zdCB0YXNrRGVzYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kZXNjcmlwdGlvblwiKVxyXG4gICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKHRhc2tUaXRsZS52YWx1ZSk7XHJcbiAgICB0YXNrLnNldERlc2NyaXB0aW9uKHRhc2tEZXNjLnZhbHVlKTtcclxuICAgIGNvbnN0IHByb2plY3QgPSB0b0RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3ROYW1lKTtcclxuICAgIHByb2plY3QuYWRkVGFza3RvUHJvamVjdCh0YXNrKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNhbmNlbFRhc2tJbnB1dCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFkZFRhc2tJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2staW5wdXRcIik7XHJcbiAgICBjb25zdCBhZGRUYXNrSW5wdXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrXCIpO1xyXG4gICAgYWRkVGFza0lucHV0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIGFkZFRhc2tJbnB1dEJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgfVxyXG5cclxuICBjb25zdCB0YXNrQnRuTGlzdGVuZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhZGRUYXNrSW5wdXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrXCIpO1xyXG4gICAgYWRkVGFza0lucHV0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkaXNwbGF5VGFza0ZpZWxkKTtcclxuXHJcbiAgICBjb25zdCBjYW5jZWxBZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tY2FuY2VsLXRhc2tcIik7XHJcbiAgICBjYW5jZWxBZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjYW5jZWxUYXNrSW5wdXQpO1xyXG5cclxuICAgIGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1hZGQtdGFza1wiKTtcclxuICAgIGFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgYWRkVGFzayhnZXRBY3RpdmVQcm9qZWN0KCkpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGNvbnN0IGRpc3BsYXlDdXN0b21Qcm9qZWN0cyA9ICgpID0+IHtcclxuICAgIGxldCBwcm9qZWN0TGlzdCA9IHRvRG9MaXN0LmdldEFsbFByb2plY3RzKCk7XHJcbiAgICBjb25zdCBjdXN0b21Qcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXN0b20tcHJvamVjdC1jb250YWluZXJcIik7XHJcblxyXG4gICAgaWYgKHByb2plY3RMaXN0Lmxlbmd0aCA+IDMpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDM7IGkgPCBwcm9qZWN0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGN1c3RvbVByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGN1c3RvbVByb2plY3QuY2xhc3NOYW1lID0gXCJwcm9qZWN0IGN1c3RvbS1wcm9qZWN0XCI7XHJcbiAgICAgICAgY3VzdG9tUHJvamVjdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgYCR7cHJvamVjdExpc3RbaV0ubmFtZX1gKTtcclxuICAgICAgICBjb25zdCBjdXN0b21Qcm9qZWN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgIGN1c3RvbVByb2plY3ROYW1lLnRleHRDb250ZW50ID0gcHJvamVjdExpc3RbaV0ubmFtZVxyXG4gICAgICAgIGN1c3RvbVByb2plY3QuYXBwZW5kQ2hpbGQoY3VzdG9tUHJvamVjdE5hbWUpO1xyXG4gICAgICAgIGN1c3RvbVByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQoY3VzdG9tUHJvamVjdCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGRpc3BsYXlUYXNrID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdGFza0xpc3REaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbGlzdFwiKTtcclxuICAgIHRhc2tMaXN0RGl2LnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gdG9Eb0xpc3QuZ2V0QWN0aXZlUHJvamVjdCgpO1xyXG4gICAgbGV0IHByb2plY3RUYXNrcyA9IGFjdGl2ZVByb2plY3QuZ2V0UHJvamVjdFRhc2tzKCk7XHJcbiAgICBwcm9qZWN0VGFza3MuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgdGFza0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xyXG4gICAgICB0YXNrTGFiZWwuY2xhc3NMaXN0LmFkZChcInRhc2tcIilcclxuICAgICAgdGFza0xhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBgdGFzay0ke2luZGV4fWApO1xyXG5cclxuICAgICAgY29uc3QgdGFza0NoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICB0YXNrQ2hlY2tib3guc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xyXG4gICAgICB0YXNrQ2hlY2tib3guc2V0QXR0cmlidXRlKFwiaWRcIiwgYHRhc2stJHtpbmRleH1gKTtcclxuXHJcbiAgICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICB0YXNrVGl0bGUudGV4dENvbnRlbnQgPSB0YXNrLmdldFRhc2tUaXRsZSgpO1xyXG4gICAgICBcclxuICAgICAgdGFza0xhYmVsLmFwcGVuZENoaWxkKHRhc2tDaGVja2JveCk7XHJcbiAgICAgIHRhc2tMYWJlbC5hcHBlbmRDaGlsZCh0YXNrVGl0bGUpO1xyXG4gICAgICB0YXNrTGlzdERpdi5hcHBlbmRDaGlsZCh0YXNrTGFiZWwpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGNvbnN0IGRpc3BsYXlQcm9qZWN0UGFnZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC10aXRsZVwiKTtcclxuICAgIHByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9IHRvRG9MaXN0LmdldEFjdGl2ZVByb2plY3ROYW1lKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwcm9qZWN0TGlzdGVuZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBkZWZhdWx0UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdFwiKTtcclxuICAgIGRlZmF1bHRQcm9qZWN0LmZvckVhY2gocHJvamVjdCA9PiB7XHJcbiAgICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgdG9Eb0xpc3Quc2V0QWN0aXZlUHJvamVjdE5hbWUoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQucHJvamVjdCk7XHJcbiAgICAgICAgZGlzcGxheVByb2plY3RQYWdlKCk7XHJcbiAgICAgICAgZGlzcGxheVRhc2soKTtcclxuICAgICAgfSlcclxuICAgIH0pICAgIFxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHRhc2tCdG5MaXN0ZW5lcixcclxuICAgIGRpc3BsYXlDdXN0b21Qcm9qZWN0cyxcclxuICAgIGRpc3BsYXlUYXNrLFxyXG4gICAgZGlzcGxheVByb2plY3RQYWdlLFxyXG4gICAgcHJvamVjdExpc3RlbmVyXHJcbiAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdlYkludGVyZmFjZTsiLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0c1wiO1xyXG5cclxuY29uc3QgdG9Eb0xpc3QgPSAoKCkgPT4ge1xyXG4gIGxldCBwcm9qZWN0TGlzdCA9IFtdO1xyXG4gIHByb2plY3RMaXN0LnB1c2gobmV3IFByb2plY3QoXCJJbmJveFwiKSk7XHJcbiAgcHJvamVjdExpc3QucHVzaChuZXcgUHJvamVjdChcIlRvZGF5XCIpKTtcclxuICBwcm9qZWN0TGlzdC5wdXNoKG5ldyBQcm9qZWN0KFwiVGhpcyBXZWVrXCIpKTtcclxuXHJcbiAgbGV0IGFjdGl2ZVByb2plY3ROYW1lID0gXCJJbmJveFwiO1xyXG5cclxuICBjb25zdCBhZGROZXdQcm9qZWN0ID0gKHByb2plY3QpID0+IHByb2plY3RMaXN0LnB1c2gocHJvamVjdCk7XHJcblxyXG4gIGNvbnN0IGdldEFsbFByb2plY3RzID0gKCkgPT4gcHJvamVjdExpc3Q7XHJcblxyXG4gIGNvbnN0IGdldFByb2plY3QgPSAobmFtZSkgPT4gcHJvamVjdExpc3QuZmluZChlbCA9PiBlbC5uYW1lID09IG5hbWUpO1xyXG5cclxuICBjb25zdCBzZXRBY3RpdmVQcm9qZWN0TmFtZSA9IChwcm9qZWN0TmFtZSkgPT4gYWN0aXZlUHJvamVjdE5hbWUgPSBwcm9qZWN0TmFtZTtcclxuXHJcbiAgY29uc3QgZ2V0QWN0aXZlUHJvamVjdE5hbWUgPSAoKSA9PiBhY3RpdmVQcm9qZWN0TmFtZTtcclxuXHJcbiAgY29uc3QgZ2V0QWN0aXZlUHJvamVjdCA9ICgpID0+IGdldFByb2plY3QoZ2V0QWN0aXZlUHJvamVjdE5hbWUoKSk7XHJcblxyXG4gIC8vIGNvbnN0IGFkZEluYm94VGFzayA9ICh0YXNrKSA9PiBnZXRQcm9qZWN0KFwiSW5ib3hcIikuYWRkVGFza3RvUHJvamVjdCh0YXNrKTtcclxuXHJcbiAgLy8gY29uc3QgYWRkVG9kYXlUYXNrID0gKHRhc2spID0+IGdldFByb2plY3QoXCJUb2RheVwiKS5hZGRUYXNrdG9Qcm9qZWN0KHRhc2spO1xyXG5cclxuICAvLyBjb25zdCBhZGRUaGlzV2Vla1Rhc2sgPSAodGFzaykgPT4gZ2V0UHJvamVjdChcIlRoaXMgV2Vla1wiKS5hZGRUYXNrdG9Qcm9qZWN0KHRhc2spO1xyXG4gIFxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgYWRkTmV3UHJvamVjdCxcclxuICAgIGdldEFsbFByb2plY3RzLFxyXG4gICAgZ2V0UHJvamVjdCxcclxuICAgIHNldEFjdGl2ZVByb2plY3ROYW1lLFxyXG4gICAgZ2V0QWN0aXZlUHJvamVjdE5hbWUsXHJcbiAgICBnZXRBY3RpdmVQcm9qZWN0XHJcbiAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRvRG9MaXN0OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLnRhc2tzID0gW107XHJcbiAgfVxyXG5cclxuICBhZGRUYXNrKHRhc2spIHtcclxuICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcclxuICB9XHJcblxyXG4gIGdldFByb2plY3ROYW1lKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICB9XHJcblxyXG4gIGdldFByb2plY3RUYXNrcygpIHtcclxuICAgIHJldHVybiB0aGlzLnRhc2tzO1xyXG4gIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xyXG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBkdWVEYXRlID0gXCJObyBkYXRlXCIsIGlzQ29tcGxldGVkID0gZmFsc2UsIGRlc2NyaXB0aW9uID0gXCJcIikge1xyXG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcclxuICAgIHRoaXMuaXNDb21wbGV0ZWQgPSBpc0NvbXBsZXRlZDtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICB9XHJcblxyXG4gIHNldFRhc2tUaXRsZSh0aXRsZSkge1xyXG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gIH1cclxuXHJcbiAgc2V0RHVlRGF0ZShkYXRlKSB7XHJcbiAgICB0aGlzLmR1ZURhdGUgPSBkYXRlO1xyXG4gIH1cclxuXHJcbiAgc2V0RGVzY3JpcHRpb24oZGVzYykge1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NcclxuICB9XHJcblxyXG4gIGdldFRhc2tUaXRsZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRpdGxlO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGFza0Rlc2NyaXB0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb247XHJcbiAgfVxyXG5cclxuICBnZXREdWVEYXRlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZHVlRGF0ZTtcclxuICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBUYXNrIGZyb20gXCIuL3Rhc2tcIjtcclxuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdHNcIjtcclxuaW1wb3J0IHRvRG9MaXN0IGZyb20gXCIuL2xvZ2ljXCI7XHJcbmltcG9ydCB3ZWJJbnRlcmZhY2UgZnJvbSBcIi4vaW50ZXJmYWNlXCI7XHJcblxyXG5jb25zdCB0YXNrWCA9IG5ldyBUYXNrKFwiVGFzayBYXCIpO1xyXG5jb25zdCB0YXNrWSA9IG5ldyBUYXNrKFwiVGFzayBZXCIpO1xyXG5jb25zdCB0YXNrWiA9IG5ldyBUYXNrKFwiVGFzayBaXCIpO1xyXG5jb25zdCB0YXNrQSA9IG5ldyBUYXNrKFwiVGFzayBBXCIpO1xyXG5jb25zdCB0YXNrQiA9IG5ldyBUYXNrKFwiVGFzayBCXCIpO1xyXG5jb25zdCB0YXNrQyA9IG5ldyBUYXNrKFwiVGFzayBDXCIpO1xyXG5cclxuY29uc3QgdG9kYXlQcm9qZWN0ID0gdG9Eb0xpc3QuZ2V0UHJvamVjdChcIlRvZGF5XCIpO1xyXG5jb25zdCB3ZWVrUHJvamVjdCA9IHRvRG9MaXN0LmdldFByb2plY3QoXCJUaGlzIFdlZWtcIik7XHJcbmNvbnN0IGluYm94UHJvamVjdCA9IHRvRG9MaXN0LmdldFByb2plY3QoXCJJbmJveFwiKTtcclxuXHJcbmluYm94UHJvamVjdC5hZGRUYXNrKHRhc2tYKTtcclxuaW5ib3hQcm9qZWN0LmFkZFRhc2sodGFza1kpO1xyXG5pbmJveFByb2plY3QuYWRkVGFzayh0YXNrWik7XHJcblxyXG50b2RheVByb2plY3QuYWRkVGFzayh0YXNrQSk7XHJcbnRvZGF5UHJvamVjdC5hZGRUYXNrKHRhc2tCKTtcclxudG9kYXlQcm9qZWN0LmFkZFRhc2sodGFza0MpO1xyXG5cclxuY29uc3QgcHJvamVjdFggPSBuZXcgUHJvamVjdChcIlByb2plY3QgWFwiKTtcclxuXHJcbnRvRG9MaXN0LmFkZE5ld1Byb2plY3QocHJvamVjdFgpO1xyXG5cclxud2ViSW50ZXJmYWNlLnRhc2tCdG5MaXN0ZW5lcigpO1xyXG53ZWJJbnRlcmZhY2UuZGlzcGxheUN1c3RvbVByb2plY3RzKCk7XHJcbndlYkludGVyZmFjZS5wcm9qZWN0TGlzdGVuZXIoKTtcclxud2ViSW50ZXJmYWNlLmRpc3BsYXlQcm9qZWN0UGFnZSgpO1xyXG53ZWJJbnRlcmZhY2UuZGlzcGxheVRhc2soKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=