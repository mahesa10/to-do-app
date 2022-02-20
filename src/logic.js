import Project from "./projects";

const toDoList = (() => {
  let projectList = [];
  projectList.push(new Project("Inbox"));
  projectList.push(new Project("Today"));
  projectList.push(new Project("This Week"));
  projectList.push(new Project("Test 1"));
  projectList.push(new Project("Test 2"));

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

export default toDoList;