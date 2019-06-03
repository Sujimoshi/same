import { createSourceFile, ScriptTarget } from "typescript";

export const parse = (code: string) => {
  return createSourceFile(
    "",
    code,
    ScriptTarget.Latest,
    /** SetParentNodes */ true
  );
};
