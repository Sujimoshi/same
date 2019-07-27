import { Node, ComponentConfig } from "@same/configurator";
import { Dictionary } from "underscore";
import { setNode } from "@same/store/project/actions";

export const setStyles = (
  component: ComponentConfig,
  node: Node,
  field: string = "",
  factory: (styles: Dictionary<any>) => Dictionary<any>
) => {
  if (field) {
    let value = factory(node.styles[field] || {});
    return setNode(component, {
      ...node,
      styles: {
        ...node.styles,
        [field]: value
      }
    });
  } else {
    let value = factory(node.styles || {});
    return setNode(component, {
      ...node,
      styles: value
    });
  }
};
