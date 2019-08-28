import React, { Component } from "react";
import { ItemWrapper, ItemContent, Action } from "../StructureView/styled";
import { isEmpty } from "underscore";
import Col from "../Col";
import Row from "../Row";
import Icon from "../Icon";
import { IconName } from "@fortawesome/free-solid-svg-icons";
import ItemInput from "./ItemInput";

export interface Props {
  actions?: { [key: string]: () => void };
  children: string;
  level?: number;
  focus?: boolean;
  hover?: boolean;
  icon?: IconName;
  edit?: boolean;
  disabled?: boolean;
  onEditFinish?: (value: string) => void;
  onClick?: () => void;
  onDoubleClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}

export default class ListItem extends Component<Props> {
  renderEditInput() {
    const { children, onEditFinish } = this.props;
    return (
      <Col justify="center" align="center">
        <ItemInput onBlur={onEditFinish}>{children}</ItemInput>
      </Col>
    );
  }

  renderItem() {
    const {
      onClick,
      onDoubleClick,
      onMouseOver,
      onMouseOut,
      children,
      actions
    } = this.props;
    return (
      <>
        <Col
          onMouseOver={() => onMouseOver && onMouseOver()}
          onMouseOut={() => onMouseOut && onMouseOut()}
          onClick={() => onClick && onClick()}
          onDoubleClick={() => onDoubleClick && onDoubleClick()}
        >
          {children}
        </Col>
        {actions && !isEmpty(actions) && (
          <Row width="auto">
            {Object.entries(actions).map(([key, onClick]) => (
              <Action key={key} onClick={onClick}>
                <Icon size="xs" icon={key} />
              </Action>
            ))}
          </Row>
        )}
      </>
    );
  }

  render() {
    const {
      focus,
      onClick,
      hover,
      icon,
      level,
      edit,
      disabled,
      onDoubleClick
    } = this.props;

    return (
      <ItemWrapper disabled={disabled} hover={hover} focus={focus}>
        <ItemContent level={level}>
          <Row align="center">
            {icon && (
              <Col
                onClick={() => onClick && onClick()}
                onDoubleClick={() => onDoubleClick && onDoubleClick()}
                size="2rem"
                justify="center"
                align="center"
              >
                <Icon icon={icon} size="xs" />
              </Col>
            )}
            {edit ? this.renderEditInput() : this.renderItem()}
          </Row>
        </ItemContent>
      </ItemWrapper>
    );
  }
}
