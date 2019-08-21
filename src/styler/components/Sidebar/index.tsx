import React from "react";
import { setStyles } from "@same/actions/styles";
import { RootStore } from "same";
import { Node, ComponentConfig } from "@same/configurator";
import { connect } from "react-redux";
import { getComponents } from "@same/store/project/selectors";
import { setFieldValue, removeField } from "@same/utils/field";
import { Dictionary } from "underscore";
import LayoutGroup from "../LayoutGroup";
import {
  getFocusedComponent,
  getFocusedNode
} from "@same/store/editor/selectors";
import SizeGroup from "../SizeGroup";
import SpacingGroup from "../SpacingGroup";
import BorderGroup from "../BorderGroup";
import PositioningGroup from "../PositioningGroup";
import TypographyGroup from "../TypographyGroup";
import { Scrollable } from "@same/styled/Scrollable";
import ColorPicker from "../ColorPicker";

export interface Props {
  node: Node;
  component: ComponentConfig;
  components: Dictionary<ComponentConfig>;
  setStyles: typeof setStyles;
}

export function StylesEditor({
  node,
  setStyles,
  component,
  components
}: Props) {
  if (!node) return <span>Focus node first...</span>;
  const setStyle = (field: string) => (val: string) => {
    setStyles(
      component,
      node,
      val ? setFieldValue(field, val) : removeField(field)
    );
  };

  const styles = {
    ...(node.ref && components[node.ref].node.styles),
    ...node.styles
  };

  return (
    <Scrollable>
      <PositioningGroup />
      <LayoutGroup styles={styles} setStyle={setStyle} />
      <SizeGroup styles={styles} setStyle={setStyle} />
      <SpacingGroup styles={styles} setStyle={setStyle} />
      <BorderGroup styles={styles} setStyle={setStyle} />
      <TypographyGroup />
    </Scrollable>
  );
}

export default connect(
  (state: RootStore) => ({
    component: getFocusedComponent(state),
    node: getFocusedNode(state),
    components: getComponents(state)
  }),
  {
    setStyles
  }
)(StylesEditor);
