import React, { useState } from "react";
import Group from "../Group";
import { Dictionary } from "underscore";
import EditorRow from "../EditorRow";
import SizeSelector from "../SizeSelector";
import Col from "@same/components/Col";
import Row from "@same/components/Row";
import { Hr } from "@same/styler/styled/Group";
import InlineSelector, {
  createIconOption
} from "@same/components/InlineSelector";

export interface Props {
  styles: Dictionary<any>;
  setStyle: (field: string) => any;
}

export default function SpacingGroup({ setStyle, styles }: Props) {
  const [marginType, setMarginType] = useState(
    styles.marginTop ||
      styles.marginBottom ||
      styles.marginLeft ||
      styles.marginRight
  );
  const [paddingType, setPaddingType] = useState(
    styles.paddingTop ||
      styles.paddingBottom ||
      styles.paddingLeft ||
      styles.paddingRight
  );

  return (
    <Group title="Spacing">
      <EditorRow field="margin" title="Margin">
        <Row>
          <Col>
            <SizeSelector onChange={setStyle("margin")} value={styles.margin} />
          </Col>
          <Col styled={{ paddingLeft: "5px", flexGrow: 0 }}>
            <InlineSelector
              options={[createIconOption(true)({ icon: "s-separate-spacing" })]}
              onChange={() => setMarginType(!marginType)}
              value={!!marginType}
            />
          </Col>
        </Row>
      </EditorRow>
      {marginType && (
        <>
          <Row styled={{ paddingLeft: "7%" }}>
            <Col size="50%">
              <EditorRow field="marginTop" half title="Top">
                <SizeSelector
                  onChange={setStyle("marginTop")}
                  value={styles.marginTop || styles.margin}
                />
              </EditorRow>
              <EditorRow field="marginLeft" half title="Left">
                <SizeSelector
                  onChange={setStyle("marginLeft")}
                  value={styles.marginLeft || styles.margin}
                />
              </EditorRow>
            </Col>
            <Col size="50%">
              <EditorRow field="marginBottom" half title="Bottom">
                <SizeSelector
                  onChange={setStyle("marginBottom")}
                  value={styles.marginBottom || styles.margin}
                />
              </EditorRow>
              <EditorRow field="marginRight" half title="Right">
                <SizeSelector
                  onChange={setStyle("marginRight")}
                  value={styles.marginRight || styles.margin}
                />
              </EditorRow>
            </Col>
          </Row>
          <Hr />
        </>
      )}
      <EditorRow field="padding" title="Padding">
        <Row>
          <Col>
            <SizeSelector
              onChange={setStyle("padding")}
              value={styles.padding}
            />
          </Col>
          <Col styled={{ paddingLeft: "5px", flexGrow: 0 }}>
            <InlineSelector
              options={[createIconOption(true)({ icon: "s-separate-spacing" })]}
              onChange={() => setPaddingType(!paddingType)}
              value={!!paddingType}
            />
          </Col>
        </Row>
      </EditorRow>
      {paddingType && (
        <>
          <Row styled={{ paddingLeft: "7%" }}>
            <Col size="50%">
              <EditorRow field="paddingTop" half title="Top">
                <SizeSelector
                  onChange={setStyle("paddingTop")}
                  value={styles.paddingTop || styles.padding}
                />
              </EditorRow>
              <EditorRow field="paddingLeft" half title="Left">
                <SizeSelector
                  onChange={setStyle("paddingLeft")}
                  value={styles.paddingLeft || styles.padding}
                />
              </EditorRow>
            </Col>
            <Col size="50%">
              <EditorRow field="paddingBottom" half title="Bottom">
                <SizeSelector
                  onChange={setStyle("paddingBottom")}
                  value={styles.paddingBottom || styles.padding}
                />
              </EditorRow>
              <EditorRow field="paddingRight" half title="Right">
                <SizeSelector
                  onChange={setStyle("paddingRight")}
                  value={styles.paddingRight || styles.padding}
                />
              </EditorRow>
            </Col>
          </Row>
        </>
      )}
    </Group>
  );
}
