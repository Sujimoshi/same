import React from "react";
import { Dictionary } from "underscore";
import Group from "../Group";
import EditorRow from "../EditorRow";
import { connect } from "react-redux";
import { getFocusedNodeStyles } from "@same/store/editor/selectors";
import { RootStore } from "same";
import { setFocusedNodeStyle } from "@same/actions/styles";
import ColorInput from "../ColorInput";

export interface Props {
  styles: Dictionary<any>;
  setStyleField: (field: string, value: string) => any;
}

export function BackgroundGroup({ styles, setStyleField }: Props) {
  const setStyle = (field: string) => (value: string) =>
    setStyleField(field, value);

  return (
    <Group title="Backgrounds">
      <EditorRow field="backgroundColor" title="Color">
        <ColorInput
          value={styles.backgroundColor || ""}
          onChange={setStyle("backgroundColor")}
        />
      </EditorRow>
    </Group>
  );
}

export default connect(
  (state: RootStore) => ({
    styles: getFocusedNodeStyles(state)
  }),
  {
    setStyleField: setFocusedNodeStyle
  }
)(BackgroundGroup);
