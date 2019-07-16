import { Node, BaseNode } from "@babel/types";
import { generate } from "@same/parser";
import { format } from "prettier";
import { expression } from "./babel";
import uuid from "uuid/v4";
import Registry from "@same/utils/Registry";

export interface WithAdditionalFields {
  uuid?: string;
  parent?: BaseNode;
}

export default abstract class ASTNode<T extends BaseNode = BaseNode> {
  public element: HTMLElement;
  public registry: Registry<ASTNode> = this.parent
    ? this.parent.registry.register(this.key(), this)
    : new Registry({ [this.key()]: this });

  constructor(
    public node: T & WithAdditionalFields,
    public parent: ASTNode = null
  ) {}

  static createFromCode<T>(code: string): T {
    return new (this as any)(expression(code));
  }

  static mapToASTNode(array: BaseNode[], parent: ASTNode): ASTNode[] {
    return array.map(el => {
      const Type = require("./ASTRegistry").default.get(el.type) as any;
      return new Type(el, parent);
    });
  }

  code() {
    return generate(this.node as Node);
  }

  isFake(): boolean {
    return false;
  }

  detach(): this {
    this.parent.remove(this);
    return this;
  }

  after(node: ASTNode): this {
    this.parent.append(node, this);
    return this;
  }

  key() {
    if (!this.node.uuid) {
      this.node.uuid = uuid();
    }
    return this.node.uuid;
  }

  abstract title(): string;
  abstract childrens(): ASTNode[] | null;
  abstract append(node: ASTNode, after?: ASTNode): this;
  abstract remove(node: ASTNode): this;
}
