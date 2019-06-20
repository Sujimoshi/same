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

  get name() {
    return "text";
  }

  set name(val: string) {}

  get value() {
    return this.node.value.replace(/^\n| $/gm, "");
  }

  set value(val: string) {
    this.node.value = val;
  }

  childrens(): ASTNode[] | null {
    return [];
  }

  attributes(): [{ name: string; value: string }] {
    return [{ name: "text", value: this.value }];
  }

  isFake() {
    return !this.node.value.replace(/\n| /gm, "");
  }
}
