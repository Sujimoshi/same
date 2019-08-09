import Row from "../Row";
import React, { Fragment } from "react";
import Col from "../Col";
import { Global, css } from "@emotion/core";
import StructureView from "../StructureView";
import CodeEditor from "../CodeEditor";
import VisualEditor from "../VisualEditor";
import PropsEditor from "../PropsEditor";
import Header from "../StructureView/Header";
import ComponentsView from "../ComponentsView";

const globalStyles = css({
  html: {
    fontSize: "62.5%"
  },
  body: {
    fontSize: "1.6rem",
    margin: 0,
    fontFamily: "Roboto,sans-serif"
  },
  "*": {
    boxSizing: "border-box"
  }
});

export default function Body() {
  return (
    <Fragment>
      <Global styles={globalStyles} />
      <Row height="100vh">
        <Col>
          <div className="structure-editor">
            <Header>Structure</Header>
            <StructureView />
          </div>
          <div className="component-view">
            <ComponentsView />
          </div>
        </Col>
        <Col size="70%">
          <Row>
            {/* <Col>
              <Header>Output code</Header>
              <CodeEditor />
            </Col> */}
            <Col styled={{ height: "100vh" }}>
              <Header>Visual</Header>
              <VisualEditor />
            </Col>
          </Row>
        </Col>
        <Col>
          <div className="props-editor">
            <Header>Attributes</Header>
            <PropsEditor />
          </div>
        </Col>
      </Row>
    </Fragment>
  );
}
