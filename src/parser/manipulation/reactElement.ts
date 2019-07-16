import { JSXElement, JSXAttribute, JSXIdentifier } from "@babel/types";
import { IndexedNode } from "same";
import { parseExpression } from "@babel/parser";
import { expression } from "../babel";
import { createAttribute } from "./reactAttribute";

export const removeAttribute = (
  node: JSXElement,
  attribute: JSXAttribute & IndexedNode
) => {
  const attributes = node.openingElement.attributes;
  node.openingElement.attributes = attributes.filter(
    attr => attr !== attribute
  );
  attribute.parent = null;
  return node;
};

export const openElement = (node: JSXElement) => {
  if (!node.openingElement.selfClosing) return;
  const tag = (node.openingElement.name as JSXIdentifier).name;
  const expr = expression(`<${tag}></${tag}>`) as JSXElement;
  node.closingElement = expr.closingElement;
  node.openingElement.selfClosing = false;
  return node;
};

export const addAttribute = (node: JSXElement, name: string, value: string) => {
  const attr = createAttribute(name, value);
  attr.parent = node;
  node.openingElement.attributes.push(attr);
  return node;
};
