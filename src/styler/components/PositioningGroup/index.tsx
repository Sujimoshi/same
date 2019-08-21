import React, { ReactNode } from "react";
import { Dictionary, pick } from "underscore";
import Group from "../Group";
import EditorRow from "../EditorRow";
import DropSelect from "@same/components/DropSelect";
import { Button } from "@same/styled/Button";
import { Text } from "@same/styled/Typography";
import { Icon } from "@same/components/Icon";
import InlineSelector, {
  createTextOption,
  createIconOption
} from "@same/components/InlineSelector";
import { Hr } from "@same/styler/styled/Group";
import PositionEditor from "./PositionEditor";
import { getFocusedNodeStyles } from "@same/store/editor/selectors";
import { setFocusedNodeStyle } from "@same/actions/styles";
import { connect } from "react-redux";
import { RootStore } from "same";

export interface Props {
  styles: Dictionary<any>;
  setStyleField: (field: string, value: string) => void;
}

const positionOptions = [
  { value: "static", label: "Static" },
  { value: "relative", label: "Relative" },
  { value: "absolute", label: "Absolute" },
  { value: "fixed", label: "Fixed" }
];

export function PositioningGroup({ styles, setStyleField }: Props) {
  const positionValue = styles.position || "static";
  const setStyle = (field: string) => (value: string) =>
    setStyleField(field, value);

  return (
    <Group title="Positioning">
      <EditorRow field="position" title="Position">
        <DropSelect
          renderItem={option => <Text row>{option.label}</Text>}
          button={
            <Button justify>
              {positionOptions.find(el => el.value === positionValue).label}
              <Icon icon="caret-down" />
            </Button>
          }
          value={positionValue}
          onChange={option => setStyle("position")(option.value)}
          options={positionOptions}
        />
      </EditorRow>
      {positionValue !== "static" && (
        <PositionEditor styles={styles} setStyle={setStyle} />
      )}
      <Hr />
      <EditorRow field="float" title="Float">
        <InlineSelector
          onChange={setStyle("float")}
          value={styles.float}
          options={[
            createIconOption("none")({ icon: "times" }),
            createIconOption("left")({ icon: "s-float-left" }),
            createIconOption("right")({
              icon: "s-float-left",
              flip: "horizontal"
            })
          ]}
        />
      </EditorRow>
      <EditorRow field="clear" title="Clear">
        <InlineSelector
          onChange={setStyle("clear")}
          value={styles.clear}
          options={[
            createIconOption("none")({ icon: "times" }),
            createIconOption("left")({ icon: "arrow-left", size: "sm" }),
            createIconOption("right")({ icon: "arrow-right", size: "sm" }),
            createIconOption("both")({ icon: "arrows-h" })
          ]}
        />
      </EditorRow>
      <EditorRow field="overflow" title="Overflow">
        <InlineSelector
          options={[
            createIconOption("visible")({ icon: "eye", size: "sm" }),
            createIconOption("hidden")({ icon: "eye-slash", size: "sm" }),
            createIconOption("scroll")({ icon: "s-scroll" }),
            createTextOption("auto")("Auto")
          ]}
          onChange={setStyle("overflow")}
          value={styles.overflow}
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
)(PositioningGroup);
