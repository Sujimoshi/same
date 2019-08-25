import { isFolderExists } from "@same/store/project/selectors";
import { ThunkAction } from "same";
import { setFolders, setComponents } from "@same/store/project/actions";
import {
  insertItem,
  removeItems,
  after,
  replaceItem,
  mapItems
} from "@same/utils/array";
import { dirname, join } from "path";
import { isSubFolder } from "@same/utils/helpers";

export const createFolder = (folderName?: string): ThunkAction => (
  dispatch,
  getState
) => {
  if (folderName === "/" || isFolderExists(folderName)(getState())) return;
  dispatch(setFolders(insertItem(folderName, after(dirname(folderName)))));
};

export const editFolder = (
  folderName: string,
  newName: string
): ThunkAction => dispatch => {
  const newFolderName = join(dirname(folderName), newName);
  const regex = new RegExp(`(^${folderName})`);
  const renameFolder = (folder: string) => folder.replace(regex, newFolderName);
  dispatch(
    setComponents(mapItems(el => ({ ...el, path: renameFolder(el.path) })))
  );
  dispatch(setFolders(mapItems(renameFolder)));
};

export const removeFolder = (folderName: string): ThunkAction => dispatch => {
  const isInFolder = isSubFolder(folderName);
  dispatch(setComponents(removeItems(el => isInFolder(dirname(el.path)))));
  dispatch(setFolders(removeItems(el => isInFolder(el))));
};
