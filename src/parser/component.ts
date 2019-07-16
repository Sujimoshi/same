import uuid from "uuid/v4";
import {
  ListedTree,
  Node,
  StatelessComponent,
  Props,
  ExpressionType
} from "./structure";

export const removeNode = (tree: ListedTree, node: Node): ListedTree => {
  if (node.parent === null) return { ...tree, root: undefined };
  const parent = tree[node.parent];
  parent.children = parent.children.filter(id => id !== node.id);
  return { ...tree, [node.parent]: { ...parent }, [node.id]: undefined };
};

export const createComponent = (
  id: string = uuid(),
  name: string,
  props: Props,
  rtr: ListedTree
): StatelessComponent => {
  return {
    id,
    type: ExpressionType.StatelessComponent,
    name,
    props,
    return: rtr
  };
};
