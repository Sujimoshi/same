import React from "react";
import ReactDOM from "react-dom";
import App from "@same/components/App";
import { Provider } from "react-redux";
import store from "@same/store";

document.addEventListener("keydown", e => {
  e.which === 123 &&
    require("electron")
      .remote.getCurrentWebContents()
      .toggleDevTools();
});

const rootNode = document.createElement("root");
document.body.append(rootNode);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootNode
);
