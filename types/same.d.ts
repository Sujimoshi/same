import { EditorStore } from "../src/store/editor/reducers";
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";

export interface PayloadedAction<ActionType extends string, PayloadType>
  extends Action<ActionType> {
  payload?: PayloadType;
}

export interface RootStore {
  editor: EditorStore;
}

export type ThunkCreator<
  A extends Action,
  ResultType = any,
  StoreType = RootStore,
  ArgumentType = undefined
> = (...args: any) => ThunkAction<ResultType, StoreType, ArgumentType, A>;
