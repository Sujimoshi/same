import React, { Component, ReactNode } from "react";
import { getPos, getComputedSize } from "@same/utils/helpers";
import Resizer from "../Resizer";
import { Mapper } from "same";
import { setField, removeField } from "@same/utils/field";
import Dragger from "../Dragger";
import Outline from "../Outline";

export interface Props {
  children?: ReactNode;
  element: HTMLElement;
  setStyles?: (map: Mapper) => void;
}

export default class FocusOutline extends Component<Props> {
  onMouseUp = (type: "width" | "height") => {
    const { element, setStyles } = this.props;
    const newSize = element.style[type];
    setStyles(newSize ? setField(type, newSize) : removeField(type));
    element.style[type] = "";
  };

  onMouseMove = (type: "width" | "height", newSize: number) => {
    const { element } = this.props;
    const parentSize = getComputedSize(element.parentElement, type);
    if (newSize > 0 && newSize <= parentSize) {
      const relativeSize = newSize / parentSize;
      element.style[type] = relativeSize * 100 + "%";
    } else {
      element.style[type] = 100 + "%";
    }
    this.forceUpdate();
  };

  renderResizers = () => {
    return ["top", "left", "bottom", "right"].map(side => (
      <Resizer
        key={side}
        position={side as any}
        element={this.props.element}
        onMove={this.onMouseMove}
        onEnd={this.onMouseUp}
      />
    ));
  };

  render() {
    const pos = getPos(this.props.element);

    return (
      <Outline
        style={{
          borderColor: "red",
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          width: `${pos.w}px`,
          height: `${pos.h}px`
        }}
      >
        {this.props.children}
        {this.renderResizers()}
      </Outline>
    );
  }
}
