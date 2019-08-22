import React, { Component, ReactNode } from "react";
import { Dictionary } from "underscore";
import EditorRow from "../EditorRow";
import Row from "@same/components/Row";
import Col from "@same/components/Col";
import { Hr } from "@same/styler/styled/Group";
import SizeSelector from "../SizeSelector";
import InlineSelector, {
  createIconOption
} from "@same/components/InlineSelector";
import Icon from "@same/components/Icon";

export interface Field {
  title: ReactNode;
  name: string;
}

export interface Props {
  mainField: Field;
  separateIcon: string;
  sideFields: Field[];
  styles: Dictionary<any>;
  onChange: (field: string, value: string) => void;
}

export interface State {
  separate: boolean;
}

export default class SideEditor extends Component<Props, State> {
  state = {
    separate: this.props.sideFields.some(el => this.props.styles[el.name])
  };

  renderEditoRow(field: Field) {
    const { onChange, styles, mainField } = this.props;
    return (
      <EditorRow half field={field.name} title={field.title}>
        <SizeSelector
          onChange={value => onChange(field.name, value)}
          value={styles[field.name] || styles[mainField.name]}
        />
      </EditorRow>
    );
  }

  renderSeparateEditor() {
    const { sideFields } = this.props;
    return (
      <>
        <Row styled={{ paddingLeft: "7%" }}>
          <Col size="50%">
            {this.renderEditoRow(sideFields[0])}
            {this.renderEditoRow(sideFields[2])}
          </Col>
          <Col size="50%">
            {this.renderEditoRow(sideFields[1])}
            {this.renderEditoRow(sideFields[3])}
          </Col>
        </Row>
        <Hr />
      </>
    );
  }

  render() {
    const { onChange, styles, mainField, separateIcon } = this.props;
    const { separate } = this.state;
    return (
      <>
        <EditorRow title={mainField.title} field={mainField.name}>
          <Row>
            <Col>
              <SizeSelector
                onChange={val => onChange(mainField.name, val)}
                value={styles[mainField.name]}
              />
            </Col>
            <Col styled={{ paddingLeft: "5px", flexGrow: 0 }}>
              <InlineSelector
                options={[createIconOption(true)({ icon: separateIcon })]}
                onChange={() => this.setState({ separate: !separate })}
                value={!!separate}
              />
            </Col>
          </Row>
        </EditorRow>
        {separate && this.renderSeparateEditor()}
      </>
    );
  }
}
