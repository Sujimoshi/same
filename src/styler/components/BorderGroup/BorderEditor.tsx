import React, { useState } from "react";
import { Dictionary } from "underscore";
import EditorRow from "../EditorRow";
import Row from "@same/components/Row";
import Col from "@same/components/Col";
import SizeSelector from "../SizeSelector";
import InlineSelector, {
  createIconOption
} from "@same/components/InlineSelector";
import { Hr } from "@same/styler/styled/Group";

export interface Props {
  styles: Dictionary<any>;
  setStyle: (field: string) => any;
}

export default function BorderEditor({ styles, setStyle }: Props) {
  const [borderType, setBorderType] = useState(
    styles.borderTopWidth ||
      styles.borderBottomWidth ||
      styles.borderLeftWidth ||
      styles.borderRightWidth
  );
  return (
    <>
      <EditorRow title="Border" field="borderWidth">
        <Row>
          <Col>
            <SizeSelector
              onChange={setStyle("borderWidth")}
              value={styles.borderWidth}
            />
          </Col>
          <Col styled={{ paddingLeft: "5px", flexGrow: 0 }}>
            <InlineSelector
              options={[createIconOption(true)({ icon: "s-separate-spacing" })]}
              onChange={() => setBorderType(!borderType)}
              value={!!borderType}
            />
          </Col>
        </Row>
      </EditorRow>
      {borderType && (
        <>
          <Row styled={{ paddingLeft: "7%" }}>
            <Col size="50%">
              <EditorRow half title="Top" field="borderTopWidth">
                <SizeSelector
                  onChange={setStyle("borderTopWidth")}
                  value={styles.borderTopWidth || styles.borderWidth}
                />
              </EditorRow>
              <EditorRow half title="Left" field="borderLeftWidth">
                <SizeSelector
                  onChange={setStyle("borderLeftWidth")}
                  value={styles.borderLeftWidth || styles.borderWidth}
                />
              </EditorRow>
            </Col>
            <Col size="50%">
              <EditorRow half title="Bottom" field="borderBottomWidth">
                <SizeSelector
                  onChange={setStyle("borderBottomWidth")}
                  value={styles.borderBottomWidth || styles.borderWidth}
                />
              </EditorRow>
              <EditorRow half title="Right" field="borderRightWidth">
                <SizeSelector
                  onChange={setStyle("borderRightWidth")}
                  value={styles.borderRightWidth || styles.borderWidth}
                />
              </EditorRow>
            </Col>
          </Row>
          <Hr />
        </>
      )}
    </>
  );
}
