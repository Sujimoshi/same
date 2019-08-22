import React, { PureComponent } from "react";
import { calcHue } from "./helpers";
import styled from "@emotion/styled";
import { ColorFormats } from "tinycolor2";
import { throttle } from "underscore";

export const Pointer = styled.div((props: any) => ({
  position: "absolute",
  "&:after": {
    content: "''",
    display: "flex",
    marginTop: "1px",
    width: "4px",
    borderRadius: "1px",
    height: "8px",
    boxShadow: "0 0 2px rgba(0, 0, 0, .6)",
    background: "#fff",
    transform: "translateX(-2px)"
  },
  ...props.styled
}));

export const Wrapper = styled.div((props: any) => ({
  padding: "0 2px",
  marginBottom: "5px",
  position: "relative",
  height: "10px",
  background: `linear-gradient(to right, #f00 0%, #ff0 17%, #0f0
    33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`,
  ...props.styled
}));

export interface Props {
  onChange: (hsl: ColorFormats.HSLA) => void;
  hsl: ColorFormats.HSLA;
}

export class Hue extends PureComponent<Props> {
  container: HTMLElement = null;

  componentWillUnmount() {
    this.unbindEventListeners();
  }

  handleChange = throttle((e: MouseEvent) => {
    const change = calcHue(e, this.props.hsl, this.container);
    change && typeof this.props.onChange && this.props.onChange(change);
  }, 16);

  handleMouseDown = (e: React.MouseEvent) => {
    this.handleChange(e.nativeEvent);
    window.addEventListener("mousemove", this.handleChange);
    window.addEventListener("mouseup", this.handleMouseUp);
  };

  handleMouseUp = () => {
    this.unbindEventListeners();
  };

  unbindEventListeners() {
    window.removeEventListener("mousemove", this.handleChange);
    window.removeEventListener("mouseup", this.handleMouseUp);
  }

  render() {
    const { hsl } = this.props;

    return (
      <Wrapper
        ref={(container: HTMLElement) => (this.container = container)}
        onMouseDown={this.handleMouseDown}
      >
        <Pointer
          style={{ left: `${(hsl.h * 100) / 360}%` }}
          hsl={this.props.hsl}
        />
      </Wrapper>
    );
  }
}

export default Hue;
