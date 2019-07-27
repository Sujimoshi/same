import { noop } from "underscore";
import Row from "../Row";
import Col from "../Col";
import React, { useState } from "react";
import { ActionsWrapper, Action } from "../StructureView/styled";
import { ToggableInput } from "./styled";
import Icon from "../Icon/index";

export interface Props {
  level?: number;
  name?: string;
  value?: string;
  create?: boolean;
  nameNotEditable?: boolean;
  valueNotEditable?: boolean;
  onNameChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  onRemove?: () => void;
  onCreate?: (name: string, value: string) => void;
}

export default function PropsEditorItem({
  level = 0,
  create = false,
  name = "",
  value = "",
  nameNotEditable = false,
  valueNotEditable = false,
  onNameChange = noop,
  onValueChange = noop,
  onRemove = noop,
  onCreate = noop
}: Props) {
  const [data, setData] = useState({ name, value });
  const createNew = () => {
    onCreate(data.name, data.value);
    setData({ ...data, name: "", value: "" });
  };
  return (
    <Row styled={{ paddingLeft: level + 0.5 + "rem", paddingRight: ".5rem" }}>
      <Col>
        <ToggableInput
          type="text"
          placeholder={!create ? name : "newName"}
          disabled={nameNotEditable}
          value={data.name}
          onChange={e => setData({ ...data, name: e.target.value })}
          onBlur={() => onNameChange(data.name)}
        />
      </Col>
      <Col>
        <ToggableInput
          type="text"
          placeholder={!create ? "" : "newValue"}
          disabled={valueNotEditable}
          value={data.value}
          onChange={e => setData({ ...data, value: e.target.value })}
          onBlur={() => onValueChange(data.value)}
        />
      </Col>
      <Col grow={0}>
        <ActionsWrapper>
          {!create ? (
            <Action onClick={onRemove}>
              <Icon icon="times" size="xs" />
            </Action>
          ) : (
            <Action onClick={createNew}>
              <Icon icon="plus" size="xs" />
            </Action>
          )}
        </ActionsWrapper>
      </Col>
    </Row>
  );
}
