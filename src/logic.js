import Project from "./projects";

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
  
  return {
    addNewProject,
    getAllProjects,
    getProject,
    setActiveProjectName,
    getActiveProjectName,
    getActiveProject
  };
})();

export default toDoList;