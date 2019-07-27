import React, { ReactNode } from "react";
import { ItemWrapper, ItemContent, Action } from "../StructureView/styled";
import { isEmpty } from "underscore";
import Col from "../Col";
import Row from "../Row";
import Icon from "../Icon";
import { IconName } from "@fortawesome/free-solid-svg-icons";

export interface Props {
  actions?: { [key: string]: () => void };
  children: ReactNode;
  level?: number;
  focus?: boolean;
  icon?: IconName;
  onClick: () => void;
}

export default function ListItem({
  focus,
  onClick,
  children,
  actions,
  icon,
  level
}: Props) {
  return (
    <ItemWrapper focus={focus}>
      <ItemContent level={level}>
        <Row align="center">
          {icon && (
            <Col
              onClick={() => onClick()}
              size="2rem"
              justify="center"
              align="center"
            >
              <Icon icon={icon} size="xs" />
            </Col>
          )}
          <Col onClick={() => onClick()}>{children}</Col>
          {actions && !isEmpty(actions) && (
            <Row width="auto">
              {Object.entries(actions).map(([key, onClick]) => (
                <Action key={key} onClick={onClick}>
                  <Icon size="xs" icon={key as IconName} />
                </Action>
              ))}
            </Row>
          )}
        </Row>
      </ItemContent>
    </ItemWrapper>
  );
}
