import { Action } from "redux";

export interface PayloadedAction<A, P> extends Action<A> {
  paylod?: P;
}
