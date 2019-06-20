import { writeFile, writeFileSync } from "fs";
import { ActionCreator } from "redux";
import { EditorStore } from "./reducers";
import { File, BaseNode } from "@babel/types";
import { ThunkCreator } from "same";
import { PayloadedAction } from "../../../types/same.d";

export enum Types {
  FOCUS_NODE = "FOCUS_NODE",
  EDITOR_SET = "EDITOR_SET",
  EDITOR_RESET = "EDITOR_RESET"
}

export type SetEditorAction = PayloadedAction<
  Types.EDITOR_SET,
  Partial<EditorStore>
>;

export const editorSet: ActionCreator<SetEditorAction> = (
  payload: Partial<EditorStore>
) => ({
  type: Types.EDITOR_SET,
  payload
});

export type ResetEditorAction = PayloadedAction<
  Types.EDITOR_RESET,
  Partial<EditorStore>
>;

export const editorReset: ActionCreator<ResetEditorAction> = (
  payload: Partial<EditorStore>
) => ({
  type: Types.EDITOR_RESET,
  payload
});

export const thunkSaveEditor: ThunkCreator<
  SetEditorAction | ResetEditorAction
> = (code?: string, filePath?: string, astFile?: File) => dispatch => {
  // dispatch(editorReset({ loading: true }));
  // writeFileSync(filePath, code);
  // , error => {
  // if (error) dispatch(editorReset({ error }));
  dispatch(editorSet({ code, filePath, astFile }));
  // });
};

export type FocusNodeAction = PayloadedAction<Types.FOCUS_NODE, BaseNode>;

export const focusNode: ActionCreator<FocusNodeAction> = (
  astNode: BaseNode
) => ({ type: Types.FOCUS_NODE, payload: astNode });
