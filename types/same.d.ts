import { EditorStore } from "../src/store/editor/reducers";
import { ThunkAction as TAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { BaseNode } from "@babel/types";
import { ProjectStore } from "../src/store/project/reducers";

export interface IndexedNode {
  key?: string;
  parent?: BaseNode;
}

export interface PayloadedAction<ActionType extends string, PayloadType>
  extends Action<ActionType> {
  payload?: PayloadType;
}

export interface RootStore {
  editor: EditorStore;
  project: ProjectStore;
}

export type ThunkAction<
  A extends Action = any,
  ResultType = any,
  StoreType = RootStore,
  ArgumentType = undefined
> = TAction<ResultType, StoreType, ArgumentType, A>;
