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
  type: ComponentType;
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

export const CREATE_COMPONENT_MODAL = "CREATE_COMPONENT_MODAL";

export default function CreateComponentModal({ data, onClose }: Props) {
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
      <Row padding="6px 5px 0px" align="baseline">
        <Col size="35px">
          <Label>Name</Label>
        </Col>
        <Col>
          <Input {...useModel("name")} />
        </Col>
      </Row>
      <Row>
        <Col>
          <EditorRow title="Type">
            <InlineSelector
              options={[
                createIconOption(ComponentType.Styled)({ icon: "palette" }),
                createIconOption(ComponentType.Pure)({ icon: "layer-group" })
              ]}
              {...useModel("type")}
            />
          </EditorRow>
        </Col>
        <Col>
          <EditorRow title="Tag">
            <Input {...useModel("tag")} disabled={tagDisabled} />
          </EditorRow>
        </Col>
      </Row>
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
