import styled from "@emotion/styled";

export const ModalBackground = styled.div((props: any) => ({
  backgroundColor: "rgba(32,18,18, .5)",
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
  top: 0,
  left: 0,
  ...props.styled
}));

export const ModalWrapper = styled.div((props: any) => ({
  backgroundColor: "white",
  width: "30rem",
  ...props.styled
}));

export const ModalHeader = styled.div((props: any) => ({
  width: "100%",
  padding: ".5rem",
  backgroundColor: "darkslategray",
  color: "white",
  fontWeight: 300,
  ...props.styled
}));

export const ModalBody = styled.div((props: any) => ({
  // padding: ".5rem",
  ...props.styled
}));

export const Icon = styled.i((props: any) => ({
  width: "1.8rem",
  height: "1.8rem",
  lineHeight: "1.8rem",
  color: "white",
  cursor: "pointer",
  fontStyle: "normal",
  display: "inline-flex",
  justifyContent: "center",
  "&:hover": {
    opacity: ".5"
  },
  ...props.styled
}));
