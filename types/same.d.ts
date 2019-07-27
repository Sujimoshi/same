import { ThunkAction as TAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { BaseNode } from "@babel/types";
import { ProjectStore } from "../src/store/project/reducers";
import { ModalStore } from "../src/store/modal/reducers";

export interface IndexedNode {
  key?: string;
  parent?: BaseNode;
}

export interface PayloadedAction<ActionType extends string, PayloadType>
  extends Action<ActionType> {
  payload?: PayloadType;
}

export interface RootStore {
  modal: ModalStore;
  project: ProjectStore;
}

export type ThunkAction<
  A extends Action = any,
  ResultType = any,
  StoreType = RootStore,
  ArgumentType = undefined
> = TAction<ResultType, StoreType, ArgumentType, A>;

export type Dictionary<V = any> = { [key: string]: V };
