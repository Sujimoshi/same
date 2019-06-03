import Row from "../grid/Row";
import React, { Fragment, Component } from "react";
import Col from "../grid/Col";
import { Global, css } from "@emotion/core";
import StructureView from "../StructureView";
import CodeEditor from "../CodeEditor";
import VisualEditor from "../VisualEditor";
import { PropsEditor } from "../PropsEditor";

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

export default class Body extends Component<any> {
  render() {
    return (
      <Fragment>
        <Global styles={globalStyles} />
        <Row height="100vh">
          <Col>
            <StructureView />
            <PropsEditor />
          </Col>
          <Col size="70%">
            <Row>
              <Col>
                <CodeEditor />
              </Col>
              <Col>
                <VisualEditor />
              </Col>
            </Row>
          </Col>
          <Col>Sidebar</Col>
        </Row>
      </Fragment>
    );
  }
}
