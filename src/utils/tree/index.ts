import produce from "immer";
import { compose } from "underscore";

export interface TreeNode {
  id: string;
  children: this[];
}

export type Iterator<T, R> = (
  node: T,
  parent: T | null,
  index: number,
  level: number
) => R;

export const traverse = <T extends TreeNode>(iterator: Iterator<T, any>) => (
  tree: T
) => {
  return (function next(
    node: T,
    parent: T | null = null,
    index: number = 0,
    level: number = 0
  ) {
    if (iterator(node, parent, index, level)) return;
    if (node.children)
      node.children.map((el: T, i: number) => next(el, node, i, level + 1));
  })(tree);
};

export const findNode = <T extends TreeNode>(
  iterator: Iterator<T, boolean>
) => (root: T) => {
  let res: [T, T | null, number, number] = null;
  traverse<T>((node, parent, index, level) => {
    if (iterator(node, parent, index, level))
      return (res = [node, parent, index, level]);
  })(root);
  return res;
};

export const removeNode = <T extends TreeNode>(id: string | number) => (
  root: T
) => {
  const [, parent, index] = findNode(node => node.id === id)(root);
  if (parent) parent.children.splice(index, 1);
  return root;
};

export const insertNode = <T extends TreeNode>(
  node: T,
  to: string | number,
  index: number = 0
) => (root: T) => {
  const [founded] = findNode(node => node.id === to)(root);
  founded.children.splice(index, 0, node);
  return root;
};

export const assignNode = <T extends TreeNode>(
  id: string | number,
  node: Partial<T>
) => (root: T) => {
  const [founded, parent, index] = findNode(node => node.id === id)(root);
  if (parent) parent.children.splice(index, 1, { ...founded, ...node });
  return root;
};

export const moveNode = <T extends TreeNode>(
  id: string | number,
  to: string | number
) => (root: T) => {
  const [founded] = findNode(node => node.id === id)(root);
  return compose(
    removeNode(id),
    insertNode(founded, to)
  )(root);
};
