import React, { Component } from "react";
import Body from "../Body/index";
import { remote } from "electron";
import { withConnect } from "@same/utils/connect";
import { openProject } from "@same/actions/project";
const { Menu } = remote;

@withConnect(null, { openProject })
export default class App extends Component<any> {
  componentDidMount() {
    this.props.openProject("/Users/sujimoshi/Projects/same/front/example");
    const menuConfig = Menu.getApplicationMenu().items;
    Menu.setApplicationMenu(
      Menu.buildFromTemplate([
        menuConfig[0],
        {
          label: "File",
          submenu: [
            {
              label: "Open...",
              click: () => this.props.openProject()
            }
          ]
        },
        ...menuConfig.slice(2)
      ])
    );
  }

  render() {
    return <Body />;
  }
}
