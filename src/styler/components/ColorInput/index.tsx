import React, { useCallback } from "react";
import Input from "@same/components/Input";
import { throttle } from "underscore";
import ColorPicker, { ColorBox } from "../ColorPicker";
import styled from "@emotion/styled";
import useDropdown from "@same/hooks/dropdown";
import { eventValue } from "../../../utils/helpers";
import { AbsoluteWrapper } from "@same/styled/Dropdown";

export interface Props {
  value: string;
  onChange: (color: string) => void;
}

export const Wrapper = styled.div((props: any) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  ...props.styled
}));

export const ColorBoxPrepend = styled(ColorBox)({
  borderRight: "none",
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0
});

export default React.memo(function({ value, onChange }: Props) {
  const [expanded, toggle, ref] = useDropdown();
  const change = useCallback(throttle(onChange, 100), [expanded]);
  return (
    <Wrapper ref={ref}>
      <Input
        value={value}
        onChange={eventValue(change)}
        prepend={<ColorBoxPrepend color={value} onClick={() => toggle()} />}
      />
      {expanded && (
        <AbsoluteWrapper
          styled={{ width: "calc(100% + 33.333%)", padding: "5px 0" }}
          align="top"
          justify="right"
        >
          <ColorPicker color={value} onChange={change} />
        </AbsoluteWrapper>
      )}
    </Wrapper>
  );
});
