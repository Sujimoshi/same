import { RootStore } from "same";
import * as jp from "jsonpath";

export const getProject = (state: RootStore) => state.project;
export const getComponents = (state: RootStore) => state.project.components;
export const getFolders = (state: RootStore) => state.project.folders;

export const isFolderExists = (folder: string) => (state: RootStore) => {
  return false; // TODO: implement
};

export const isComponentInUse = (id: string) => (state: RootStore) => {
  return jp.query(state.project.components, "$..ref").includes(id);
};
