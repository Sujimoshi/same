import React, { MouseEvent as ReactMouseEvent, PureComponent } from "react";
import { calcSaturation } from "./helpers";
import styled from "@emotion/styled";
import { ColorFormats } from "tinycolor2";
import { throttle } from "underscore";

export const SaturationWhite = styled.div((props: any) => ({
  width: "100%",
  height: "100%",
  position: "absolute",
  background: "linear-gradient(to right, #fff, rgba(255,255,255,0))",
  ...props.styled
}));

export const SaturationBlack = styled.div((props: any) => ({
  width: "100%",
  height: "100%",
  position: "absolute",
  background: "linear-gradient(to top, #000, rgba(0,0,0,0))",
  ...props.styled
}));

export const Wrapper = styled.div((props: any) => ({
  width: "100%",
  paddingBottom: "75%",
  position: "relative",
  ...props.styled
}));

export const Pointer = styled.div((props: any) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  cursor: "default",
  "&:after": {
    content: "''",
    display: "flex",
    width: "4px",
    height: "4px",
    boxShadow: `0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4)`,
    borderRadius: "50%",
    cursor: "hand",
    transform: "translate(-2px, -2px)"
  },
  ...props.styled
}));

export interface Props {
  hsl: ColorFormats.HSLA;
  hsv: ColorFormats.HSVA;
  onChange: (arg: ColorFormats.HSVA) => void;
}

export class Saturation extends PureComponent<Props> {
  container: HTMLElement = null;

  componentWillUnmount() {
    this.unbindEventListeners();
  }

  handleChange = throttle((e: MouseEvent) => {
    this.props.onChange &&
      this.props.onChange(calcSaturation(e, this.props.hsl, this.container));
  }, 16);

  handleMouseDown = (e: ReactMouseEvent) => {
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
    const { hsv, hsl } = this.props;

    return (
      <Wrapper
        style={{ background: `hsl(${hsl.h},100%, 50%)` }}
        hsl={this.props.hsl}
        ref={(container: HTMLElement) => (this.container = container)}
        onMouseDown={this.handleMouseDown}
      >
        <SaturationWhite>
          <SaturationBlack />
          <Pointer
            style={{
              transform: `translate(${hsv.s * 100}%, ${-(hsv.v * 100) + 100}%)`
            }}
            hsv={this.props.hsv}
          ></Pointer>
        </SaturationWhite>
      </Wrapper>
    );
  }
}

export default Saturation;
