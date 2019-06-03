import ASTJSXElement from "@same/parser/ASTJSXElement";
import React, { ReactNode } from "react";
import ASTNode from "@same/parser/ASTNode";

export interface Props {
  ast: ASTJSXElement;
  filePath?: string;
}

export const component = (ast: ASTNode): any => {
  if (!(ast instanceof ASTJSXElement)) return ast.title();
  const attributes: { [key: string]: string } = ast
    .attributes()
    .reduce((tmp, el) => ({ ...tmp, ...el.json() }), {});
  attributes["data-astkey"] = ast.key();
  const childrens = ast.childrens().map(el => component(el));
  return React.createElement(ast.tag(), attributes, ...childrens);
};

export default function ASTRenderer({ ast, filePath }: Props) {
  return component(ast);
}
