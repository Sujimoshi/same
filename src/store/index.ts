import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { saveProject } from "@same/storage";
import project from "./project/reducers";
import modal from "./modal/reducers";
import { throttle } from "underscore";

const rootReducer = combineReducers({
  project,
  modal
});

const composeWithDevtools = (window as any)
  .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = createStore(
  rootReducer,
  composeWithDevtools(applyMiddleware(thunk, logger))
);

export default store;

let proj = store.getState().project;
store.subscribe(
  throttle(() => {
    const { project } = store.getState();
    if (proj !== project) {
      proj = project;
      saveProject(project);
    }
  }, 500)
);
