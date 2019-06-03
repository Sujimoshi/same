import ASTNode from "./ASTNode";
import { JSXExpressionContainer } from "@babel/types";

export default class ASTJSXExpressionContainer extends ASTNode<
  JSXExpressionContainer
> {
  remove(node: ASTNode): this {
    throw new Error("Can't be implemented for JSXExpressionContainer");
  }

  append(node: ASTNode): this {
    throw new Error("Can't be implemented for JSXExpressionContainer");
  }

  title(): string {
    return `{${(this.node.expression as any).name}}`;
  }

  childrens(): ASTNode[] | null {
    return [];
  }
}
