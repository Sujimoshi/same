import uuid from "uuid/v4";

export enum ComponentType {
  Styled = "Styled",
  Pure = "Pure"
}

export interface ComponentConfig {
  id: string;
  type: ComponentType;
  path: string;
  name: string;
  node: Node;
}

export enum NodeType {
  Style = "Style",
  Text = "Text",
  Element = "Element"
}

export interface Node {
  id: string;
  type: NodeType;
  tag: string;
  ref?: string;
  props: any;
  styles: any;
  children: Node[];
  value: string;
}

export const createComponentConfig = (
  type: ComponentType,
  name: string,
  path: string,
  node?: Node
): ComponentConfig => {
  node =
    node ||
    createNodeConfig(
      type === ComponentType.Styled ? NodeType.Style : NodeType.Element
    );
  return { id: uuid(), type, name, path, node };
};

export const createNodeConfig = (
  type: NodeType,
  tag: string = "div",
  value: string = "",
  ref?: string
): Node => {
  return {
    id: uuid(),
    type,
    tag,
    props: {},
    styles: {},
    ref,
    value,
    children: []
  };
};

export const isComponent = (component: any): component is ComponentConfig => {
  return !!component.node;
};

export const isNode = (node: any): node is Node => {
  return !!node.tag;
};

export const isPure = (component: ComponentConfig) => {
  return component.type === ComponentType.Pure;
};

export const isStyled = (component: ComponentConfig) => {
  return component.type === ComponentType.Styled;
};

export const isElementNode = (node: Node) => {
  return node.type === NodeType.Element;
};

export const isTextNode = (node: Node) => node.type === NodeType.Text;
