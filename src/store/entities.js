import { combineReducers } from "redux";
import usersReducer from "./users";
import bugsReducer from "./bugs";
import projectsReducer from "./projects";

export default combineReducers({
  bugs: bugsReducer,
  projects: projectsReducer,
  users: usersReducer,
});
