import Modal from "../Modal";
import React from "react";
import { useFormData } from "@same/hooks/formData";
import { Input, Label } from "@same/styled/Input";
import Col from "../Col";
import Row from "../Row";
import { Button } from "@same/styled/Button";
import { ComponentType } from "@same/configurator";
import { ComponentData } from "./index";
import EditorRow from "@same/styler/components/EditorRow";
import InlineSelector from "../InlineSelector";
import { createIconOption } from "../InlineSelector/index";
import { Hr } from "@same/styler/styled/Group";

export interface ComponentData {
  name: string;
  tag: string;
}

export interface Props {
  onClose: () => void;
  data: {
    name?: string;
    tag?: string;
    type?: ComponentType;
    onApply: (data: ComponentData) => void;
  };
}

export const EDIT_COMPONENT_MODAL = "EDIT_COMPONENT_MODAL";

export default function EditComponentModal({ data, onClose }: Props) {
  const [formData, useModel] = useFormData({
    tag: data.tag || "",
    name: data.name || "",
    type: data.type || ComponentType.Styled
  });

  const onApply = () => {
    data.onApply(formData);
    onClose();
  };
  const tagDisabled = formData.type === ComponentType.Pure;
  return (
    <Modal title="Component creation" onClose={onClose}>
      <EditorRow title="Name">
        <Input {...useModel("name")} />
      </EditorRow>
      <EditorRow title="Tag">
        <Input {...useModel("tag")} disabled={tagDisabled} />
      </EditorRow>
      <Hr />
      <Row>
        <Col styled={{ padding: "5px" }}>
          <Button onClick={onApply}>Apply</Button>
        </Col>
        <Col styled={{ padding: "5px" }}>
          <Button onClick={onClose}>Cancel</Button>
        </Col>
      </Row>
    </Modal>
  );
}
