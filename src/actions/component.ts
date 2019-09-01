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
import {
  insertItem,
  removeItems,
  by,
  mapItems,
  replaceItem,
  assignItem
} from "@same/utils/array";
import { isComponentInUse } from "@same/store/project/selectors";
import { Folder } from "@same/store/project/reducers";

export const createComponent = (
  folder: Folder,
  type: ComponentType = ComponentType.Styled,
  name: string = type === ComponentType.Styled
    ? folder.name
    : folder.name + "Example"
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
          folder.id,
          isStyled ? "index.js" : `${name}.js`,
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

export const moveComponent = (componentId: string, folderId: string) => {
  return setComponents(assignItem(by("id")(componentId), { folder: folderId }));
};
