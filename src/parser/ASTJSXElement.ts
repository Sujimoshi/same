import { JSXElement } from "@babel/types";
import ASTNode, { WithAdditionalFields } from "./ASTNode";
import { expression } from "./babel";
import ASTJSXOpeningElement from "./ASTJSXOpeningElement";
import ASTJSXAttribute from "./ASTJSXAttribute";

export default class ASTJSXElement extends ASTNode<JSXElement> {
  attributes() {
    return this.openingElement().attributes();
  }

  addAttribute(key: string, value: string) {
    this.openingElement().addAttribute(key, value);
  }

  openingElement() {
    return new ASTJSXOpeningElement(this.node.openingElement, this);
  }

  openElement() {
    if (!this.node.openingElement.selfClosing) return;
    const expr = expression(`<${this.tag()}></${this.tag()}>`) as JSXElement;
    this.node.closingElement = expr.closingElement;
    this.node.openingElement.selfClosing = false;
  }

  append(node: ASTNode, after?: ASTNode): this {
    this.openElement();
    const afterIndex = after
      ? this.node.children.findIndex(el => el === after.node)
      : this.node.children.length - 1;
    this.node.children.splice(afterIndex + 1, 0, node.node as any);
    return this;
  }

  remove(node: ASTNode): this {
    const removeIndex = this.node.children.findIndex(el => el === node.node);
    this.node.children.splice(removeIndex, 1);
    return this;
  }

  tag() {
    return this.openingElement().title();
  }

  title(): string {
    return `<${this.tag()}>`;
  }

  childrens(): ASTNode[] {
    return ASTNode.mapToASTNode(this.node.children, this);
  }
}
