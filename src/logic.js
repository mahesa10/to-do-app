import Project from "./projects";

const todo = (() => {
  let projectList = [];
  projectList.push(new Project("All Tasks"));
  projectList.push(new Project("Today"));
  projectList.push(new Project("This Week"));

  const getAllProjects = () => projectList;

  const getProject = (name) => projectList.find(el => el.name == name)

  return { getAllProjects, getProject };
})();

export default todo;