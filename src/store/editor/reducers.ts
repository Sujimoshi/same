import { createReducer, InferActionTypes } from "@same/utils/reducer";
import * as actions from "./actions";

export interface EditorStore {
  focusedElement: HTMLElement;
  hoveredNode: string;
  focusedComponent: string;
  focusedNode: string;
}

export const initialState: EditorStore = {
  focusedElement: null,
  hoveredNode: "",
  focusedComponent: "",
  focusedNode: ""
};

type Actions = InferActionTypes<typeof actions>;

export default createReducer<Actions, EditorStore>(initialState, {
  EDITOR_RESET: (_, { payload }) => ({
    ...initialState,
    ...payload
  }),
  EDITOR_SET: (state, { payload }) => ({
    ...state,
    ...payload
  })
});
