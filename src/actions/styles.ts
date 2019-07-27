import { Node, ComponentConfig } from "@same/configurator";
import { Dictionary } from "underscore";
import { setNode } from "@same/store/project/actions";

export const setStyles = (
  component: ComponentConfig,
  node: Node,
  factory: (styles: Dictionary<any>) => Dictionary<any>
) => {
  return setNode(component, {
    ...node,
    styles: factory(node.styles || {})
  });
};
