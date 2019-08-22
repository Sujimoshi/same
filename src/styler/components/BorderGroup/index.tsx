import React from "react";
import Group from "../Group";
import { Dictionary } from "underscore";
import EditorRow from "../EditorRow";
import Col from "@same/components/Col";
import Row from "@same/components/Row";
import InlineSelector, {
  mapValuesToIconOptions
} from "@same/components/InlineSelector";
import Input from "@same/components/Input";
import { eventValue } from "@same/utils/helpers";
import SideEditor from "../SideEditor";
import Icon, { Props as IconProps } from "@same/components/Icon";
import ColorInput from "../ColorInput";

export interface Props {
  styles: Dictionary<any>;
  setStyle: (field: string) => any;
}

export default function BorderGroup({ setStyle, styles }: Props) {
  return (
    <Group title="Border">
      <SideEditor
        styles={styles}
        separateIcon="s-separate-border-radius"
        mainField={{ name: "borderRadius", title: "Radius" }}
        onChange={(field: string, value: string) => setStyle(field)(value)}
        sideFields={[
          {
            name: "borderTopLeftRadius",
            title: <Icon icon="s-border-radius" />
          },
          {
            name: "borderTopRightRadius",
            title: <Icon icon="s-border-radius" rotation={90} />
          },
          {
            name: "borderBottomLeftRadius",
            title: <Icon icon="s-border-radius" rotation={-90} />
          },
          {
            name: "borderBottomRightRadius",
            title: <Icon icon="s-border-radius" rotation={-180} />
          }
        ]}
      />
      <SideEditor
        styles={styles}
        separateIcon="s-separate-spacing"
        mainField={{ name: "borderWidth", title: "Border" }}
        onChange={(field: string, value: string) => setStyle(field)(value)}
        sideFields={[
          { title: "Top", name: "borderTopWidth" },
          { title: "Bottom", name: "borderBottomWidth" },
          { title: "Left", name: "borderLeftWidth" },
          { title: "Right", name: "borderRightWidth" }
        ]}
      />
      <EditorRow title="Style" field="borderStyle">
        <InlineSelector
          onChange={setStyle("borderStyle")}
          value={styles.borderStyle}
          options={mapValuesToIconOptions("borderStyle")([
            { value: "solid" },
            { value: "dashed" },
            { value: "dotted" }
          ])}
        />
      </EditorRow>
      <EditorRow title="Color" field="borderColor">
        <ColorInput
          onChange={setStyle("borderColor")}
          value={styles.borderColor || ""}
        />
      </EditorRow>
    </Group>
  );
}
