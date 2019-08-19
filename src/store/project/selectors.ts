import { RootStore } from "same";
import { createSelector } from "reselect";
import { groupBy } from "underscore";
import { dirname } from "path";
import { ComponentType } from "@same/configurator";

export const getProject = (state: RootStore) => state.project;
export const getComponents = (state: RootStore) => state.project.components;

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
