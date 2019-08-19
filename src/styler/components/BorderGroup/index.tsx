import React from "react";
import Group from "../Group";
import { Dictionary } from "underscore";
import EditorRow from "../EditorRow";
import Col from "@same/components/Col";
import Row from "@same/components/Row";
import InlineSelector, {
  mapValuesToIconOptions
} from "@same/components/InlineSelector";
import RadiusEditor from "./RadiusEditor";
import Input from "@same/components/Input";
import BorderEditor from "./BorderEditor";
import { eventValue } from "@same/utils/helpers";

export interface Props {
  styles: Dictionary<any>;
  setStyle: (field: string) => any;
}

export default function BorderGroup({ setStyle, styles }: Props) {
  return (
    <Group title="Borders">
      <RadiusEditor styles={styles} setStyle={setStyle} />
      <BorderEditor styles={styles} setStyle={setStyle} />
      <Row>
        <Col>
          <EditorRow half title="Style" field="borderStyle">
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
        </Col>
        <Col>
          <EditorRow half title="Color" field="borderColor">
            <Input
              onChange={eventValue(setStyle("borderColor"))}
              value={styles.borderColor || ""}
            />
          </EditorRow>
        </Col>
      </Row>
    </Group>
  );
}
