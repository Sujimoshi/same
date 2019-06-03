import styled from "@emotion/styled";

export const ToggableInput = styled.input({
  width: "100%",
  display: "flex",
  border: ".1rem solid transparent",
  padding: ".1rem .5rem",
  height: "100%",
  "&:focus": {
    borderColor: "lightgrey",
    outline: "none"
  }
});
