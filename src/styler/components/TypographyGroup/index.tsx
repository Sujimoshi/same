import React from "react";
import { Dictionary } from "underscore";
import Group from "../Group";
import EditorRow from "../EditorRow";
import DropSelect from "@same/components/DropSelect";
import Button from "@same/components/Button";
import { findValue, eventValue } from "@same/utils/helpers";
import Row from "@same/components/Row";
import Col from "@same/components/Col";
import SizeSelector from "../SizeSelector";
import Input from "@same/components/Input";
import { Text } from "@same/styled/Typography";
import InlineSelector, {
  createIconOption,
  mapValuesToIconOptions
} from "@same/components/InlineSelector";
import { connect } from "react-redux";
import { getFocusedNodeStyles } from "@same/store/editor/selectors";
import { RootStore } from "same";
import { setFocusedNodeStyle } from "@same/actions/styles";
import ColorPicker from "../ColorPicker";
import ColorInput from "../ColorInput";
import FontSelector from "./FontSelector";

export interface Props {
  styles: Dictionary<any>;
  setStyleField: (field: string, value: string) => any;
}

const weightList = [
  { label: "Inherit", value: "" },
  { label: "100 - Thin", value: "100" },
  { label: "200 - Extra Light", value: "200" },
  { label: "300 - Ligh", value: "300" },
  { label: "400 - Normal", value: "400" },
  { label: "500 - Medium", value: "500" },
  { label: "600 - Semi Bold", value: "600" },
  { label: "700 - Bold", value: "700" },
  { label: "800 - Extra Bold", value: "800" },
  { label: "900 - Black", value: "900" }
];

export function TypographyGroup({ styles, setStyleField }: Props) {
  const setStyle = (field: string) => (value: string) =>
    setStyleField(field, value);

  return (
    <Group title="Typography">
      <FontSelector
        value={styles.fontFamily || ""}
        onChange={setStyle("fontFamily")}
      />
      <EditorRow field="fontWeight" title="Weight">
        <DropSelect
          button={
            <Button appendIcon="caret-down">
              {findValue(weightList, "label", styles.fontWeight) || "Inherit"}
            </Button>
          }
          renderItem={option => <Text row>{option.label}</Text>}
          options={weightList}
          onChange={option => setStyle("fontWeight")(option.value)}
          value={styles.fontWeight || ""}
        />
      </EditorRow>
      <Row>
        <Col>
          <EditorRow field="fontSize" half title="Size">
            <SizeSelector
              onChange={setStyle("fontSize")}
              value={styles.fontSize}
            />
          </EditorRow>
        </Col>
        <Col>
          <EditorRow field="lineHeight" half title="Line H">
            <SizeSelector
              onChange={setStyle("lineHeight")}
              value={styles.lineHeight}
            />
          </EditorRow>
        </Col>
      </Row>
      <EditorRow field="color" title="Color">
        <ColorInput value={styles.color || ""} onChange={setStyle("color")} />
      </EditorRow>
      <EditorRow field="textAlign" title="Align">
        <InlineSelector
          onChange={setStyle("textAlign")}
          value={styles.textAlign}
          options={[
            createIconOption("left")({ icon: "align-left", size: "sm" }),
            createIconOption("center")({ icon: "align-center", size: "sm" }),
            createIconOption("right")({ icon: "align-right", size: "sm" }),
            createIconOption("justify")({ icon: "align-justify", size: "sm" })
          ]}
        />
      </EditorRow>
      <EditorRow field="textDecoration" title="Decorate">
        <InlineSelector
          onChange={setStyle("textDecoration")}
          value={styles.textDecoration}
          options={[
            createIconOption("none")({ icon: "times", size: "sm" }),
            createIconOption("line-through")({
              icon: "strikethrough",
              size: "sm"
            }),
            createIconOption("underline")({ icon: "underline", size: "sm" }),
            createIconOption("overline")({ icon: "overline", size: "sm" })
          ]}
        />
      </EditorRow>
      <EditorRow field="textTransform" title="Case">
        <InlineSelector
          onChange={setStyle("textTransform")}
          value={styles.textTransform}
          options={[
            createIconOption("none")({ icon: "times", size: "sm" }),
            ...mapValuesToIconOptions("textTransform")([
              { value: "uppercase" },
              { value: "lowercase" },
              { value: "capitalize" }
            ])
          ]}
        />
      </EditorRow>
      <Row>
        <Col>
          <EditorRow field="fontStyle" half title="Style">
            <InlineSelector
              onChange={setStyle("fontStyle")}
              value={styles.fontStyle}
              options={[
                createIconOption("normal")({ icon: "text", size: "sm" }),
                createIconOption("italic")({ icon: "italic", size: "sm" })
              ]}
            />
          </EditorRow>
          <EditorRow field="letterSpacing" half title="Spacing">
            <SizeSelector
              onChange={setStyle("letterSpacing")}
              value={styles.letterSpacing}
            />
          </EditorRow>
        </Col>
        <Col>
          <EditorRow field="direction" half title="Spelling">
            <InlineSelector
              onChange={setStyle("direction")}
              value={styles.direction}
              options={[
                createIconOption("ltr")({
                  icon: "paragraph-rtl",
                  size: "sm",
                  flip: "horizontal"
                }),
                createIconOption("rtl")({ icon: "paragraph-rtl", size: "sm" })
              ]}
            />
          </EditorRow>
          <EditorRow half title="Indent" field="textIndent">
            <SizeSelector
              onChange={setStyle("textIndent")}
              value={styles.textIndent}
            />
          </EditorRow>
        </Col>
      </Row>
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
)(TypographyGroup);
