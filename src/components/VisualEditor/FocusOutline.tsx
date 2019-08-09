import React, { Component, ReactNode } from "react";
import { FocusOutline } from "./styled";
import { getPos, getComputedSize } from "@same/utils/helpers";
import Resizer from "./Resizer";
import { Mapper } from "same";
import { setField, removeField } from "@same/utils/field";
import Dragger from "./Dragger";

export interface Props {
  children?: ReactNode;
  focusRef: HTMLElement;
  setStyles: (map: Mapper) => void;
}

export default class FocusOutlineWrapper extends Component<Props> {
  onMouseUp = (type: "width" | "height") => {
    const { focusRef, setStyles } = this.props;
    const newSize = focusRef.style[type];
    setStyles(newSize ? setField(type, newSize) : removeField(type));
    focusRef.style[type] = "";
  };

  onMouseMove = (type: "width" | "height", newSize: number) => {
    const { focusRef } = this.props;
    const parentSize = getComputedSize(focusRef.parentElement, type);
    if (newSize > 0 && newSize <= parentSize) {
      const relativeSize = newSize / parentSize;
      focusRef.style[type] = relativeSize * 100 + "%";
    } else {
      focusRef.style[type] = 100 + "%";
    }
    this.forceUpdate();
  };

  renderResizers = () => {
    return ["top", "left", "bottom", "right"].map(side => (
      <Resizer
        key={side}
        position={side as any}
        element={this.props.focusRef}
        onMove={this.onMouseMove}
        onEnd={this.onMouseUp}
      />
    ));
  };

  renderDragger = () => {
    return <Dragger element={this.props.focusRef} />;
  };

  render() {
    const pos = getPos(this.props.focusRef);

    return (
      <FocusOutline
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          width: `${pos.w}px`,
          height: `${pos.h}px`
        }}
      >
        {this.renderDragger()}
        {this.renderResizers()}
      </FocusOutline>
    );
  }
}
