import { Node } from "@babel/types";
import generator from "@babel/generator";
import { format } from "prettier";
import {
  parse as babelParse,
  parseExpression as babelParseExpression,
  ParserPlugin
} from "@babel/parser";

export const expression = (
  code: string,
  plugins: ParserPlugin[] = ["jsx", "typescript"]
) => {
  return babelParseExpression(code, { plugins });
};

export const parse = (
  code: string,
  plugins: ParserPlugin[] = ["jsx", "typescript"]
) => {
  return babelParse(code, {
    plugins,
    sourceType: "unambiguous"
  });
};

const formatNewlines = (code: string) => {
  return code
    .replace(/^\n/gm, "")
    .replace(/^(?! |import).*(;|})$/gm, match => match + "\n") // newline after all root expressions ends
    .replace(/^import .* from ".*";$/gms, match => match + "\n"); // newline after imports
};

export const generate = (ast: Node) => {
  return format(formatNewlines(generator(ast).code));
};
