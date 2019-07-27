import Modal from "../Modal";
import React from "react";
import { useFormData } from "@same/hooks/formData";
import { Label } from "@same/styled/Label";
import { Input } from "@same/styled/Input";
import Col from "../Col";
import Row from "../Row";
import { Button } from "@same/styled/Button";
import { ComponentType } from "@same/configurator";
import { ComponentData } from "./index";

export interface ComponentData {
  path: string;
  name: string;
  tag: string;
  type: ComponentType;
}

export interface Props {
  onClose: () => void;
  data: {
    path?: string;
    name?: string;
    tag?: string;
    type?: ComponentType;
    onApply: (data: ComponentData) => void;
  };
}

export const ADD_COMPONENT_MODAL = "ADD_COMPONENT_MODAL";

export default function AddComponentModal({ data, onClose }: Props) {
  const [formData, useModel] = useFormData({
    path: data.path || "",
    tag: data.tag || "",
    name: data.name || "",
    type: data.type || ComponentType.Styled
  });

  const onApply = () => {
    data.onApply(formData);
    onClose();
  };

  return (
    <Modal title="Component creation" onClose={onClose}>
      <Col>
        <Row>
          <Label>Name (export):</Label>
          <Input type="text" {...useModel("name")} />
        </Row>
        <Row>
          <Label>Type:</Label>
          <select type="text" {...useModel("type")} style={{ width: "100%" }}>
            <option value={ComponentType.Pure}>Complex</option>
            <option value={ComponentType.Styled}>Style</option>
          </select>
        </Row>
        <Row>
          <Label>Tag:</Label>
          <Input type="text" {...useModel("tag")} />
        </Row>
        <Row>
          <Label>Path:</Label>
          <Input type="text" {...useModel("path")} />
        </Row>
        <Row>
          <Col>
            <Button onClick={onApply}>Apply</Button>
          </Col>
          <Col>
            <Button onClick={onClose}>Cancel</Button>
          </Col>
        </Row>
      </Col>
    </Modal>
  );
}
