import { createReducer, InferActionTypes } from "@same/utils/reducer";
import * as actions from "./actions";
import { SameConfig } from "@same/parser";

export interface ProjectStore {
  path: string;
  components: SameConfig[];
}

export const initialState: ProjectStore = {
  path: "",
  components: []
};

type Actions = InferActionTypes<typeof actions>;

export default createReducer<Actions, ProjectStore>(initialState, {
  PROJECT_RESET: (_, { payload }) => ({
    ...initialState,
    ...payload
  }),
  PROJECT_SET: (state, { payload }) => ({
    ...state,
    ...payload
  }),
  ADD_COMPONENT: (state, { payload }) => ({
    ...state,
    components: [...state.components, payload]
  })
});
