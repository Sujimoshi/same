import { Node, ComponentConfig } from "@same/configurator";
import { Dictionary } from "underscore";
import { setNode } from "@same/store/project/actions";
import { ThunkAction } from "same";
import {
  getFocusedComponent,
  getFocusedNode
} from "@same/store/editor/selectors";
import { setFieldValue, removeField } from "@same/utils/field";

export const setStyles = (
  component: ComponentConfig,
  node: Node,
  factory: (styles: Dictionary<any>) => Dictionary<any>
) => {
  return setNode(component, {
    ...node,
    styles: factory(node.styles || {})
  });
};

export const setFocusedNodeStyle = (
  field: string,
  value: string
): ThunkAction => (dispatch, getState) => {
  const component = getFocusedComponent(getState());
  const node = getFocusedNode(getState());
  dispatch(
    setStyles(
      component,
      node,
      value ? setFieldValue(field, value) : removeField(field)
    )
  );
};
