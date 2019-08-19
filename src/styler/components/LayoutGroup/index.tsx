import React from "react";
import Group from "../Group";
import { Dictionary } from "underscore";
import InlineSelector, {
  Option,
  mapValuesToIconOptions
} from "@same/components/InlineSelector";
import EditorRow from "../EditorRow";
import FlexEditor from "../FlexEditor";

export interface Props {
  styles: Dictionary<any>;
  setStyle: (field: string) => any;
}

const displayOptions: Option[] = mapValuesToIconOptions("display")([
  { value: "block" },
  { value: "flex" },
  { value: "inline-block" },
  { value: "inline" },
  { value: "none" }
]);

export default function LayoutGroup({ setStyle, styles }: Props) {
  return (
    <Group title="Layout">
      <EditorRow field="display" title="Display">
        <InlineSelector
          options={displayOptions}
          value={styles.display}
          onChange={setStyle("display")}
        />
      </EditorRow>
      {styles.display === "flex" && (
        <FlexEditor styles={styles} setStyle={setStyle} />
      )}
    </Group>
  );
}
