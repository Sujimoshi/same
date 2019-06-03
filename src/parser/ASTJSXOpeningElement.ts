import ASTNode from "./ASTNode";
import { JSXOpeningElement } from "@babel/types";
import ASTJSXAttribute from "./ASTJSXAttribute";

export default class ASTJSXOpeningElement extends ASTNode<JSXOpeningElement> {
  remove(node: ASTNode): this {
    const removeIndex = this.node.attributes.findIndex(el => el === node.node);
    this.node.attributes.splice(removeIndex, 1);
    return this;
  }

  append(node: ASTNode, after: ASTNode): this {
    throw new Error("Can't be implemented for JSXOpeningElement");
  }

  name() {
    const Type = require("./ASTRegistry").default.get(
      this.node.name.type
    ) as any;
    return new Type(this.node.name);
  }

  title(): string {
    return this.name().title();
  }

  addAttribute(key: string, value: string) {
    this.node.attributes.push(ASTJSXAttribute.create(key, value).node);
  }

  attributes(): ASTJSXAttribute[] {
    return ASTJSXOpeningElement.mapToASTNode(
      this.node.attributes,
      this
    ) as ASTJSXAttribute[];
  }

  childrens(): ASTNode[] | null {
    return [];
  }
}
