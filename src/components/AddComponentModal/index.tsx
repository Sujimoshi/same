import Modal from "../Modal";
import React from "react";
import { useFormData } from "@same/hooks/formData";
import { Label } from "@same/styled/Label";
import { Input } from "@same/styled/Input";
import Col from "../grid/Col";
import Row from "../grid/Row";
import { Button } from "@same/styled/Button";

export interface ComponentData {
  name: string;
  tag: string;
}

export interface Props {
  onClose: () => void;
  data: {
    onApply: (data: ComponentData) => void;
  };
}

export const ADD_COMPONENT_MODAL = "ADD_COMPONENT_MODAL";

export default function AddComponentModal({ data, onClose }: Props) {
  const [formData, useModel] = useFormData({ tag: "", name: "" });

  const onApply = () => {
    data.onApply(formData);
    onClose();
  };

  return (
    <Modal title="Component creation" onClose={onClose}>
      <Col>
        <Row>
          <Label>Component name:</Label>
          <Input type="text" {...useModel("name")} />
        </Row>
        <Row>
          <Label>Tag:</Label>
          <Input type="text" {...useModel("tag")} />
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
