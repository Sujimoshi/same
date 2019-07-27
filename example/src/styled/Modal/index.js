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
          <ModalHeader>Header</ModalHeader>
          <ModalBody>
            <Button>Button</Button>
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
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
  top: "0",
  left: "0",
  ...props.styled
}));
export const ModalWrapper = styled.div(props => ({
  backgroundColor: "white",
  width: "300px",
  ...props.styled
}));
export const ModalHeader = styled.div(props => ({
  padding: "5px",
  backgroundColor: "darkslategray",
  color: "white",
  ...props.styled
}));
export const ModalBody = styled.div(props => ({
  padding: "5px",
  ...props.styled
}));
