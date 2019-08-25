import { ThunkAction } from "same";
import { showCreateComponentModal } from "./modal";
import {
  createComponentConfig,
  ComponentType,
  createNodeConfig,
  NodeType
} from "@same/configurator";
import { join, basename } from "path";
import { setComponents } from "@same/store/project/actions";
import { insertItem, removeItems, by } from "@same/utils/array";
import { isComponentInUse } from "@same/store/project/selectors";

export const createComponent = (
  folder: string,
  type: ComponentType = ComponentType.Styled,
  name: string = type === ComponentType.Styled
    ? basename(folder)
    : basename(folder) + "Example"
): ThunkAction => dispatch => {
  dispatch(
    showCreateComponentModal(
      { name, type, tag: "div" },
      ({ name, tag, type }) => {
        const isStyled = type === ComponentType.Styled;
        const nodeType = isStyled ? NodeType.Style : NodeType.Element;

        const component = createComponentConfig(
          type,
          isStyled ? name : "default",
          isStyled ? join(folder, "index.js") : join(folder, `${name}.js`),
          createNodeConfig(nodeType, isStyled ? tag : "")
        );
        dispatch(setComponents(insertItem(component)));
      }
    )
  );
};

export const removeComponent = (id: string): ThunkAction => (
  dispatch,
  getState
) => {
  if (isComponentInUse(id)(getState())) throw new Error("Component in use");
  dispatch(setComponents(removeItems(by("id")(id))));
};
