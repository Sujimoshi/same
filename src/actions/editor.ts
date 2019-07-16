import { editorReset, editorSet, setNode } from "@same/store/editor/actions";
import { readFileSync } from "fs";
import { ThunkAction } from "same";
import { join } from "path";
import { File } from "@same/parser/file";
import { Node, Props } from "@same/parser/structure";

export const openFile = (
  filePath: string,
  config: File,
  focus?: string
): ThunkAction => (dispatch, getState) => {
  const { project } = getState();
  const path = join(project.path, filePath);
  const code = readFileSync(path).toString();
  dispatch(
    editorReset({
      file: config.file,
      type: config.type,
      id: config.id,
      focus,
      code,
      exports: config.exports
    })
  );
};

export const focusNode = (node: string | Node) =>
  editorSet({ focus: typeof node === "string" ? node : node.id });

export const setProps = (node: Node, props: Props) => {
  Object.entries(props).forEach(([key, val]) => {
    if (val === undefined) {
      delete node.props[key];
      delete props[key];
    }
  });
  return setNode({ ...node, props: { ...node.props, ...props } });
};
