import styled from "@emotion/styled";

export const DropdownWrapper = styled.div((props: any) => ({
  position: "relative",
  height: "100%",
  width: "100%",
  ...props.styled
}));

export const DropdownButtonWrapper = styled.div((props: any) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ...props.styled
}));
