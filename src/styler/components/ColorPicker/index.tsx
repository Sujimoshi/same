import React from "react";
import { Panel } from "@same/styled/Panel";
import styled from "@emotion/styled";
import Picker from "./Picker";
import checkerboard from "./checkerboard.png";
import times from "./times.png";

export const Container = styled.div((props: any) => ({
  padding: "5px",
  ...props.styled
}));

export const ColorsWrapper = styled.div((props: any) => ({
  display: "flex",
  flexWrap: "wrap",
  ...props.styled
}));

export const ColorBox = styled.div((props: any) => ({
  background: props.color
    ? `linear-gradient(to right, ${props.color} 0%, ${props.color} 100%),
    url(${checkerboard}) -1px -1px / 8px repeat local`
    : `url(${times}) no-repeat`,
  backgroundSize: props.color ? "" : "100% 100%",
  borderRadius: "2px",
  border: "1px solid #3e3640",
  width: "22px",
  height: "22px",
  ...props.styled
}));

export interface Props {
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ color, onChange }: Props) {
  return (
    <Panel styled={{ padding: "5px" }}>
      <Picker color={color} onChange={onChange} />
      {/* <Text>Recently Used:</Text>
      <ColorsWrapper>
        <ColorBox color={color} />
      </ColorsWrapper>
      <Text>Theme colors:</Text> */}
    </Panel>
  );
}
