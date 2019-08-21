import React, { PureComponent } from "react";
import { calcAplha } from "./helpers";
import { ColorFormats } from "tinycolor2";
import styled from "@emotion/styled";
import checkerboard from "./checkerboard.png";
import { throttle } from "underscore";

export const Wrapper = styled.div((props: any) => ({
  position: "relative",
  height: "10px",
  ...props.styled
}));

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
    transform: "translate(-2px)"
  },
  ...props.styled
}));

export interface Props {
  hsl: ColorFormats.HSLA;
  rgb: ColorFormats.RGBA;
  onChange: (hsl: ColorFormats.HSLA) => void;
}

export class Alpha extends PureComponent<Props> {
  container: HTMLElement = null;

  componentWillUnmount() {
    this.unbindEventListeners();
  }

  handleChange = throttle((e: MouseEvent) => {
    const change = calcAplha(e, this.props.hsl, this.container);
    change && this.props.onChange && this.props.onChange(change);
  }, 16);

  handleMouseDown = (e: React.MouseEvent) => {
    this.handleChange(e.nativeEvent);
    window.addEventListener("mousemove", this.handleChange);
    window.addEventListener("mouseup", this.handleMouseUp);
  };

  handleMouseUp = () => {
    this.unbindEventListeners();
  };

  unbindEventListeners = () => {
    window.removeEventListener("mousemove", this.handleChange);
    window.removeEventListener("mouseup", this.handleMouseUp);
  };

  render() {
    const { rgb } = this.props;
    return (
      <Wrapper
        rgb={rgb}
        style={{
          background: `linear-gradient(to right, rgba(${rgb.r},${rgb.g},${rgb.b}, 0)
             0%, rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%), url(${checkerboard}) -1px -1px / 8px repeat local`
        }}
        ref={(container: HTMLElement) => (this.container = container)}
        onMouseDown={this.handleMouseDown}
      >
        <Pointer style={{ left: `${rgb.a * 100}%` }} rgb={rgb} />
      </Wrapper>
    );
  }
}

export default Alpha;
