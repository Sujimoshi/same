import React, { ReactNode, useState } from "react";
import { Dictionary } from "underscore";
import EditorRow from "../EditorRow";
import Row from "@same/components/Row";
import Col from "@same/components/Col";
import SizeSelector from "../SizeSelector";
import InlineSelector, {
  createIconOption
} from "@same/components/InlineSelector";
import Icon from "@same/components/Icon";
import { Hr } from "@same/styler/styled/Group";

export interface Props {
  styles: Dictionary<any>;
  setStyle: (field: string) => any;
}

export default function RadiusEditor({ styles, setStyle }: Props) {
  const [radiusType, setRadiusType] = useState(
    styles.borderTopLeftRadius ||
      styles.borderTopRightRadius ||
      styles.borderBottomRightRadius ||
      styles.borderBottomLeftRadius
  );
  return (
    <>
      <EditorRow title="Radius" field="borderRadius">
        <Row>
          <Col>
            <SizeSelector
              onChange={setStyle("borderRadius")}
              value={styles.borderRadius}
            />
          </Col>
          <Col styled={{ paddingLeft: "5px", flexGrow: 0 }}>
            <InlineSelector
              options={[
                createIconOption(true)({ icon: "s-separate-border-radius" })
              ]}
              onChange={() => setRadiusType(!radiusType)}
              value={!!radiusType}
            />
          </Col>
        </Row>
      </EditorRow>
      {radiusType && (
        <>
          <Row styled={{ paddingLeft: "7%" }}>
            <Col size="50%">
              <EditorRow
                half
                field="borderTopLeftRadius"
                title={
                  <Icon
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                    icon="s-border-radius"
                  />
                }
              >
                <SizeSelector
                  onChange={setStyle("borderTopLeftRadius")}
                  value={styles.borderTopLeftRadius || styles.borderRadius}
                />
              </EditorRow>
              <EditorRow
                half
                field="borderBottomLeftRadius"
                title={
                  <Icon
                    rotation={-90}
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                    icon="s-border-radius"
                  />
                }
              >
                <SizeSelector
                  onChange={setStyle("borderBottomLeftRadius")}
                  value={styles.borderBottomLeftRadius || styles.borderRadius}
                />
              </EditorRow>
            </Col>
            <Col size="50%">
              <EditorRow
                half
                field="borderTopRightRadius"
                title={
                  <Icon
                    rotation={90}
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                    icon="s-border-radius"
                  />
                }
              >
                <SizeSelector
                  onChange={setStyle("borderTopRightRadius")}
                  value={styles.borderTopRightRadius || styles.borderRadius}
                />
              </EditorRow>
              <EditorRow
                half
                field="borderBottomRightRadius"
                title={
                  <Icon
                    rotation={-180}
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                    icon="s-border-radius"
                  />
                }
              >
                <SizeSelector
                  onChange={setStyle("borderBottomRightRadius")}
                  value={styles.borderBottomRightRadius || styles.borderRadius}
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
