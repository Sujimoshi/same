import styled from "@emotion/styled";

export default styled.div((props: any) => ({
  display: "flex",
  pointerEvents: "none",
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  border: "1px solid lightblue",
  boxSizing: "border-box",
  ...props.styled
}));
