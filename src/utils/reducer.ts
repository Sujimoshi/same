import { Action, Reducer, AnyAction, ActionCreator } from "redux";

export type InferActionTypes<T> = T extends { [key: string]: infer U }
  ? U extends ActionCreator<any>
    ? ReturnType<U> extends Action<any>
      ? ReturnType<U>
      : never
    : never
  : never;

type Reducers<S, A extends Action> = {
  [T in A["type"]]: Reducer<Readonly<S>, A extends Action<T> ? A : never>
};

export const createReducer = <S, A extends Action = AnyAction>(
  initialState: S,
  handlers: Reducers<S, A>
): Reducer<S> => {
  return (state, action) => {
    const handler = (handlers as any)[action.type];
    return handler ? handler(state, action) : initialState;
  };
};
