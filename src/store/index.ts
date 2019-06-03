import { combineReducers } from "redux";
import project from "./project";
import editorManager from "./editor/reducers";

const rootReducer = combineReducers({
  project,
  editor: editorManager.reducer
});

export default rootReducer;
