import { projectReset, addComponent } from "@same/store/project/actions";
import { readdirSync, readFileSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { createConfig } from "@same/parser";
import { ThunkAction } from "same";
import { remote } from "electron";
import { sync as glob } from "glob";
const { dialog } = remote;

const CONFIG_FILE_NAME = "same.json";

export const openProject = (path?: string): ThunkAction => dispatch => {
  if (!path) {
    const res = dialog.showOpenDialog({ properties: ["openDirectory"] }) || [];
    if (res.length <= 0) return;
    path = res[0];
  }
  const configs = glob(join(path, "**", CONFIG_FILE_NAME));
  const components = configs.map(file => {
    return JSON.parse(readFileSync(file).toString());
  }, []);
  dispatch(projectReset({ path, components }));
};

export const createComponent = (name: string): ThunkAction => (
  dispatch,
  getState
) => {
  const { project } = getState();
  const config = createConfig(name);
  const newFolderPath = join(project.path, name);
  mkdirSync(newFolderPath);
  writeFileSync(join(newFolderPath, "index.js"), "");
  writeFileSync(
    join(newFolderPath, "index.config.json"),
    JSON.stringify(config)
  );
  dispatch(addComponent(config));
};
