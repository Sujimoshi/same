import { PayloadedAction } from "same";
import { ProjectStore } from "./reducers";
import { ComponentConfig, Node } from "@same/configurator";
import { Action } from "redux";

export type SetProjectAction = PayloadedAction<
  "PROJECT_SET",
  Partial<ProjectStore>
>;

export const projectSet = (
  payload: Partial<ProjectStore>
): SetProjectAction => ({
  type: "PROJECT_SET",
  payload
});

export type ResetProjectAction = PayloadedAction<
  "PROJECT_RESET",
  Partial<ProjectStore>
>;

export const projectReset = (
  payload: Partial<ProjectStore>
): ResetProjectAction => ({
  type: "PROJECT_RESET",
  payload
});

export type AddComponentAction = PayloadedAction<
  "SET_COMPONENTS",
  ComponentConfig | ComponentConfig[]
>;

export const setComponents = (
  config: ComponentConfig | ComponentConfig[]
): AddComponentAction => ({
  type: "SET_COMPONENTS",
  payload: config
});

export interface SetNodeAction extends Action<"SET_NODE"> {
  node: Node;
  component: ComponentConfig;
}

export const setNode = (
  component: ComponentConfig,
  node: Node
): SetNodeAction => ({
  type: "SET_NODE",
  node,
  component
});

export interface RemoveNodeAction extends Action<"REMOVE_NODE"> {
  component: ComponentConfig;
  node: Node;
}

export const removeNode = (
  component: ComponentConfig,
  node: Node
): RemoveNodeAction => ({
  type: "REMOVE_NODE",
  component,
  node
});

export interface InsertNodeAction extends Action<"INSERT_NODE"> {
  component: ComponentConfig;
  node: Node;
  to: Node;
  index: number;
}

export const insertNode = (
  component: ComponentConfig,
  node: Node,
  to: Node,
  index: number = 0
): InsertNodeAction => ({
  type: "INSERT_NODE",
  component,
  node,
  to,
  index
});

export interface PlaceNodeAction extends Action<"PLACE_NODE"> {
  component: ComponentConfig;
  node: Node;
  that: Node;
  beforeOrAfter: string;
}

export const placeNode = (
  component: ComponentConfig,
  node: Node,
  that: Node,
  beforeOrAfter: string = "after"
): PlaceNodeAction => ({
  type: "PLACE_NODE",
  component,
  node,
  that,
  beforeOrAfter
});
