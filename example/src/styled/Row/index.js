import styled from "@emotion/styled";
import React from "react";
import { Col } from "../Col/index.js";

export const Row = styled.div(props => ({
  ...props.styled
}));

export default function Example() {
  return (
    <Row>
      <Col>
        <Col />
      </Col>
    </Row>
  );
}
