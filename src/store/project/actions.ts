import { PayloadedAction } from "same";
import { ProjectStore } from "./reducers";
import { SameConfig } from "@same/parser";

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

export type AddComponentAction = PayloadedAction<"ADD_COMPONENT", SameConfig>;

export const addComponent = (config: SameConfig): AddComponentAction => ({
  type: "ADD_COMPONENT",
  payload: config
});
