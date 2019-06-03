import ASTNode from "./ASTNode";
import { JSXAttribute, JSXElement, StringLiteral } from "@babel/types";
import { expression } from "./babel";

export default class ASTJSXAttribute extends ASTNode<JSXAttribute> {
  static create(key: string, value: string) {
    const element: JSXElement = expression(
      `<div ${key}="${value}" />`
    ) as JSXElement;
    return new ASTJSXAttribute(
      element.openingElement.attributes[0] as JSXAttribute,
      null
    );
  }

  remove(node: ASTNode): this {
    throw new Error("Can't be implemented for JSXAttribute");
  }

  append(node: ASTNode): this {
    throw new Error("Can't be implemented for JSXAttribute");
  }

  name(): string {
    return this.node.name.name as string;
  }

  value(): string {
    return (this.node.value as StringLiteral).value;
  }

  title(): string {
    return this.name();
  }

  json() {
    return { [this.name()]: (this.node.value as any).value };
  }

  childrens(): ASTNode[] | null {
    return [];
  }
}
