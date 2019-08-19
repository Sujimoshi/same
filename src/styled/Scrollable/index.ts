import styled from "@emotion/styled";

export const Scrollable = styled.div((props: any) => ({
  overflowY: "auto",
  height: "100%",
  ...props.styled
}));
