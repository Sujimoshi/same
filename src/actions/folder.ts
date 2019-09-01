import { ThunkAction } from "same";
import { setFolders, setComponents } from "@same/store/project/actions";
import { insertNode, assignNode, removeNode, moveNode } from "@same/utils/tree";
import uuid from "uuid/v4";
import { Folder } from "@same/store/project/reducers";
import { removeItems, by } from "@same/utils/array";

const createFolder = (name: string): Folder => {
  return { id: uuid(), name, children: [] };
};

export const addFolder = (name: string, to: string) => {
  return setFolders(insertNode(createFolder(name), to));
};

export const editFolderName = (id: string, name: string) =>
  setFolders(assignNode<Folder>(id, { name }));

export const moveFolder = (id: string, to: string): ThunkAction => dispatch => {
  dispatch(setFolders(moveNode(id, to)));
};

export const removeFolder = (id: string): ThunkAction => dispatch => {
  dispatch(setComponents(removeItems(by("folder")(id))));
  dispatch(setFolders(removeNode<Folder>(id)));
};
