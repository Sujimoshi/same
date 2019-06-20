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
import ASTFile from "@same/parser/ASTFile";
import ASTJSXText from "../../parser/ASTJSXText";
import ASTNode from "@same/parser/ASTNode";
import PropsDataProvider from "./DataProvider";
import { BaseNode, JSXElement } from "@babel/types";

export interface Props {
  focusedNode?: BaseNode;
  thunkSaveEditor?: typeof thunkSaveEditor;
  filePath?: string;
  astFile?: ASTFile;
}

export interface State {
  name: string;
  value: string;
}

@withConnect(
  (store: RootStore): Partial<Props> => ({
    focusedNode: store.editor.focusedNode,
    astFile: new ASTFile(store.editor.astFile),
    filePath: store.editor.filePath
  }),
  { thunkSaveEditor } as Partial<Props>
)
export class PropsEditor extends Component<Props> {
  state = {
    name: "",
    value: ""
  };

  saveEditor() {
    this.props.thunkSaveEditor(
      this.props.astFile.code(),
      this.props.filePath,
      this.props.astFile.node
    );
  }

  onChange = (type: "name" | "value", attr?: ASTJSXAttribute | ASTJSXText) => (
    value: string
  ) => {
    if (!attr) {
      this.setState({ [type]: value });
    } else {
      attr[type] = value;
      this.saveEditor();
    }
  };

  onRemove = (attr: ASTJSXAttribute | ASTJSXText) => () => {
    attr.detach();
    this.saveEditor();
  };

  onCreate = () => {
    const { name, value } = this.state;
    if (name === "" || value === "") return;
    const astFocusedNode = new ASTJSXElement(this.props
      .focusedNode as JSXElement);
    astFocusedNode.addAttribute(name, value);
    this.setState({ name: "", value: "" });
    this.saveEditor();
  };

  renderAttribute(
    name: string,
    value: string,
    attr?: ASTJSXAttribute | ASTJSXText
  ) {
    return (
      <Row key={attr ? PropsDataProvider.key(attr.node) : "new"}>
        <Col>
          <EditableLabel
            onChange={this.onChange("name", attr)}
            placeholder={attr ? name : "newName"}
          >
            {name}
          </EditableLabel>
        </Col>
        <Col>
          <EditableLabel
            onChange={this.onChange("value", attr)}
            placeholder={attr ? value : "newValue"}
          >
            {value}
          </EditableLabel>
        </Col>
        <Col grow={0}>
          <ActionsWrapper>
            {attr ? (
              <ActionIcon onClick={this.onRemove(attr)}>x</ActionIcon>
            ) : (
              <ActionIcon onClick={this.onCreate}>+</ActionIcon>
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
    const { name, value, attributes } = PropsDataProvider;
    if (!focusedNode) return this.renderNoElement();
    return (
      <div className="props-editor">
        <Header>Props</Header>
        {this.renderAttribute(this.state.name, this.state.value)}
        {attributes(focusedNode)
          .reverse()
          .map(el => this.renderAttribute(name(el), value(el), el))}
      </div>
    );
  }
}
