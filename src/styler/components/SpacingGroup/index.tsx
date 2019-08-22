import React from "react";
import Group from "../Group";
import { Dictionary } from "underscore";
import SideEditor from "../SideEditor";

export interface Props {
  styles: Dictionary<any>;
  setStyle: (field: string) => any;
}

export interface State {
  marginSeparate: boolean;
  paddingSeparate: boolean;
}

export default function SpacingGroup({ setStyle, styles }: Props) {
  return (
    <Group title="Spacing">
      <SideEditor
        styles={styles}
        separateIcon="s-separate-spacing"
        mainField={{ name: "margin", title: "Margin" }}
        onChange={(field: string, value: string) => setStyle(field)(value)}
        sideFields={[
          { title: "Top", name: "marginTop" },
          { title: "Bottom", name: "marginBottom" },
          { title: "Left", name: "marginLeft" },
          { title: "Right", name: "marginRight" }
        ]}
      />
      <SideEditor
        styles={styles}
        separateIcon="s-separate-spacing"
        mainField={{ name: "padding", title: "Padding" }}
        onChange={(field: string, value: string) => setStyle(field)(value)}
        sideFields={[
          { title: "Top", name: "paddingTop" },
          { title: "Bottom", name: "paddingBottom" },
          { title: "Left", name: "paddingLeft" },
          { title: "Right", name: "paddingRight" }
        ]}
      />
    </Group>
  );
}
