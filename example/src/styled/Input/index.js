import * as React from "react";
import styled from "@emotion/styled";
import styled from "@emotion/styled";

export default function Example() {
  return (
    <>
      <ExampleWrapper>
        <BoxWrapper>
          <Input></Input>
          <DropdownSelector>
            <Button
              styled={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <span></span>
            </Button>
            <DropdownWrapper
              styled={{ display: "flex", alignItems: "flex-start" }}
            >
              <Panel styled={{ display: "flex", alignItems: "flex-start" }}>
                <List>
                  <ItemWrapper>
                    <span></span>
                  </ItemWrapper>
                  <ItemWrapper>
                    <span></span>
                  </ItemWrapper>
                </List>
              </Panel>
            </DropdownWrapper>
          </DropdownSelector>
        </BoxWrapper>
      </ExampleWrapper>
    </>
  );
}

export const Input = styled.input(props => ({
  border: "0",
  width: "100%",
  padding: "3px",
  "&:focus": {
    outline: "none"
  },
  ...props.styled
}));
export const BoxWrapper = styled.div(props => ({
  border: "1px solid #848484",
  borderRadius: "2px",
  overflow: "hidden",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  justifyContent: "space-between",
  flexWrap: "nowrap",
  ...props.styled
}));
