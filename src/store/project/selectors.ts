import { RootStore } from "same";
import { createSelector } from "reselect";
import { groupBy, Dictionary } from "underscore";
import { dirname } from "path";
import { ComponentType } from "@same/configurator";

export const getProject = (state: RootStore) => state.project;
export const getComponents = (state: RootStore) => state.project.components;
export const getFolders = (state: RootStore) => state.project.folders;

export const getGroupedComponents = createSelector(
  getProject,
  project => {
    if (!project.components) return [];
    return Object.values(
      groupBy(Object.values(project.components), component => {
        return dirname(component.path);
      })
    ).map(el =>
      el.sort((a, b) =>
        a.type === b.type ? 0 : a.type === ComponentType.Pure ? -1 : 1
      )
    );
  }
);

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
      get: () => el
    });
    return tmp;
  }, {});
};
