import * as React from "react";
import styled from "@emotion/styled";
import styled from "@emotion/styled";
import styled from "@emotion/styled";
import styled from "@emotion/styled";
import styled from "@emotion/styled";

export default function Example() {
  return (
    <>
      <ModalBackground>
        <ModalWrapper>
          <ModalHeader styled={{ alignSelf: "flex-end" }}>
            <span></span>
          </ModalHeader>
          <ModalBody
            styled={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <Button styled={{ display: "flex", flexDirection: "row" }}>
              <span></span>
            </Button>
            <Button styled={{ marginTop: "auto", flexDirection: "column" }}>
              <span></span>
            </Button>
          </ModalBody>
        </ModalWrapper>
      </ModalBackground>
    </>
  );
}

export const Modal = styled.div(props => ({
  width: "100%",
  border: "1px solid gray",
  padding: "5px",
  ...props.styled
}));
export const ModalBackground = styled.div(props => ({
  backgroundColor: "rgba(0,0,0, .5)",
  position: "fixed",
  display: "flex",
  width: "100vw",
  height: "100vh",
  top: "0",
  left: "0",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  overflow: "hidden",
  ...props.styled
}));
export const ModalWrapper = styled.div(props => ({
  backgroundColor: "white",
  width: "500px",
  display: "flex",
  flexWrap: "wrap",
  ...props.styled
}));
export const ModalHeader = styled.div(props => ({
  padding: "5px",
  backgroundColor: "darkslategray",
  color: "white",
  width: "100%",
  ...props.styled
}));
export const ModalBody = styled.div(props => ({
  padding: "5px",
  width: "100%",
  ...props.styled
}));
