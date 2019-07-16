import { createReducer, InferActionTypes } from "../../utils/reducer";
import { JSXElement, JSXText } from "@babel/types";
import * as actions from "./actions";
import {
  Exports,
  StatelessComponent,
  Exportable,
  Node
} from "@same/parser/structure";
import { FileTypes } from "@same/parser/file";
import { produce } from "immer";
import _ from "underscore";
import { traverse } from "@same/utils/tree";

export type FocusableNode = JSXElement | JSXText;

export interface EditorStore {
  type: FileTypes;
  code: string;
  file: string;
  exports: Exports;
  id: string;
  focus: string;
}

export const initialState: EditorStore = {
  exports: null,
  code: "",
  file: "",
  focus: "",
  type: null,
  id: ""
};

type Actions = InferActionTypes<typeof actions>;

export default createReducer<Actions, EditorStore>(initialState, {
  EDITOR_RESET: (_, { payload }) => {
    return {
      ...initialState,
      ...payload
    };
  },
  EDITOR_SET: (state, { payload }) => ({
    ...state,
    ...payload
  }),
  REMOVE_NODE: (state, { payload }) => {
    return produce(state, draft => {
      traverse(draft.exports.default.return, (node, parent) => {
        if (node.id === payload.id) {
          parent.children = parent.children.filter(el => el.id !== payload.id);
        }
      });
    });
  },
  INSERT_NODE: (state, { payload: { node, to, index } }) => {
    return produce(state, draft => {
      traverse(draft.exports.default.return, el => {
        if (to.id === el.id) {
          return el.children.splice(index, 0, node);
        }
      });
    });
  },
  PLACE_NODE: (state, { payload: { node, beforeOrAfter, that } }) => {
    return produce(state, draft => {
      traverse(draft.exports.default.return, (el, parent, i) => {
        if (that.id === el.id) {
          const index = beforeOrAfter === "after" ? i + 1 : i;
          return parent.children.splice(index, 0, node);
        }
      });
    });
  },
  SET_NODE: (state, { payload }) => {
    return produce(state, draft => {
      if (state.type === FileTypes.example) {
        traverse(draft.exports.default.return, (node, parent, i) => {
          if (node.id === payload.id) {
            if (!parent) draft.exports.default.return = { ...node, ...payload };
            else parent.children[i] = node;
          }
        });
      }
    });
  },
  SET_EXPORT: (state, { payload }) => ({
    ...state,
    exports: {
      ...state.exports,
      [payload.name]: payload
    }
  })
});
