import styled from "@emotion/styled";

export const Panel = styled.div((props: any) => ({
  border: "1px solid #3e3640",
  borderRadius: "2px",
  minWidth: "100%",
  top: "100%",
  left: "50%",
  zIndex: "1",
  transform: "translate(-50%)",
  backgroundColor: " white",
  ...(props.absolute && {
    position: "absolute"
  }),
  ...props.styled
}));
