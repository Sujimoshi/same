import React, { Component } from "react";
import { Dictionary } from "underscore";
import EditorRow from "../EditorRow";
import Row from "@same/components/Row";
import Col from "@same/components/Col";
import SizeSelector from "../SizeSelector";
import InlineSelector, {
  createIconOption
} from "@same/components/InlineSelector";
import Icon from "@same/components/Icon";
import { Hr } from "@same/styler/styled/Group";

export interface Props {
  styles: Dictionary<any>;
  setStyle: (field: string) => any;
}

export interface State {
  separate: boolean;
}

export default class RadiusEditor extends Component<Props, State> {
  state = {
    separate:
      this.props.styles.borderTopLeftRadius ||
      this.props.styles.borderTopRightRadius ||
      this.props.styles.borderBottomRightRadius ||
      this.props.styles.borderBottomLeftRadius
  };

  renderEditoRow(field: string, rotate: number = 0) {
    const { setStyle, styles } = this.props;
    return (
      <EditorRow
        half
        field={field}
        title={
          <Icon
            rotation={rotate}
            style={{ marginLeft: "auto", marginRight: "auto" }}
            icon={"s-border-radius"}
          />
        }
      >
        <SizeSelector
          onChange={setStyle(field)}
          value={styles[field] || styles.borderRadius}
        />
      </EditorRow>
    );
  }

  renderSeparateEditor() {
    return (
      <>
        <Row styled={{ paddingLeft: "7%" }}>
          <Col size="50%">
            {this.renderEditoRow("borderTopLeftRadius")}
            {this.renderEditoRow("borderBottomLeftRadius", -90)}
          </Col>
          <Col size="50%">
            {this.renderEditoRow("borderTopRightRadius", 90)}
            {this.renderEditoRow("borderBottomRightRadius", -180)}
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
        <EditorRow title="Radius" field="borderRadius">
          <Row>
            <Col>
              <SizeSelector
                onChange={setStyle("borderRadius")}
                value={styles.borderRadius}
              />
            </Col>
            <Col styled={{ paddingLeft: "5px", flexGrow: 0 }}>
              <InlineSelector
                options={[
                  createIconOption(true)({ icon: "s-separate-border-radius" })
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
