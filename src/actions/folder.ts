import { isFolderExists } from "@same/store/project/selectors";
import { ThunkAction } from "same";
import { setFolders, setComponents } from "@same/store/project/actions";
import { addItem, removeItems } from "@same/utils/array";
import { dirname } from "path";

export const createFolder = (folderName?: string): ThunkAction => (
  dispatch,
  getState
) => {
  if (folderName === "/" || isFolderExists(folderName)(getState())) return;
  dispatch(setFolders(addItem(folderName, 0)));
};

export const removeFolder = (folderName?: string): ThunkAction => dispatch => {
  dispatch(setComponents(removeItems(el => dirname(el.path) === folderName)));
  dispatch(
    setFolders(removeItems(el => new RegExp(`^(${folderName}).*`).test(el)))
  );
};
