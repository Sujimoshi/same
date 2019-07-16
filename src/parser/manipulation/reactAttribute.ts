import { JSXAttribute, StringLiteral, JSXElement } from "@babel/types";
import { expression } from "../babel";
import { IndexedNode } from "same";

export const setName = (attribute: JSXAttribute, name: string) => {
  attribute.name.name = name;
  return attribute;
};

export const setValue = (attribute: JSXAttribute, value: string) => {
  (attribute.value as StringLiteral).value = value;
  return attribute;
};

export const createAttribute = (
  name: string,
  value: string
): JSXAttribute & IndexedNode => {
  try {
    return (expression(`<div ${name}="${value}" />`) as JSXElement)
      .openingElement.attributes[0] as JSXAttribute;
  } catch (e) {
    console.error(e);
  }
};
