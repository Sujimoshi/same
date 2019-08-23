import { PayloadedAction, ArrayMapper } from "same";
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

export interface SetComponentsAction extends Action<"SET_COMPONENTS"> {
  mapper: ArrayMapper<ComponentConfig>;
}

export const setComponents = (
  mapper: ArrayMapper<ComponentConfig>
): SetComponentsAction => ({
  type: "SET_COMPONENTS",
  mapper
});

export interface SetFoldersAction extends Action<"SET_FOLDERS"> {
  mapper: ArrayMapper<string>;
}

export const setFolders = (mapper: ArrayMapper<string>): SetFoldersAction => ({
  type: "SET_FOLDERS",
  mapper
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
