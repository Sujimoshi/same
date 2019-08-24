import { ThunkAction } from "same";
import { showAddComponentModal } from "./modal";
import {
  createComponentConfig,
  ComponentType,
  createNodeConfig,
  NodeType
} from "@same/configurator";
import { join } from "path";
import { setComponents } from "@same/store/project/actions";
import { insertItem } from "@same/utils/array";

export const createComponent = (
  name?: string,
  path?: string
): ThunkAction => dispatch => {
  dispatch(
    showAddComponentModal(
      { name, path, type: path ? ComponentType.Styled : ComponentType.Pure },
      ({ name, path, tag, type }) => {
        dispatch(
          setComponents(
            insertItem(
              createComponentConfig(
                type,
                name,
                path || join(name, "index.js"),
                createNodeConfig(
                  type === ComponentType.Styled
                    ? NodeType.Style
                    : NodeType.Element,
                  tag
                )
              ),
              0
            )
          )
        );
      }
    )
  );
};
