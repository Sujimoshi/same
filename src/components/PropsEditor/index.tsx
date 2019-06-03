import ASTJSXElement from "../../parser/ASTJSXElement";
import React, { Component } from "react";
import Col from "../grid/Col";
import Row from "../grid/Row";
import { withConnect } from "@same/utils/connect";
import { RootStore } from "same";
import { thunkSaveEditor } from "@same/store/editor/actions";
import Header from "../StructureView/Header";
import ASTJSXAttribute from "../../parser/ASTJSXAttribute";
import EditableLabel from "./EditableLabel";
import { ActionIcon, ActionsWrapper } from "../StructureView/styled";

export interface Props {
  focusedNode?: ASTJSXElement;
  thunkSaveEditor?: typeof thunkSaveEditor;
}

@withConnect(
  (store: RootStore): Partial<Props> => ({
    focusedNode: store.editor.focusedNode
  }),
  { thunkSaveEditor } as Partial<Props>
)
export class PropsEditor extends Component<Props> {
  onChange = (type: "name" | "value", attr?: ASTJSXAttribute) => (
    value: string
  ) => {
    if (!attr) {
      // TODO: create new
    } else {
      // TODO: change attr
    }
  };

  onRemove = (attr: ASTJSXAttribute) => () => {
    attr.detach();
  };

  renderAttribute(name: string, value: string, attr?: ASTJSXAttribute) {
    return (
      <Row key={attr ? attr.key() : "new"}>
        <Col>
          <EditableLabel
            onChange={this.onChange("name", attr)}
            placeholder={name}
          >
            {attr ? name : ""}
          </EditableLabel>
        </Col>
        <Col>
          <EditableLabel
            onChange={this.onChange("value", attr)}
            placeholder={value}
          >
            {attr ? value : ""}
          </EditableLabel>
        </Col>
        <Col grow={0}>
          <ActionsWrapper>
            {attr ? (
              <ActionIcon onClick={this.onRemove(attr)}>x</ActionIcon>
            ) : (
              <ActionIcon>+</ActionIcon>
            )}
          </ActionsWrapper>
        </Col>
      </Row>
    );
  }

  renderNoElement() {
    return (
      <div className="props-editor">
        <Header>Props</Header>
        <div>No props for element</div>
      </div>
    );
  }

  render() {
    const { focusedNode } = this.props;
    if (!focusedNode || !focusedNode.attributes) return this.renderNoElement();
    return (
      <div className="props-editor">
        <Header>Props</Header>
        {this.renderAttribute("newKey", "newValue")}
        {focusedNode
          .attributes()
          .map(el => this.renderAttribute(el.name(), el.value(), el))}
      </div>
    );
  }
}
