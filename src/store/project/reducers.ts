import { createReducer, InferActionTypes } from "@same/utils/reducer";
import * as actions from "./actions";
import { ComponentConfig, ComponentType } from "@same/configurator";
import { indexBy } from "underscore";
import produce from "immer";
import { traverse } from "@same/utils/helpers";

export interface ProjectStore {
  path: string;
  components: { [id: string]: ComponentConfig };
}

export const initialState: ProjectStore = {
  path: "",
  components: null
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
  SET_COMPONENTS: (state, { payload }) => ({
    ...state,
    components: {
      ...state.components,
      ...indexBy(Array.isArray(payload) ? payload : [payload], "id")
    }
  }),
  SET_NODE: (state, { node, component }) => {
    return produce(state, draft => {
      const draftComponent = draft.components[component.id];
      if (draftComponent.type === ComponentType.Pure) {
        traverse(draftComponent.node, (el, parent, i) => {
          if (el.id === node.id) {
            if (!parent) draftComponent.node = { ...el, ...node };
            else parent.children[i] = { ...el, ...node };
          }
        });
      } else {
        draftComponent.node = { ...draftComponent.node, ...node };
      }
    });
  },
  REMOVE_NODE: (state, { component, node }) => {
    return produce(state, draft => {
      const draftComponent = draft.components[component.id];
      traverse(draftComponent.node, (el, parent) => {
        if (el.id === node.id) {
          parent.children = parent.children.filter(
            element => element.id !== node.id
          );
        }
      });
    });
  },
  INSERT_NODE: (state, { component, node, to, index }) => {
    return produce(state, draft => {
      const draftComponent = draft.components[component.id];
      traverse(draftComponent.node, el => {
        if (to.id === el.id) {
          return el.children.splice(index, 0, node);
        }
      });
    });
  },
  PLACE_NODE: (state, { component, node, beforeOrAfter, that }) => {
    return produce(state, draft => {
      const draftComponent = draft.components[component.id];
      traverse(draftComponent.node, (el, parent, i) => {
        if (that.id === el.id) {
          const index = beforeOrAfter === "after" ? i + 1 : i;
          return parent.children.splice(index, 0, node);
        }
      });
    });
  }
});
