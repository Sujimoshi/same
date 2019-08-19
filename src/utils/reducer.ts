import { Action, Reducer, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

export type InferActionTypes<T> = T extends { [key: string]: infer U }
  ? U extends (...args: any[]) => infer R
    ? R extends Action
      ? R
      : R extends ThunkAction<any, any, any, infer L>
      ? L
      : never
    : never
  : never;

type Reducers<S, A extends Action> = {
  [T in A["type"]]: Reducer<S, A extends Action<T> ? A : never>;
};

export const createReducer = <A extends Action, S>(
  initialState: S,
  handlers: Reducers<S, A>
): Reducer<S> => {
  return (state = initialState, action) => {
    const handler = (handlers as any)[action.type];
    return handler ? handler(state, action) : state;
  };
};
