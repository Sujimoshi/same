import { combineReducers } from "redux";
import project from "./project";
import editor from "./editor/reducers";

const rootReducer = combineReducers({
  project,
  editor
});

export default rootReducer;
