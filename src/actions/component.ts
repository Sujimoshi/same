import { ThunkAction } from "same";
import { showAddFolderModal, showAddComponentModal } from "./modal";
import {
  createComponentConfig,
  ComponentType,
  createNodeConfig,
  NodeType
} from "@same/configurator";
import { join } from "path";
import { setComponents } from "@same/store/project/actions";
import { capitalize } from "@same/utils/helpers";

export const createComponent = (): ThunkAction => dispatch => {
  dispatch(
    showAddComponentModal(({ name, tag }) => {
      const folder = capitalize(name);
      const styledComponent = createComponentConfig(
        ComponentType.Styled,
        folder,
        join(folder, "index.js"),
        createNodeConfig(NodeType.Style, tag)
      );
      const pureComponent = createComponentConfig(
        ComponentType.Pure,
        "default",
        join(folder, "index.js"),
        createNodeConfig(NodeType.Element, folder, "", styledComponent.id)
      );
      dispatch(setComponents([styledComponent, pureComponent]));
    })
  );
};
