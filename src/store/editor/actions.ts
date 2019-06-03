import { PayloadedAction } from "../common";
import { writeFile, writeFileSync } from "fs";
import { Dispatch } from "redux";
import { EditorStore } from "./reducers";
import ASTNode from "@same/parser/ASTNode";
import ASTFile from "../../parser/ASTFile";

const editorSet = (payload: Partial<EditorStore>) => ({
  type: "EDITOR_SET",
  payload
});

const editorReset = (payload: Partial<EditorStore>) => ({
  type: "EDITOR_RESET",
  payload
});

export const thunkSaveEditor = (
  code: string,
  filePath: string,
  astFile: ASTFile
) => (dispatch: Dispatch<PayloadedAction<string, EditorStore>>) => {
  // dispatch(editorReset({ loading: true }));
  // writeFileSync(filePath, code);
  // , error => {
  // if (error) dispatch(editorReset({ error }));
  dispatch(editorSet({ code, filePath, astFile }));
  // });
};

export const focusNode = (focusedNode: ASTNode) => (
  dispatch: Dispatch<PayloadedAction<string, EditorStore>>
) => {
  dispatch(editorSet({ focusedNode }));
};
