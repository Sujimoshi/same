import { PayloadedAction } from "same";
import { EditorStore } from "./reducers";

export type SetEditorAction = PayloadedAction<
  "EDITOR_SET",
  Partial<EditorStore>
>;

export const editorSet = (payload: Partial<EditorStore>): SetEditorAction => ({
  type: "EDITOR_SET",
  payload
});

export type ResetEditorAction = PayloadedAction<
  "EDITOR_RESET",
  Partial<EditorStore>
>;

export const editorReset = (
  payload: Partial<EditorStore>
): ResetEditorAction => ({
  type: "EDITOR_RESET",
  payload
});
