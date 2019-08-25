import { RootStore } from "same";
import { createSelector } from "reselect";
import { groupBy, Dictionary } from "underscore";
import { dirname } from "path";
import { ComponentType } from "@same/configurator";
import jp from "jsonpath";

export const getProject = (state: RootStore) => state.project;
export const getComponents = (state: RootStore) => state.project.components;
export const getFolders = (state: RootStore) => state.project.folders;

export const isFolderExists = (folder: string) => (state: RootStore) => {
  return state.project.folders.includes(folder);
};

export const getFoldersSystem = (state: RootStore) => {
  return state.project.folders.reduce<Dictionary<any>>((tmp, el) => {
    const parts = el.replace(/^\//, "").split("/");
    const last = parts.reduce<any>((acc, part, i) => {
      if (acc[part]) {
        acc = acc[part];
      } else {
        acc = acc[part] = {};
      }
      return acc;
    }, tmp);
    Object.defineProperty(last, "path", {
      writable: true,
      value: el
    });
    return tmp;
  }, {});
};

export const isComponentInUse = (id: string) => (state: RootStore) => {
  return jp.query(state.project.components, "$..ref").includes(id);
};
