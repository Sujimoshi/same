import React from "react";
import Row from "../Row";
import Col from "../Col";
import { ActionsWrapper, Action } from "../StructureView/styled";
import Header from "../StructureView/Header";
import Icon from "../Icon/index";
import { isEmpty, Dictionary } from "underscore";

export interface Props {
  actions: { [key: string]: () => void };
}

export default function ComponentsViewHeader({ actions }: Props) {
  return (
    <Header>
      <Row>
        <Col>Components</Col>
        {actions && !isEmpty(actions) && (
          <Row width="auto" align="center">
            {Object.entries(actions).map(([key, onClick]) => (
              <Action
                styled={{ color: "white" }}
                key={key}
                onClick={() => onClick()}
              >
                <Icon size="xs" icon={key} />
              </Action>
            ))}
          </Row>
        )}
      </Row>
    </Header>
  );
}
