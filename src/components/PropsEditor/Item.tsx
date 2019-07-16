import { noop } from "underscore";
import Row from "../grid/Row";
import Col from "../grid/Col";
import React, { useState } from "react";
import { ActionsWrapper, ActionIcon } from "../StructureView/styled";
import { ToggableInput } from "./styled";

export interface Props {
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
    <Row>
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
          placeholder={!create ? value : "newValue"}
          disabled={valueNotEditable}
          value={data.value}
          onChange={e => setData({ ...data, value: e.target.value })}
          onBlur={() => onValueChange(data.value)}
        />
      </Col>
      <Col grow={0}>
        <ActionsWrapper>
          {!create ? (
            <ActionIcon onClick={onRemove}>x</ActionIcon>
          ) : (
            <ActionIcon onClick={createNew}>+</ActionIcon>
          )}
        </ActionsWrapper>
      </Col>
    </Row>
  );
}
