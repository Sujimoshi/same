import styled from "@emotion/styled";

export const Scrollable = styled.div((props: any) => ({
  overflowY: "auto",
  overflowX: "hidden",
  position: "relative",
  height: "100%",
  paddingTop: "100px",
  ...props.styled
}));
