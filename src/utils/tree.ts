import { Node } from "@same/parser/structure";

export const remove = (from: any[], node: any) => {
  const removeIndex = from.findIndex((el: any) => el === node);
  from.splice(removeIndex, 1);
};

export const insert = (to: any[], el: any, index = 0) => {
  to.splice(index, 0, el);
};

export const traverse = (
  tree: Node,
  iterator: (node: Node, parent: Node, index: number, level: number) => any,
  parent: Node = null,
  index: number = 0,
  level: number = 0
) => {
  iterator(tree, parent, index, level);
  if (tree.children)
    tree.children.map((el, i) => traverse(el, iterator, tree, i, level + 1));
};
