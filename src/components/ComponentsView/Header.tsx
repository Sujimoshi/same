import React from "react";
import Row from "../Row";
import Col from "../Col";
import { ActionsWrapper, Action } from "../StructureView/styled";
import Header from "../StructureView/Header";
import Icon from "../Icon/index";

export interface Props {
  onCreate: () => void;
}

export default function ComponentsViewHeader({ onCreate }: Props) {
  return (
    <Header>
      <Row>
        <Col>Components</Col>
        <Row width="auto" align="center">
          <Action styled={{ color: "white" }} onClick={onCreate}>
            <Icon icon="plus" />
          </Action>
        </Row>
      </Row>
    </Header>
  );
}
