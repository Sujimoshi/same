export enum ExpressionType {
  StatelessComponent = "StatelessComponent",
  Element = "Element",
  TextNode = "TextNode",
  StyledComponent = "StyledComponent"
}

export interface Expression {
  type: ExpressionType;
  id: string;
}

export interface Props {
  [key: string]: any;
}

export interface Node extends Expression {
  children: Node[];
  props: Props;
}

export interface Exportable extends Expression {
  name: string;
}

export interface StyledComponent extends Exportable {
  type: ExpressionType.StyledComponent;
  tag: string;
  props: Props;
}

export interface StatelessComponent extends Exportable {
  type: ExpressionType.StatelessComponent;
  props: Props;
  return: Node;
}

export interface TextNode extends Node {
  type: ExpressionType.TextNode;
  value: string;
}

export interface Element extends Node {
  type: ExpressionType.Element;
  tag: string;
  props: Props;
}

export interface Exports {
  default?: StatelessComponent;
  [name: string]: StyledComponent | any;
}
