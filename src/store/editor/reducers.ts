import { readFileSync } from "fs";
import {
  createReducer,
  InferTypeValues,
  InferActionTypes
} from "../../utils/reducer";
import { parse } from "@same/parser/babel";
import { File, BaseNode } from "@babel/types";
// import {
//   FocusNodeAction,
//   ResetEditorAction,
//   SetEditorAction
// } from "@same/store/editor/actions";
import * as actions from "./actions";
import { ActionCreator, Action } from "redux";

export interface EditorStore {
  code?: string;
  loading?: boolean;
  error?: Error;
  filePath?: string;
  focusedNode?: BaseNode;
  astFile?: File;
}

const FILE = "/Users/sujimoshi/Projects/same/front/example/Link/index.tsx";

export const initialState: EditorStore = {
  loading: false,
  error: null,
  code: readFileSync(FILE).toString(),
  filePath: FILE,
  astFile: parse(readFileSync(FILE).toString()),
  focusedNode: null
};

export default createReducer<EditorStore, InferActionTypes<typeof actions>>(
  initialState,
  {
    FOCUS_NODE: (state, { payload }) => ({
      ...state,
      focusedNode: payload
    }),
    EDITOR_RESET: (_, { payload }) => ({
      ...initialState,
      ...payload
    }),
    EDITOR_SET: (state, { payload }) => ({
      ...state,
      ...payload
    })
  }
);
