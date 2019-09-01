import { ThunkAction as TAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { BaseNode } from "@babel/types";
import { ProjectStore } from "@same/store/project/reducers";
import { ModalStore } from "@same/store/modal/reducers";
import { Dictionary } from "underscore";
import { EditorStore } from "@same/store/editor/reducers";

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
  modal: ModalStore;
  project: ProjectStore;
}

export type ThunkAction<
  A extends Action = any,
  ResultType = any,
  StoreType = RootStore,
  ArgumentType = undefined
> = TAction<ResultType, StoreType, ArgumentType, A>;

export type Mapper = (data: Dictionary<any>) => Dictionary<any>;
export type ArrayMapper<T> = (data: T[]) => T[];
export type ObjectMapper<T> = (data: T) => T | void;

declare global {
  var log: (exp: any) => any;
}
