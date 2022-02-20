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

  return { taskBtnListener, displayCustomProjects, displayTask };
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
  projectList.push(new _projects__WEBPACK_IMPORTED_MODULE_0__["default"]("Test 1"));
  projectList.push(new _projects__WEBPACK_IMPORTED_MODULE_0__["default"]("Test 2"));

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
  

  return { addNewProject, getAllProjects, getProject, setActiveProjectName, getActiveProject };
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





_interface__WEBPACK_IMPORTED_MODULE_3__["default"].taskBtnListener();
_interface__WEBPACK_IMPORTED_MODULE_3__["default"].displayCustomProjects();

const task1 = new _task__WEBPACK_IMPORTED_MODULE_0__["default"]("Task 1");
const task2 = new _task__WEBPACK_IMPORTED_MODULE_0__["default"]("Task 2");
let activeProject = _logic__WEBPACK_IMPORTED_MODULE_2__["default"].getActiveProject();

activeProject.addTask(task1);
activeProject.addTask(task2);
console.log(activeProject);

_interface__WEBPACK_IMPORTED_MODULE_3__["default"].displayTask();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQ0s7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDZDQUFJO0FBQ3pCO0FBQ0Esb0JBQW9CLHlEQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw2REFBdUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHdCQUF3QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsK0RBQXlCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLE1BQU07QUFDbEQ7QUFDQTtBQUNBO0FBQ0EsOENBQThDLE1BQU07QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFdBQVc7QUFDWCxDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxZQUFZOzs7Ozs7Ozs7Ozs7Ozs7QUNqRk07QUFDakM7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGlEQUFPO0FBQzlCLHVCQUF1QixpREFBTztBQUM5Qix1QkFBdUIsaURBQU87QUFDOUIsdUJBQXVCLGlEQUFPO0FBQzlCLHVCQUF1QixpREFBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxRQUFROzs7Ozs7Ozs7Ozs7OztBQ2xDUjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDakJlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQy9CQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTjBCO0FBQ087QUFDRjtBQUNRO0FBQ3ZDO0FBQ0Esa0VBQTRCO0FBQzVCLHdFQUFrQztBQUNsQztBQUNBLGtCQUFrQiw2Q0FBSTtBQUN0QixrQkFBa0IsNkNBQUk7QUFDdEIsb0JBQW9CLCtEQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQXdCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2xvZ2ljLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy90YXNrLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUYXNrIGZyb20gXCIuL3Rhc2tcIjtcclxuaW1wb3J0IHRvRG9MaXN0IGZyb20gXCIuL2xvZ2ljXCI7XHJcblxyXG5jb25zdCB3ZWJJbnRlcmZhY2UgPSAoKCkgPT4ge1xyXG5cclxuICBjb25zdCBkaXNwbGF5VGFza0ZpZWxkID0gKGUpID0+IHtcclxuICAgIGNvbnN0IGFkZFRhc2tJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2staW5wdXRcIik7XHJcbiAgICBhZGRUYXNrSW5wdXQuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICB9XHJcblxyXG4gIGNvbnN0IGFkZFRhc2sgPSAocHJvamVjdE5hbWUpID0+IHtcclxuICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay10aXRsZVwiKTtcclxuICAgIGNvbnN0IHRhc2tEZXNjID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWRlc2NyaXB0aW9uXCIpXHJcbiAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sodGFza1RpdGxlLnZhbHVlKTtcclxuICAgIHRhc2suc2V0RGVzY3JpcHRpb24odGFza0Rlc2MudmFsdWUpO1xyXG4gICAgY29uc3QgcHJvamVjdCA9IHRvRG9MaXN0LmdldFByb2plY3QocHJvamVjdE5hbWUpO1xyXG4gICAgcHJvamVjdC5hZGRUYXNrdG9Qcm9qZWN0KHRhc2spO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY2FuY2VsVGFza0lucHV0ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYWRkVGFza0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1pbnB1dFwiKTtcclxuICAgIGNvbnN0IGFkZFRhc2tJbnB1dEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2tcIik7XHJcbiAgICBhZGRUYXNrSW5wdXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgYWRkVGFza0lucHV0QnRuLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICB9XHJcblxyXG4gIGNvbnN0IHRhc2tCdG5MaXN0ZW5lciA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFkZFRhc2tJbnB1dEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2tcIik7XHJcbiAgICBhZGRUYXNrSW5wdXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRpc3BsYXlUYXNrRmllbGQpO1xyXG5cclxuICAgIGNvbnN0IGNhbmNlbEFkZFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1jYW5jZWwtdGFza1wiKTtcclxuICAgIGNhbmNlbEFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNhbmNlbFRhc2tJbnB1dCk7XHJcblxyXG4gICAgY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLWFkZC10YXNrXCIpO1xyXG4gICAgYWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBhZGRUYXNrKGdldEFjdGl2ZVByb2plY3QoKSk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgY29uc3QgZGlzcGxheUN1c3RvbVByb2plY3RzID0gKCkgPT4ge1xyXG4gICAgbGV0IHByb2plY3RMaXN0ID0gdG9Eb0xpc3QuZ2V0QWxsUHJvamVjdHMoKTtcclxuICAgIGNvbnN0IGN1c3RvbVByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1c3RvbS1wcm9qZWN0LWNvbnRhaW5lclwiKTtcclxuXHJcbiAgICBpZiAocHJvamVjdExpc3QubGVuZ3RoID4gMykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMzsgaSA8IHByb2plY3RMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgY3VzdG9tUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY3VzdG9tUHJvamVjdC5jbGFzc0xpc3QuYWRkKFwiY3VzdG9tLXByb2plY3RcIik7XHJcbiAgICAgICAgY29uc3QgY3VzdG9tUHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICBjdXN0b21Qcm9qZWN0TmFtZS50ZXh0Q29udGVudCA9IHByb2plY3RMaXN0W2ldLm5hbWVcclxuICAgICAgICBjdXN0b21Qcm9qZWN0LmFwcGVuZENoaWxkKGN1c3RvbVByb2plY3ROYW1lKTtcclxuICAgICAgICBjdXN0b21Qcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGN1c3RvbVByb2plY3QpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBkaXNwbGF5VGFzayA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRhc2tMaXN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWxpc3RcIik7XHJcbiAgICBsZXQgYWN0aXZlUHJvamVjdCA9IHRvRG9MaXN0LmdldEFjdGl2ZVByb2plY3QoKTtcclxuICAgIGxldCBwcm9qZWN0VGFza3MgPSBhY3RpdmVQcm9qZWN0LmdldFByb2plY3RUYXNrcygpO1xyXG4gICAgcHJvamVjdFRhc2tzLmZvckVhY2goKHRhc2ssIGluZGV4KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhc2tMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcclxuICAgICAgdGFza0xhYmVsLmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpXHJcbiAgICAgIHRhc2tMYWJlbC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgYHRhc2stJHtpbmRleH1gKTtcclxuXHJcbiAgICAgIGNvbnN0IHRhc2tDaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgdGFza0NoZWNrYm94LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcclxuICAgICAgdGFza0NoZWNrYm94LnNldEF0dHJpYnV0ZShcImlkXCIsIGB0YXNrLSR7aW5kZXh9YCk7XHJcblxyXG4gICAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgdGFza1RpdGxlLnRleHRDb250ZW50ID0gdGFzay5nZXRUYXNrVGl0bGUoKTtcclxuICAgICAgXHJcbiAgICAgIHRhc2tMYWJlbC5hcHBlbmRDaGlsZCh0YXNrQ2hlY2tib3gpO1xyXG4gICAgICB0YXNrTGFiZWwuYXBwZW5kQ2hpbGQodGFza1RpdGxlKTtcclxuICAgICAgdGFza0xpc3REaXYuYXBwZW5kQ2hpbGQodGFza0xhYmVsKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICByZXR1cm4geyB0YXNrQnRuTGlzdGVuZXIsIGRpc3BsYXlDdXN0b21Qcm9qZWN0cywgZGlzcGxheVRhc2sgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdlYkludGVyZmFjZTsiLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0c1wiO1xyXG5cclxuY29uc3QgdG9Eb0xpc3QgPSAoKCkgPT4ge1xyXG4gIGxldCBwcm9qZWN0TGlzdCA9IFtdO1xyXG4gIHByb2plY3RMaXN0LnB1c2gobmV3IFByb2plY3QoXCJJbmJveFwiKSk7XHJcbiAgcHJvamVjdExpc3QucHVzaChuZXcgUHJvamVjdChcIlRvZGF5XCIpKTtcclxuICBwcm9qZWN0TGlzdC5wdXNoKG5ldyBQcm9qZWN0KFwiVGhpcyBXZWVrXCIpKTtcclxuICBwcm9qZWN0TGlzdC5wdXNoKG5ldyBQcm9qZWN0KFwiVGVzdCAxXCIpKTtcclxuICBwcm9qZWN0TGlzdC5wdXNoKG5ldyBQcm9qZWN0KFwiVGVzdCAyXCIpKTtcclxuXHJcbiAgbGV0IGFjdGl2ZVByb2plY3ROYW1lID0gXCJJbmJveFwiO1xyXG5cclxuICBjb25zdCBhZGROZXdQcm9qZWN0ID0gKHByb2plY3QpID0+IHByb2plY3RMaXN0LnB1c2gocHJvamVjdCk7XHJcblxyXG4gIGNvbnN0IGdldEFsbFByb2plY3RzID0gKCkgPT4gcHJvamVjdExpc3Q7XHJcblxyXG4gIGNvbnN0IGdldFByb2plY3QgPSAobmFtZSkgPT4gcHJvamVjdExpc3QuZmluZChlbCA9PiBlbC5uYW1lID09IG5hbWUpO1xyXG5cclxuICBjb25zdCBzZXRBY3RpdmVQcm9qZWN0TmFtZSA9IChwcm9qZWN0TmFtZSkgPT4gYWN0aXZlUHJvamVjdE5hbWUgPSBwcm9qZWN0TmFtZTtcclxuXHJcbiAgY29uc3QgZ2V0QWN0aXZlUHJvamVjdE5hbWUgPSAoKSA9PiBhY3RpdmVQcm9qZWN0TmFtZTtcclxuXHJcbiAgY29uc3QgZ2V0QWN0aXZlUHJvamVjdCA9ICgpID0+IGdldFByb2plY3QoZ2V0QWN0aXZlUHJvamVjdE5hbWUoKSk7XHJcblxyXG4gIC8vIGNvbnN0IGFkZEluYm94VGFzayA9ICh0YXNrKSA9PiBnZXRQcm9qZWN0KFwiSW5ib3hcIikuYWRkVGFza3RvUHJvamVjdCh0YXNrKTtcclxuXHJcbiAgLy8gY29uc3QgYWRkVG9kYXlUYXNrID0gKHRhc2spID0+IGdldFByb2plY3QoXCJUb2RheVwiKS5hZGRUYXNrdG9Qcm9qZWN0KHRhc2spO1xyXG5cclxuICAvLyBjb25zdCBhZGRUaGlzV2Vla1Rhc2sgPSAodGFzaykgPT4gZ2V0UHJvamVjdChcIlRoaXMgV2Vla1wiKS5hZGRUYXNrdG9Qcm9qZWN0KHRhc2spO1xyXG4gIFxyXG5cclxuICByZXR1cm4geyBhZGROZXdQcm9qZWN0LCBnZXRBbGxQcm9qZWN0cywgZ2V0UHJvamVjdCwgc2V0QWN0aXZlUHJvamVjdE5hbWUsIGdldEFjdGl2ZVByb2plY3QgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRvRG9MaXN0OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLnRhc2tzID0gW107XHJcbiAgfVxyXG5cclxuICBhZGRUYXNrKHRhc2spIHtcclxuICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcclxuICB9XHJcblxyXG4gIGdldFByb2plY3ROYW1lKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICB9XHJcblxyXG4gIGdldFByb2plY3RUYXNrcygpIHtcclxuICAgIHJldHVybiB0aGlzLnRhc2tzO1xyXG4gIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xyXG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBkdWVEYXRlID0gXCJObyBkYXRlXCIsIGlzQ29tcGxldGVkID0gZmFsc2UsIGRlc2NyaXB0aW9uID0gXCJcIikge1xyXG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcclxuICAgIHRoaXMuaXNDb21wbGV0ZWQgPSBpc0NvbXBsZXRlZDtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICB9XHJcblxyXG4gIHNldFRhc2tUaXRsZSh0aXRsZSkge1xyXG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gIH1cclxuXHJcbiAgc2V0RHVlRGF0ZShkYXRlKSB7XHJcbiAgICB0aGlzLmR1ZURhdGUgPSBkYXRlO1xyXG4gIH1cclxuXHJcbiAgc2V0RGVzY3JpcHRpb24oZGVzYykge1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NcclxuICB9XHJcblxyXG4gIGdldFRhc2tUaXRsZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRpdGxlO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGFza0Rlc2NyaXB0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb247XHJcbiAgfVxyXG5cclxuICBnZXREdWVEYXRlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZHVlRGF0ZTtcclxuICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBUYXNrIGZyb20gXCIuL3Rhc2tcIjtcclxuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdHNcIjtcclxuaW1wb3J0IHRvRG9MaXN0IGZyb20gXCIuL2xvZ2ljXCI7XHJcbmltcG9ydCB3ZWJJbnRlcmZhY2UgZnJvbSBcIi4vaW50ZXJmYWNlXCI7XHJcblxyXG53ZWJJbnRlcmZhY2UudGFza0J0bkxpc3RlbmVyKCk7XHJcbndlYkludGVyZmFjZS5kaXNwbGF5Q3VzdG9tUHJvamVjdHMoKTtcclxuXHJcbmNvbnN0IHRhc2sxID0gbmV3IFRhc2soXCJUYXNrIDFcIik7XHJcbmNvbnN0IHRhc2syID0gbmV3IFRhc2soXCJUYXNrIDJcIik7XHJcbmxldCBhY3RpdmVQcm9qZWN0ID0gdG9Eb0xpc3QuZ2V0QWN0aXZlUHJvamVjdCgpO1xyXG5cclxuYWN0aXZlUHJvamVjdC5hZGRUYXNrKHRhc2sxKTtcclxuYWN0aXZlUHJvamVjdC5hZGRUYXNrKHRhc2syKTtcclxuY29uc29sZS5sb2coYWN0aXZlUHJvamVjdCk7XHJcblxyXG53ZWJJbnRlcmZhY2UuZGlzcGxheVRhc2soKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=