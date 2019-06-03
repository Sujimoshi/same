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
