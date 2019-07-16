import { EditorStore } from "./reducers";
import { FileTypes } from "@same/parser/file";
import { traverse } from "@same/utils/tree";
import { RootStore } from "same";
import { createSelector } from "reselect";
import { Node } from "@same/parser/structure";

export const getEditor = (state: RootStore) => state.editor;

export const getFocusedNode = createSelector<RootStore, EditorStore, Node>(
  getEditor,
  editor => {
    if (!editor.focus) return null;
    if (editor.type === FileTypes.example) {
      let res = null;
      traverse(editor.exports.default.return, node => {
        if (node.id === editor.focus) res = node;
      });
      return res;
    } else {
      return Object.values(editor.exports).find(el => el.id === editor.focus);
    }
  }
);
