import { projectReset } from "@same/store/project/actions";
import { ThunkAction } from "same";
import { remote } from "electron";
import { loadProject } from "@same/storage";
import { editorReset } from "@same/store/editor/actions";
const { dialog } = remote;

export const openProject = (path?: string): ThunkAction => async dispatch => {
  if (!path) {
    const [projectPath = ""] =
      dialog.showOpenDialog({ properties: ["openDirectory"] }) || [];
    if (!projectPath) return;
    path = projectPath;
  }
  const { focusedComponent, focusedNode, ...project } = await loadProject(path);
  dispatch(projectReset(project));
  dispatch(editorReset({ focusedComponent, focusedNode }));
};

export const createProject = (): ThunkAction => async dispatch => {
  const [path = ""] =
    dialog.showOpenDialog({
      properties: ["openDirectory", "createDirectory"]
    }) || [];
  if (!path) return;
  const { focusedComponent, focusedNode, ...project } = await loadProject(path);
  dispatch(projectReset(project));
  dispatch(editorReset({ focusedComponent, focusedNode }));
};
