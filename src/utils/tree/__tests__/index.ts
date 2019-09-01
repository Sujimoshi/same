import {
  removeNode,
  insertNode,
  TreeNode,
  assignNode,
  findNode
} from "../index";
import * as jp from "jsonpath";

interface Folder extends TreeNode {
  name: string;
}

interface Context {
  tree: Folder;
}

describe("tree helpers", function(this: Context) {
  beforeEach(() => {
    this.tree = {
      id: "root",
      name: "/",
      children: [
        { id: 2, name: "Bar", children: [] },
        { id: 3, name: "Baz", children: [] }
      ]
    };
  });

  it("#removeNode", () => {
    const tree = removeNode(3)(this.tree);
    expect(findNode(el => el.id === 3)(tree)).toEqual(null);
  });

  it("#insertNode", () => {
    const newNode: TreeNode = { id: 4, children: [] };
    const tree = insertNode(newNode, 3)(this.tree);
    expect(findNode(el => el.id === 4)(tree)[0]).toEqual(newNode);
  });

  it("#assignNode", () => {
    const tree = assignNode<Folder>(2, { name: "Foos" })(this.tree);
    expect(findNode<Folder>(el => el.id === 2)(tree)[0].name).toBe("Foos");
  });
});
