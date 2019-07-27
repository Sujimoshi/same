import React from "react";
import Row from "../grid/Row";
import Col from "../grid/Col";
import { ActionsWrapper, ActionIcon } from "../StructureView/styled";
import Header from "../StructureView/Header";

export interface Props {
  onCreate: () => void;
}

export default function ComponentsViewHeader({ onCreate }: Props) {
  return (
    <Header>
      <Row>
        <Col>Components</Col>
        <Col>
          <ActionsWrapper>
            <ActionIcon styled={{ color: "white" }} onClick={onCreate}>
              +
            </ActionIcon>
          </ActionsWrapper>
        </Col>
      </Row>
    </Header>
  );
}
