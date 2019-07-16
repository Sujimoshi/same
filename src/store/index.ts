import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import editor from "./editor/reducers";
import project from "./project/reducers";

const rootReducer = combineReducers({
  editor,
  project
});

const composeWithDevtools = (window as any)
  .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = createStore(
  rootReducer,
  composeWithDevtools(applyMiddleware(thunk, logger))
);
export default store;
