import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { saveProject } from "@same/storage";
import project from "./project/reducers";
import modal from "./modal/reducers";
import editor from "./editor/reducers";
import { debounce } from "underscore";

const rootReducer = combineReducers({
  project,
  modal,
  editor
});

const composeWithDevtools = (window as any)
  .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = createStore(
  rootReducer,
  composeWithDevtools(applyMiddleware(thunk, logger))
);

export default store;

let proj = store.getState().project;
let edit = store.getState().editor;
store.subscribe(
  debounce(() => {
    const { project, editor } = store.getState();
    if (proj !== project || edit !== editor) {
      proj = project;
      edit = editor;
      saveProject({
        ...project,
        focusedComponent: editor.focusedComponent,
        focusedNode: editor.focusedNode
      });
    }
  }, 1000)
);
