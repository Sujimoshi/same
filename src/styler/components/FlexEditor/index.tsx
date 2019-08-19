import React from "react";
import EditorRow from "../EditorRow";
import DirectionSelector from "./DirectionSelector";
import { Dictionary } from "underscore";
import InlineSelector, {
  mapValuesToIconOptions
} from "@same/components/InlineSelector";
import { FlipProp } from "@fortawesome/fontawesome-svg-core";
import WrapSelector from "./WrapSelector";
import { Hr } from "@same/styler/styled/Group";

export interface Props {
  styles: Dictionary<any>;
  setStyle: (field: string) => any;
}

const alignItemsOptions = (rotation: number, flip?: FlipProp) => {
  return mapValuesToIconOptions("alignItems", { rotation, flip })([
    { value: "flex-start" },
    { value: "center" },
    { value: "flex-end" },
    { value: "stretch" },
    { value: "baseline" }
  ]);
};

const justifyContentOptions = (rotation: number, flip?: FlipProp) => {
  return mapValuesToIconOptions("justifyContent", { rotation, flip })([
    { value: "flex-start" },
    { value: "center" },
    { value: "flex-end" },
    { value: "space-between" },
    { value: "space-around" }
  ]);
};

const alignContentOptions = (rotation: number, flip?: FlipProp) => {
  return mapValuesToIconOptions("alignContent", { rotation, flip })([
    { value: "flex-start" },
    { value: "center" },
    { value: "flex-end" },
    { value: "stretch" },
    { value: "space-between" },
    { value: "space-around" }
  ]);
};

export default function FlexEditor({ styles, setStyle }: Props) {
  const { flexDirection = "", flexWrap = "" } = styles;
  return (
    <>
      <EditorRow field="flexDirection" title="Direction">
        <DirectionSelector
          value={flexDirection}
          onChange={setStyle("flexDirection")}
        />
      </EditorRow>
      <EditorRow field="alignItems" title="Align">
        <InlineSelector
          options={alignItemsOptions(
            flexDirection.includes("column") ? -90 : 0,
            flexDirection.includes("reverse") ? "horizontal" : null
          )}
          value={styles.alignItems}
          onChange={setStyle("alignItems")}
        />
      </EditorRow>
      <EditorRow field="justifyContent" title="Justify">
        <InlineSelector
          options={justifyContentOptions(
            flexDirection.includes("column") ? 90 : 0,
            flexDirection.includes("reverse") ? "horizontal" : null
          )}
          value={styles.justifyContent}
          onChange={setStyle("justifyContent")}
        />
      </EditorRow>
      <Hr />
      <EditorRow field="flexWrap" title="Wrap">
        <WrapSelector value={flexWrap} onChange={setStyle("flexWrap")} />
      </EditorRow>
      {flexWrap === "wrap" && (
        <EditorRow field="alignContent" title="Align">
          <InlineSelector
            options={alignContentOptions(
              flexDirection.includes("column") ? -90 : 0,
              flexWrap.includes("reverse") ? "vertical" : null
            )}
            value={styles.alignContent}
            onChange={setStyle("alignContent")}
          />
        </EditorRow>
      )}
    </>
  );
}
