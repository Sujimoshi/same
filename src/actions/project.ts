import { projectReset } from "@same/store/project/actions";
import { ThunkAction } from "same";
import { remote } from "electron";
import { loadProject } from "@same/storage";
const { dialog } = remote;

export const openProject = (path?: string): ThunkAction => async dispatch => {
  if (!path) {
    const [projectPath = ""] =
      dialog.showOpenDialog({ properties: ["openDirectory"] }) || [];
    if (!projectPath) return;
    path = projectPath;
  }
  const project = await loadProject(path);
  dispatch(projectReset({ ...project }));
};

export const createProject = (): ThunkAction => async dispatch => {
  const [path = ""] =
    dialog.showOpenDialog({
      properties: ["openDirectory", "createDirectory"]
    }) || [];
  if (!path) return;
  const project = await loadProject(path);
  dispatch(projectReset({ ...project }));
};
