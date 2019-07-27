import { RootStore } from "same";
import { createSelector } from "reselect";
import { groupBy } from "underscore";
import { dirname, basename } from "path";
import { ComponentType, Node } from "@same/configurator";
import { traverse } from "@same/utils/helpers";
import { generateComponent } from "@same/configurator/generator";

export const getProject = (state: RootStore) => state.project;
export const getComponents = (state: RootStore) => state.project.components;
export const getFocusedComponentId = (state: RootStore) =>
  state.project.focusedComponent;
export const getFocusedNodeId = (state: RootStore) => state.project.focusedNode;

export const getFocusedComponent = createSelector(
  getFocusedComponentId,
  getComponents,
  (focusedComponentId, components) =>
    components ? components[focusedComponentId] : null
);

export const getFocusedNode = createSelector(
  getFocusedComponent,
  getFocusedNodeId,
  (focusedComponent, focusedNodeId) => {
    if (!focusedComponent) return null;
    if (focusedComponent.type === ComponentType.Styled) {
      return focusedComponent.node;
    } else {
      let res: Node = null;
      traverse(focusedComponent.node, node => {
        if (node.id === focusedNodeId) res = node;
      });
      return res;
    }
  }
);

export const getReferenceComponent = createSelector(
  getComponents,
  getFocusedNode,
  (components, focusedNode) => {
    if (!focusedNode || !focusedNode.ref) return null;
    return components[focusedNode.ref];
  }
);

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

export const getCode = createSelector(
  getComponents,
  getFocusedComponent,
  (components, focusedComponent) => {
    if (!focusedComponent) return "";
    const file = Object.values(components).filter(
      component => component.path === focusedComponent.path
    );
    return generateComponent(file, components);
  }
);
