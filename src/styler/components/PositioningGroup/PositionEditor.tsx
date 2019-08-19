import React, { ReactNode } from "react";
import { Dictionary } from "underscore";
import Row from "@same/components/Row";
import Col from "@same/components/Col";
import EditorRow from "../EditorRow";
import SizeSelector from "../SizeSelector";
import Input from "@same/components/Input";
import { eventValue } from "@same/utils/helpers";

export interface Props {
  setStyle: (style: string) => any;
  styles: Dictionary<any>;
}

export default function PositionEditor({ styles, setStyle }: Props) {
  return (
    <>
      <Row styled={{ paddingLeft: "7%" }}>
        <Col size="50%">
          <EditorRow field="top" half title="Top">
            <SizeSelector onChange={setStyle("top")} value={styles.top} />
          </EditorRow>
          <EditorRow field="left" half title="Left">
            <SizeSelector onChange={setStyle("left")} value={styles.left} />
          </EditorRow>
        </Col>
        <Col size="50%">
          <EditorRow field="bottom" half title="Bottom">
            <SizeSelector onChange={setStyle("bottom")} value={styles.bottom} />
          </EditorRow>
          <EditorRow field="right" half title="Right">
            <SizeSelector onChange={setStyle("right")} value={styles.right} />
          </EditorRow>
          <EditorRow field="zIndex" half title="z-index">
            <Input
              type="number"
              onChange={eventValue(setStyle("zIndex"))}
              value={styles.zIndex || ""}
            />
          </EditorRow>
        </Col>
      </Row>
    </>
  );
}
