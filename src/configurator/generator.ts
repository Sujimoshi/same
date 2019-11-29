import {
  ComponentConfig,
  ComponentType,
  NodeType,
  Node
} from "@same/configurator";
import { Dictionary, map, isEmpty } from "underscore";
import { format } from "prettier";

export const generateComponent = (
  component: ComponentConfig[] | ComponentConfig,
  allComponents: Dictionary<ComponentConfig>
): string => {
  const components = Array.isArray(component) ? component : [component];
  const res = `
    ${components
      .map(component => generateImports(component, allComponents))
      .join("\n")}

    ${components.map(generateExport).join("\n")}
  `;
  try {
    return format(res, { parser: "babel" });
  } catch (e) {
    // console.log(e, res);
    return res;
  }
};

export const generateImports = (
  component: ComponentConfig,
  allComponents: Dictionary<ComponentConfig>
) => {
  switch (component.type) {
    case ComponentType.Styled: {
      return `import styled from "@emotion/styled";`;
    }
    case ComponentType.Pure: {
      const imports = generateNodeImport(
        component,
        component.node,
        allComponents
      )
        .split(";")
        .map(el => el.trim());
      return `import * as React from "react";${[...new Set(imports)].join(
        ";"
      )}`;
    }
    default: {
      throw new Error("Unknown component type");
    }
  }
};

export const generateNodeImport = (
  component: ComponentConfig,
  node: Node,
  allComponents: Dictionary<ComponentConfig>
) => {
  if (!node || !node.ref) return "";
  const ref = allComponents[node.ref];
  const importName = generateImportName(ref.name, node.tag);
  const childrenImports: string = node.children
    .map(el => generateNodeImport(component, el, allComponents))
    .join("");
  if (component.path === ref.path) {
    return childrenImports;
  } else {
    return `import ${importName} from "${generateRelativePath(
      component.path,
      ref.path
    )}"; ${childrenImports}`;
  }
};

export const generateRelativePath = (from: string, to: string) => {
  const relativePath = (from: string, to: string) => {
    to = pathIntersection(from, to);
    const toSlashesNumber = (to.match(/\//g) || []).length;
    const fromSlashesNumber = (from.match(/\//g) || []).length;
    const upString =
      toSlashesNumber > 0
        ? new Array(fromSlashesNumber).fill("../").join("")
        : "./";
    return upString + to;
  };

  const pathIntersection = (first: string, second: string) => {
    const firstSegments = first.split("/");
    const secondSegments = second.split("/");
    let stop = false;
    return secondSegments
      .filter((segment, i) => {
        return stop || segment !== firstSegments[i] ? (stop = true) : false;
      })
      .join("/");
  };

  return relativePath(from, to);
};

export const generateImportName = (name: string, alias: string) => {
  const named = name === alias ? `{ ${name} }` : `{ ${name} as ${alias} }`;
  return name === "default" ? alias : named;
};

export const generateExport = (component: ComponentConfig) => {
  switch (component.type) {
    case ComponentType.Styled: {
      return generateStyledComponent(component);
    }
    case ComponentType.Pure: {
      return generatePureComponent(component);
    }
    default: {
      throw new Error("Unknown component type");
    }
  }
};

export const generateStyledComponent = ({ node, name }: ComponentConfig) => {
  return `${generateComponentExport(name)} ${generateNode(node)}`;
};

export const generatePureComponent = ({ name, node }: ComponentConfig) => {
  return `
    ${generateComponentExport(name)} function Example() { 
      return (${generateNode(node)});
    }
  `;
};

export const generateNode = (node: Node): string => {
  switch (node.type) {
    case NodeType.Element: {
      return `<${node.tag} ${generateProps(node.props, node.styles)}>
        ${node.children.map(generateNode).join("\n")}
      </${node.tag}>`;
    }
    case NodeType.Style: {
      const styled = generateObjectFields(node.styles);
      return `styled.${node.tag}(props => ({
        ${styled ? styled + "," : ""}
        ...props.styled
      }))`;
    }
    case NodeType.Text: {
      return node.value;
    }
    default: {
      throw new Error("Unknown node type");
    }
  }
};

export const generateComponentExport = (name: string) => {
  return name === "default" ? "export default" : `export const ${name} =`;
};

export const generateProps = (
  props: Dictionary<any>,
  styled: Dictionary<any>
) => {
  const entries = Object.entries(props);
  if (Object.entries(styled).length) entries.push(["styled", styled]);
  return entries
    .map(([name, value]) => {
      let val = JSON.stringify(value);
      val = typeof value !== "string" ? `{${val}}` : val;
      return `${name}=${val}`;
    })
    .join(" ");
};

export const generateObjectFields = (obj: Dictionary<any>): string => {
  return Object.entries(obj)
    .sort(([, valA], [, valB]) => {
      const typeA = typeof valA;
      const typeB = typeof valB;
      return typeA === typeB ? 0 : typeA === "object" ? 1 : -1;
    })
    .map(([key, val]) => {
      if (typeof val === "object") {
        if (isEmpty(val)) return "";
        if (/^(&:).+/.test(key)) {
          return `"${key}": {
          ${generateObjectFields(val)}
        }`;
        }
        if (/^\?.+/.test(key)) {
          return `...(props.${key.replace("?", "")} && {
          ${generateObjectFields(val)}
        })`;
        }
      }
      return `"${key}": ${JSON.stringify(val)}`;
    })
    .filter(Boolean)
    .join(",");
};
