import { readFileSync } from "fs";
import { parse as parser } from "./babel";
import uuid from "uuid/v4";
import { createFile, FileTypes, File } from "./file";
import {
  StyledComponent,
  StatelessComponent,
  Exportable,
  Node,
  Element,
  Props,
  TextNode
} from "./structure";
import { ExpressionType } from "@same/parser/structure";
import { format } from "prettier";

export const parseFile = (path: string) => {
  return parser(readFileSync(path).toString());
};

export const parse = parser;

export interface SameConfig {
  name: string;
  id: string;
  main: File;
  examples: File[];
}

export const createConfig = (name: string): SameConfig => ({
  name,
  id: uuid(),
  main: createFile("index.js", FileTypes.styled),
  examples: [createFile("default.js", FileTypes.example)]
});

export const generate = (config: File) => {
  return format(
    Object.values(config.exports)
      .map(exp => generateExport(exp))
      .join("\n")
  );
};

export const generateExport = (exp: Exportable) => {
  if (exp.type === ExpressionType.StatelessComponent) {
    const component = exp as StatelessComponent;
    return `export default ${generateStatelessComponent(component)}`;
  } else if (exp.type === ExpressionType.StyledComponent) {
    const component = exp as StyledComponent;
    return `
      export const ${component.name} = ${generateStyledComponent(component)};
    `;
  } else {
    throw new Error("Unknown export type");
  }
};

export const generateStyledComponent = (component: StyledComponent) => {
  return `styled.${component.tag}(props => ({
    ${Object.entries(component.props)
      .map(([key, val]) => `"${key}": ${JSON.stringify(val)}`)
      .join(",\n")},
    ...props.styled
  }))`;
};

export const generateStatelessComponent = (component: StatelessComponent) => {
  return `function ${component.name} () { 
    return (${generateNode(component.return)});
  }`;
};

export const generateNode = (node: Node): string => {
  if (node.type === ExpressionType.Element) {
    const element = node as Element;
    return `<${element.tag} ${generateProps(element.props)}>
      ${element.children.map(generateNode).join("\n")}
    </${element.tag}>`;
  } else if (node.type === ExpressionType.TextNode) {
    return (node as TextNode).value;
  } else {
    throw new Error("Unknown node type");
  }
};

export const generateProps = (props: Props) => {
  return Object.entries(props)
    .map(([name, value]) => `${name}=${JSON.stringify(value)}`)
    .join(" ");
};
