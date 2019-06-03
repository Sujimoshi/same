import { File, traverse, isJSXElement, BaseNode } from "@babel/types";
import ASTNode from "./ASTNode";
import ASTJSXElement from "./ASTJSXElement";
import { parse } from "./babel";

export default class ASTFile extends ASTNode<File> {
  static createFromCode(code: string) {
    return new (this as any)(parse(code));
  }

  append(node: ASTNode<BaseNode>, after?: ASTNode<BaseNode>): this {
    throw new Error("Method not implemented.");
  }

  remove(node: ASTNode<BaseNode>): this {
    throw new Error("Method not implemented.");
  }

  title(): string {
    throw new Error("Method not implemented.");
  }

  childrens(): ASTNode<BaseNode>[] {
    throw new Error("Method not implemented.");
  }

  jsxRoots() {
    const roots: ASTJSXElement[] = [];
    traverse(this.node, {
      enter: path => {
        const lastRoot = roots[roots.length - 1];
        if (path && isJSXElement(path)) {
          if (
            !lastRoot ||
            !(lastRoot.node.start < path.start && lastRoot.node.end > path.end)
          )
            roots.push(new ASTJSXElement(path, this));
        }
      }
    });
    return roots;
  }
}
