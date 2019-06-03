import React from "react";
import ReactDOM from "react-dom";
import App from "@same/components/App";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "@same/store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import _, { Dictionary } from "underscore";

document.addEventListener("keydown", e => {
  e.which === 123 &&
    require("electron")
      .remote.getCurrentWebContents()
      .toggleDevTools();
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
const rootNode = document.createElement("root");
document.body.append(rootNode);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootNode
);
