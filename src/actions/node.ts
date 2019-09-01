import {
  projectSet,
  insertNode,
  removeNode,
  placeNode,
  setComponents,
  setNode
} from "@same/store/project/actions";
import {
  ComponentConfig,
  Node,
  createNodeConfig,
  NodeType,
  isNode,
  createComponentConfig,
  ComponentType,
  isPure
} from "@same/configurator";
import { ThunkAction } from "same";
import { showCreateNodeModal } from "./modal";
import { traverse } from "@same/utils/helpers";
import { editorSet } from "@same/store/editor/actions";
import {
  getHoveredNodeId,
  getFocusedNodeId,
  getFocusedElement
} from "@same/store/editor/selectors";
import { insertItem } from "@same/utils/array";
import { dirname, join, basename } from "path";

export const focusComponent = (
  component: ComponentConfig,
  node: Node = component.node
) => {
  return editorSet({
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
  return editorSet({
    focusedComponent: component.id,
    focusedNode: nodeId
  });
};

export const focusNode = (node: Node | string) => {
  return editorSet({ focusedNode: typeof node === "string" ? node : node.id });
};

export const setFocusedElement = (element: HTMLElement): ThunkAction => (
  dispatch,
  getState
) => {
  if (!element) return;
  const id = element.getAttribute("data-id");
  const state = getState();
  const isIdChanged = getFocusedNodeId(state) !== id;
  const isElementChanged = getFocusedElement(state) !== element;
  if (!isIdChanged && !isElementChanged) return;
  dispatch(
    editorSet({
      ...(isIdChanged && { focusedNode: element.getAttribute("data-id") }),
      focusedElement: element
    })
  );
};

export const setHoveredNode = (id: string): ThunkAction => (
  dispatch,
  getState
) => {
  if (getHoveredNodeId(getState()) !== id)
    dispatch(editorSet({ hoveredNode: id }));
};

export const createAndAppend = (
  component: ComponentConfig,
  to: Node,
  type: NodeType,
  tagOrValue?: string
): ThunkAction => dispatch => {
  const tag = type === NodeType.Element ? tagOrValue : "text-node";
  const value = type === NodeType.Text ? tagOrValue : "";
  dispatch(insertNode(component, createNodeConfig(type, tag, value), to));
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
): ThunkAction => dispatch => {
  if (isNode(that)) {
    dispatch(removeNode(component, that));
    dispatch(putNode(component, place, that, type));
  } else {
    const name = isPure(that) ? basename(that.file, ".js") : that.name;
    const node = createNodeConfig(NodeType.Element, name, "", that.id);
    dispatch(putNode(component, place, node, type));
  }
};

export const saveNodeAsComponent = (
  component: ComponentConfig,
  node: Node,
  name: string
): ThunkAction => dispatch => {
  const newStyledNode: Node = {
    ...createNodeConfig(NodeType.Style, node.tag),
    styles: node.styles
  };
  const newComponent = createComponentConfig(
    ComponentType.Styled,
    name,
    join(component.folder),
    "index.js",
    newStyledNode
  );
  dispatch(setComponents(insertItem(newComponent)));
  dispatch(
    setNode(component, {
      ...node,
      styles: {},
      tag: newComponent.name,
      ref: newComponent.id
    })
  );
};
