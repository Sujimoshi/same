import React from "react";
import Group from "../Group";
import { Dictionary } from "underscore";
import EditorRow from "../EditorRow";
import SizeSelector from "../SizeSelector";
import Col from "@same/components/Col";
import Row from "@same/components/Row";
import { Hr } from "@same/styler/styled/Group";
import InlineSelector, {
  createTextOption
} from "@same/components/InlineSelector";
import Input from "@same/components/Input";
import { eventValue } from "@same/utils/helpers";

export interface Props {
  styles: Dictionary<any>;
  setStyle: (field: string) => any;
}

export default function SizeGroup({ setStyle, styles }: Props) {
  return (
    <Group title="Size">
      <Row>
        <Col size="50%">
          <EditorRow field="width" half title="Width">
            <SizeSelector onChange={setStyle("width")} value={styles.width} />
          </EditorRow>
          <EditorRow field="minWidth" half title="Min W">
            <SizeSelector
              onChange={setStyle("minWidth")}
              value={styles.minWidth}
            />
          </EditorRow>
          <EditorRow field="maxWidth" half title="Max W">
            <SizeSelector
              onChange={setStyle("maxWidth")}
              value={styles.maxWidth}
            />
          </EditorRow>
        </Col>
        <Col size="50%">
          <EditorRow field="height" half title="Height">
            <SizeSelector onChange={setStyle("height")} value={styles.height} />
          </EditorRow>
          <EditorRow field="minHeight" half title="Min H">
            <SizeSelector
              onChange={setStyle("minHeight")}
              value={styles.minHeight}
            />
          </EditorRow>
          <EditorRow field="maxHeight" half title="Max H">
            <SizeSelector
              onChange={setStyle("maxHeight")}
              value={styles.maxHeight}
            />
          </EditorRow>
        </Col>
      </Row>
      <Hr />
      <Row>
        <Col size="50%">
          <EditorRow field="flexShrink" half title="Shrink">
            <SizeSelector
              onChange={setStyle("flexShrink")}
              value={styles.flexShrink}
            />
          </EditorRow>
          <EditorRow field="flexBasis" half title="Basis">
            <SizeSelector
              onChange={setStyle("flexBasis")}
              value={styles.flexBasis}
            />
          </EditorRow>
        </Col>
        <Col size="50%">
          <EditorRow field="flexGrow" half title="Grow">
            <SizeSelector
              onChange={setStyle("flexGrow")}
              value={styles.flexGrow}
            />
          </EditorRow>
          <EditorRow field="order" half title="Order">
            <Input
              type="number"
              value={styles.order}
              onChange={eventValue(setStyle("order"))}
            />
          </EditorRow>
        </Col>
      </Row>
    </Group>
  );
}
