import { writeFile, writeFileSync } from "fs";
import { EditorStore, FocusableNode } from "./reducers";
import { File } from "@babel/types";
import { ThunkAction } from "same";
import { PayloadedAction } from "../../../types/same.d";
import { generate } from "@same/parser";
import { Exportable, Node } from "@same/parser/structure";

export enum Types {
  EDITOR_SET = "EDITOR_SET",
  EDITOR_RESET = "EDITOR_RESET"
}

export type SetEditorAction = PayloadedAction<
  Types.EDITOR_SET,
  Partial<EditorStore>
>;

export const editorSet = (payload: Partial<EditorStore>): SetEditorAction => ({
  type: Types.EDITOR_SET,
  payload
});

export type ResetEditorAction = PayloadedAction<
  Types.EDITOR_RESET,
  Partial<EditorStore>
>;

export const editorReset = (
  payload: Partial<EditorStore>
): ResetEditorAction => ({
  type: Types.EDITOR_RESET,
  payload
});

export type RemoveNodeAction = PayloadedAction<"REMOVE_NODE", Node>;

export const removeNode = (node: Node): RemoveNodeAction => ({
  type: "REMOVE_NODE",
  payload: node
});

export type InsertNodeAction = PayloadedAction<
  "INSERT_NODE",
  { node: Node; to: Node; index: number }
>;

export const insertNode = (
  node: Node,
  to: Node,
  index: number = 0
): InsertNodeAction => ({
  type: "INSERT_NODE",
  payload: { node, to, index }
});

export type PlaceNodeAction = PayloadedAction<
  "PLACE_NODE",
  { node: Node; that: Node; beforeOrAfter: string }
>;

export const placeNode = (
  node: Node,
  that: Node,
  beforeOrAfter: string = "after"
): PlaceNodeAction => ({
  type: "PLACE_NODE",
  payload: { node, that, beforeOrAfter }
});

export type SetNodeAction = PayloadedAction<"SET_NODE", Node>;

export const setNode = (node: Node): SetNodeAction => ({
  type: "SET_NODE",
  payload: node
});

export type SetExportAction = PayloadedAction<"SET_EXPORT", Exportable>;

export const setExport = (exp: Exportable): SetExportAction => ({
  type: "SET_EXPORT",
  payload: exp
});
