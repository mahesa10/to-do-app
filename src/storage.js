import toDoList from "./logic";
import Project from "./projects";
import Task from "./task";

const storage = (() => {
  const addData = () => {
    let projectList = toDoList.getAllProjects();
    localStorage.setItem('toDoList', JSON.stringify(projectList)); 
  }

  const getData = () => {
    let storageData = JSON.parse(localStorage.getItem('toDoList'));
    if (storageData) {
      let assignedProjects = storageData.map(project => Object.assign(new Project(), project));
      assignedProjects.forEach(project => {
        let assignedTasks = project.getAllTasks()
                              .map(task => {
                                Task.setLatestId(task.id - 1);
                                return Object.assign(new Task(), task);
                              });
        project.clearTask();
        assignedTasks.forEach(task => {
          project.addTask(task);
        })
      })
  
      return assignedProjects;
    }
  }

  return {
    addData,
    getData
  };
})();

export default storage;