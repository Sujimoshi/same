import React, { useCallback } from "react";
import { Panel } from "@same/styled/Panel";
import styled from "@emotion/styled";
import { Text } from "@same/styled/Typography";
import Picker from "./Picker";
import checkerboard from "./checkerboard.png";
import { throttle } from "underscore";

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
  background: `linear-gradient(to right, ${props.color} 0%, ${props.color} 100%),
    url(${checkerboard}) -1px -1px / 8px repeat local`,
  borderRadius: "2px",
  width: "22px",
  height: "22px",
  ...props.styled
}));

export const AbsoluteWrapper = styled.div((props: any) => ({
  width: "100%",
  position: "absolute",
  padding: "5px",
  bottom: props.bottom,
  ...props.styled
}));

export interface Props {
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ color, onChange }: Props) {
  return (
    <AbsoluteWrapper bottom="-150px">
      <Panel styled={{ padding: "5px" }}>
        <Picker
          color={color}
          onChange={useCallback(throttle(onChange, 100), [])}
        />
        <Text>Recently Used:</Text>
        <ColorsWrapper>
          <ColorBox color={color} />
        </ColorsWrapper>
        <Text>Theme colors:</Text>
      </Panel>
    </AbsoluteWrapper>
  );
}
