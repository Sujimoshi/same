import { MouseEvent } from "react";

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const traverse = <N>(
  tree: N,
  iterator: (node: N, parent: N, index: number, level: number) => any,
  childrensKey: string = "children"
) => {
  return (function next(
    node: N,
    parent: N = null,
    index: number = 0,
    level: number = 0
  ) {
    if (iterator(node, parent, index, level)) return;
    if ((node as any)[childrensKey]) {
      (node as any)[childrensKey].map((el: N, i: number) =>
        next(el, node, i, level + 1)
      );
    }
  })(tree);
};

export const eventValue = (cb: (value: any) => void) => (e: any) => {
  cb(e.target.value);
};

export const stopPropagation = (cb: (e: Event) => void) => (e: any) => {
  e.stopPropagation();
  cb(e);
};

export const findValue = (list: any[], field: string, value: any) => {
  return (list.find(el => el.value === value) || { [field]: null })[field];
};

export interface Pos {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const getPos = (node: HTMLElement): Pos => {
  const position = node.getBoundingClientRect();
  return {
    x: position.left,
    y: position.top,
    w: position.width,
    h: position.height
  };
};

export const getSizeParts = (
  el: HTMLElement,
  type: "border" | "margin" | "padding"
) => {
  const postfix = type === "border" ? "-width" : "";
  const computedStyles = getComputedStyle(el);
  const getAttr = (attr: string) =>
    parseFloat(computedStyles.getPropertyValue(attr).replace("px", ""));
  return {
    top: getAttr(type + "-top" + postfix),
    bottom: getAttr(type + "-bottom" + postfix),
    left: getAttr(type + "-left" + postfix),
    right: getAttr(type + "-right" + postfix)
  };
};

export const getRealSize = (el: HTMLElement, type: "width" | "height") => {
  return el.getBoundingClientRect()[type];
};

export const getComputedSize = (el: HTMLElement, type: "width" | "height") => {
  return parseFloat(
    getComputedStyle(el)
      .getPropertyValue(type)
      .replace("px", "")
  );
};
