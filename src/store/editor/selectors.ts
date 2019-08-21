import { getComponents } from "../project/selectors";
import { createSelector } from "reselect";
import { ComponentType, Node } from "@same/configurator";
import { traverse } from "@same/utils/helpers";
import { generateComponent } from "@same/configurator/generator";
import { EditorStore } from "./reducers";

export interface EditorStorePart {
  editor: EditorStore;
}

export const getFocusedComponentId = ({ editor }: EditorStorePart) =>
  editor.focusedComponent;

export const getFocusedNodeId = ({ editor }: EditorStorePart) =>
  editor.focusedNode;

export const getHoveredNodeId = ({ editor }: EditorStorePart) =>
  editor.hoveredNode;

export const getFocusedElement = ({ editor }: EditorStorePart) =>
  editor.focusedElement;

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

export const getFocusedNodeStyles = createSelector(
  getFocusedNode,
  node => {
    return node.styles;
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
