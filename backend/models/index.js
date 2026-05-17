import User from "./User.js";
import Project from "./Project.js";
import Task from "./Task.js";
import ProjectMember from "./ProjectMember.js";


// User -> Project
User.hasMany(Project,{
  foreignKey:"adminId"
});

Project.belongsTo(User,{
  foreignKey:"adminId"
});


// Project -> Task
Project.hasMany(Task,{
  foreignKey:"projectId"
});

Task.belongsTo(Project,{
  foreignKey:"projectId"
});


// User -> Task
User.hasMany(Task,{
  foreignKey:"assignedTo"
});

Task.belongsTo(User,{
  foreignKey:"assignedTo"
});


// Many-to-Many
User.belongsToMany(Project,{
  through:ProjectMember,
  foreignKey:"userId"
});

Project.belongsToMany(User,{
  through:ProjectMember,
  foreignKey:"projectId"
});


export {
  User,
  Project,
  Task,
  ProjectMember
};