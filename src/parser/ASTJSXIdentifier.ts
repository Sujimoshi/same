import ASTNode from "./ASTNode";
import { JSXIdentifier } from "@babel/types";

export default class ASTJSXIdentifier extends ASTNode<JSXIdentifier> {
  remove(node: ASTNode): this {
    throw new Error("Can't be implemented for JSXIdentifier");
  }

  append(node: ASTNode): this {
    throw new Error("Can't be implemented for JSXIdentifier");
  }

  title(): string {
    return this.node.name;
  }

  childrens(): ASTNode[] | null {
    return [];
  }
}
