import ASTNode from "./ASTNode";
import { JSXText } from "@babel/types";

export default class ASTJSXText extends ASTNode<JSXText> {
  remove(node: ASTNode): this {
    throw new Error("Can't be implemented for JSXText");
  }

  append(node: ASTNode): this {
    throw new Error("Can't be implemented for JSXText");
  }

  title(): string {
    return this.node.value.replace(/^\n| $/gm, "");
  }

  value(): string {
    return this.node.value.replace(/^\n| $/gm, "");
  }

  childrens(): ASTNode[] | null {
    return [];
  }

  isFake() {
    return !this.node.value.replace(/\n| /gm, "");
  }
}
