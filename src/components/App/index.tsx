import React, { Fragment, useEffect } from "react";
import Body from "../Body/index";
import { remote } from "electron";
import { openProject, createProject } from "@same/actions/project";
import ModalsRegistry from "../ModalsRegistry";
import { connect } from "react-redux";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import VisualEditor from "../VisualEditor";
const { Menu } = remote;

export interface Props {
  openProject: typeof openProject;
  createProject: typeof createProject;
}

export const setupApplicationMenu = ({ openProject, createProject }: Props) => {
  openProject("/Users/sujimoshi/Projects/same/front/example");
  const menuConfig = Menu.getApplicationMenu().items;
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      menuConfig[0],
      {
        label: "File",
        submenu: [
          {
            label: "New project",
            click: () => createProject()
          },
          {
            label: "Open project...",
            click: () => openProject()
          }
        ]
      },
      ...menuConfig.slice(2)
    ])
  );
};

export const App = (props: Props) => {
  useEffect(() => {
    setupApplicationMenu(props);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Body />
      <ModalsRegistry />
    </DndProvider>
  );
};

export default connect(
  null,
  { openProject, createProject }
)(App);
