import {
  projectSet,
  insertNode,
  removeNode,
  placeNode
} from "@same/store/project/actions";
import {
  ComponentConfig,
  Node,
  createNodeConfig,
  NodeType,
  ComponentType,
  isComponent,
  isNode
} from "@same/configurator";
import { ThunkAction } from "same";
import { showAddFolderModal } from "./modal";
import { traverse } from "@same/utils/helpers";

export const focusComponent = (
  component: ComponentConfig,
  node: Node = component.node
) => {
  return projectSet({
    focusedComponent: component.id,
    focusedNode: node.id
  });
};

export const focus = (component: ComponentConfig, ref?: string) => {
  let nodeId: string = !ref ? component.node.id : "";
  if (ref && !nodeId) {
    traverse(component.node, el => {
      if (el.ref === ref) {
        return (nodeId = el.id);
      }
    });
  }
  if (!nodeId) console.error(new Error("Ref not found in component"));
  return projectSet({
    focusedComponent: component.id,
    focusedNode: nodeId
  });
};

export const focusNode = (node: Node) => {
  return projectSet({ focusedNode: node.id });
};

export const createAndAppend = (
  component: ComponentConfig,
  to: Node
): ThunkAction => dispatch => {
  dispatch(
    showAddFolderModal(({ tagName, folderName }) => {
      const type = tagName === "text" ? NodeType.Text : NodeType.Element;
      dispatch(
        insertNode(component, createNodeConfig(type, tagName, folderName), to)
      );
    })
  );
};

export const putNode = (
  component: ComponentConfig,
  place: Node,
  node: Node,
  type: "after" | "into" | "before"
) => {
  if (type === "into") {
    return insertNode(component, node, place);
  } else {
    return placeNode(component, node, place, type);
  }
};

export const mountNode = (
  component: ComponentConfig,
  place: Node,
  type: "after" | "into" | "before",
  that: Node | ComponentConfig
): ThunkAction => (dispatch, getState) => {
  if (isNode(that)) {
    dispatch(removeNode(component, that));
    dispatch(putNode(component, place, that, type));
  } else {
    const node = createNodeConfig(NodeType.Element, that.name, "", that.id);
    dispatch(putNode(component, place, node, type));
  }
};
