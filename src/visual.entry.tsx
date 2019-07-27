import React from "react";
import ReactDOM from "react-dom";
import App from "@same/visual/App";
import { Provider } from "react-redux";
import store from "@same/store";

const rootNode = document.createElement("root");
document.body.append(rootNode);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootNode
);
