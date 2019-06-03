import { Reducer, AnyAction } from "redux";

class ReducersManager<T> {
  public reducers: { [key: string]: Reducer<T, AnyAction> };

  constructor(public namespace: string, public initialState: T) {}

  on(type: string, handler: Reducer<T, AnyAction>) {
    this.reducers[type] = handler;
  }

  reducer = (state: T, action: AnyAction) => {
    return this.reducers[action.type]
      ? this.reducers[action.type](state, action)
      : this.initialState;
  };
}

export class SimpleReducersManager<T> extends ReducersManager<T> {
  public reducers: { [key: string]: Reducer<T, AnyAction> } = {
    [this.namespace + "_SET"]: (state, action: AnyAction) => {
      return { ...state, ...action.payload };
    },
    [this.namespace + "_RESET"]: (state, action: AnyAction) => {
      return { ...this.initialState, ...action.payload };
    }
  };
}
