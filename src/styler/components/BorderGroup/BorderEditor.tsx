import React, { Component } from "react";
import { Dictionary } from "underscore";
import EditorRow from "../EditorRow";
import Row from "@same/components/Row";
import Col from "@same/components/Col";
import SizeSelector from "../SizeSelector";
import InlineSelector, {
  createIconOption
} from "@same/components/InlineSelector";
import { Hr } from "@same/styler/styled/Group";

export interface Props {
  styles: Dictionary<any>;
  setStyle: (field: string) => any;
}

export interface State {
  separate: boolean;
}

export default class BorderEditor extends Component<Props, State> {
  state = {
    separate:
      this.props.styles.borderTopWidth ||
      this.props.styles.borderBottomWidth ||
      this.props.styles.borderLeftWidth ||
      this.props.styles.borderRightWidth
  };

  renderBorderInput(title: string, field: string) {
    const { setStyle, styles } = this.props;
    return (
      <EditorRow half title={title} field={field}>
        <SizeSelector
          onChange={setStyle(field)}
          value={styles[field] || styles.borderWidth}
        />
      </EditorRow>
    );
  }

  renderSeparateEditor() {
    return (
      <>
        <Row styled={{ paddingLeft: "7%" }}>
          <Col size="50%">
            {this.renderBorderInput("Top", "borderTopWidth")}
            {this.renderBorderInput("Left", "borderLeftWidth")}
          </Col>
          <Col size="50%">
            {this.renderBorderInput("Bottom", "borderBottomWidth")}
            {this.renderBorderInput("Right", "borderRightWidth")}
          </Col>
        </Row>
        <Hr />
      </>
    );
  }

  render() {
    const { setStyle, styles } = this.props;
    const { separate } = this.state;
    return (
      <>
        <EditorRow title="Border" field="borderWidth">
          <Row>
            <Col>
              <SizeSelector
                onChange={setStyle("borderWidth")}
                value={styles.borderWidth}
              />
            </Col>
            <Col styled={{ paddingLeft: "5px", flexGrow: 0 }}>
              <InlineSelector
                options={[
                  createIconOption(true)({ icon: "s-separate-spacing" })
                ]}
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
