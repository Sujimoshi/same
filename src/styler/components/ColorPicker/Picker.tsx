import React, { Component } from "react";
import Saturation from "./Saturation";
import styled from "@emotion/styled";
import Hue from "./Hue";
import tinycolor, { ColorFormats } from "tinycolor2";
import { throttle } from "underscore";
import Alpha from "./Alpha";

export const PickerWrapper = styled.div((props: any) => ({
  display: "flex",
  flexDirection: "column",
  ...props.styled
}));

export interface Props {
  color: string;
  onChange: (color: string) => void;
}

export interface State {
  hsl: ColorFormats.HSLA;
  hsv: ColorFormats.HSVA;
  rgb: ColorFormats.RGBA;
}

export default class ColorPicker extends Component<Props, State> {
  state = ColorPicker.getState(this.props.color);

  static getState(data: ColorFormats.HSVA | ColorFormats.HSLA | string): State {
    const color = tinycolor(data);
    return {
      rgb: color.toRgb(),
      hsl: color.toHsl(),
      hsv: color.toHsv()
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.color !== prevProps.color) {
      this.setState(ColorPicker.getState(this.props.color));
    }
  }

  handleChange = (data: ColorFormats.HSVA | ColorFormats.HSLA) => {
    const nextState = ColorPicker.getState(data);
    this.setState(nextState);
    this.props.onChange &&
      this.props.onChange(
        `rgba(${nextState.rgb.r}, ${nextState.rgb.g}, ${nextState.rgb.b}, ${nextState.rgb.a})`
      );
  };

  render() {
    const { hsl, hsv, rgb } = this.state;

    return (
      <PickerWrapper>
        <Saturation hsl={hsl} hsv={hsv} onChange={this.handleChange} />
        <Hue hsl={hsl} onChange={this.handleChange} />
        <Alpha rgb={rgb} hsl={hsl} onChange={this.handleChange} />
      </PickerWrapper>
    );
  }
}
