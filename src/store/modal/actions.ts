import { Action } from "redux";

export interface ShowModalAction extends Action<"SHOW_MODAL"> {
  identifier: string;
  data: any;
}

export const showModal = (identifier: string, data: any): ShowModalAction => ({
  type: "SHOW_MODAL",
  identifier,
  data
});

export type CloseModalAction = Action<"CLOSE_MODAL">;

export const closeModal = (): CloseModalAction => ({ type: "CLOSE_MODAL" });
