import Project from "./projects";
import { format, parse, isThisWeek } from 'date-fns';

const toDoList = (() => {
  let projectList = [];
  projectList.push(new Project("Inbox"));
  projectList.push(new Project("Today"));
  projectList.push(new Project("This Week"));

  let activeProjectName = "Inbox";

  const addNewProject = (project) => projectList.push(project);

  const getAllProjects = () => projectList;

  const getProject = (name) => projectList.find(el => el.name == name);

  const setActiveProjectName = (projectName) => activeProjectName = projectName;

  const getActiveProjectName = () => activeProjectName;

  const getActiveProject = () => getProject(getActiveProjectName());

  const checkIsToday = (date) => {
    const todayDate = format(new Date(), 'yyyy-MM-dd');
    return date === todayDate;
  }

  const addTodayTask = (task) => {
    const todayProject = getProject("Today");
    todayProject.addTask(task);
  }

  const checkThisWeek = (date) => {
    const convertedDate = parse(date, 'yyyy-MM-dd', new Date());
    return isThisWeek(convertedDate);
  }

  const addThisWeekTask = (task) => {
    const thisWeekProject = getProject("This Week");
    thisWeekProject.addTask(task);
  }

  const removeTaskfromProject = (id) => {
    projectList.forEach(project => {
      if (project.checkTask(id)) project.removeTask(id);
    })
  }
  
  return {
    addNewProject,
    getAllProjects,
    getProject,
    setActiveProjectName,
    getActiveProjectName,
    getActiveProject,
    checkIsToday,
    addTodayTask,
    checkThisWeek,
    addThisWeekTask,
    removeTaskfromProject
  };
})();

export default toDoList;