import { createReducer, InferActionTypes } from "@same/utils/reducer";
import * as actions from "./actions";
import { Dictionary } from "underscore";

export interface ModalStore {
  identifier: string;
  data: Dictionary<any>;
}

export const initialState: ModalStore = {
  identifier: "",
  data: null
};

type Actions = InferActionTypes<typeof actions>;

export default createReducer<Actions, ModalStore>(initialState, {
  SHOW_MODAL: (state, { identifier, data }) => ({
    ...state,
    identifier,
    data
  }),
  CLOSE_MODAL: () => ({ ...initialState })
});
