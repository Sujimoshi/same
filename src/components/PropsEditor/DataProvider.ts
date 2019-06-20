import Registry from "@same/utils/Registry";
import { JSXElement, BaseNode } from "@babel/types";
import { WithAdditionalFields } from "../../parser/ASTNode";

interface IPropsDataProvider<T extends BaseNode = BaseNode> {
  attributes(node: T): any[];
  name(node: T, name?: string): string;
  value(node: T, value?: string): string;
  key(node: T): string;
}

class PropsDataProviderRegistry implements IPropsDataProvider {
  public registry = new Registry<IPropsDataProvider>();

  register<T extends BaseNode>(name: string, provider: IPropsDataProvider<T>) {
    this.registry.register(name, provider);
    return this;
  }

  provider<T extends BaseNode>(node: T) {
    return this.registry.get(node.type);
  }

  attributes<T extends BaseNode>(node: T) {
    return this.provider(node).attributes(node);
  }

  name<T extends BaseNode>(node: T, name?: string): string {
    return this.provider(node).name(node, name);
  }

  value<T extends BaseNode>(node: T, value?: string): string {
    return this.provider(node).value(node, value);
  }

  key<T extends BaseNode>(node: T): string {
    return this.provider(node).key(node);
  }
}

const registry = new PropsDataProviderRegistry();
export default registry;

registry.register<JSXElement & WithAdditionalFields>("JSXElement", {
  attributes(node) {
    return node.openingElement.attributes;
  },
  name(node, name?) {
    const nameNode = node.openingElement.name;
    if (name) {
      if (nameNode.type === "JSXIdentifier") {
        nameNode.name = name;
        return nameNode.name;
      } else {
        throw new Error(`Type JSXMemberExpression is not supported`);
      }
    } else {
      if (nameNode.type === "JSXIdentifier") {
        return nameNode.name;
      } else {
        throw new Error(`Type JSXMemberExpression is not supported`);
      }
    }
  },
  value(node, value?) {
    throw new Error(`JSXElement have no value`);
  },
  key(node) {
    return node.uuid;
  }
});
