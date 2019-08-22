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

// eslint-disable-next-line complexity
export const AbsoluteWrapper = styled.div((props: any) => ({
  width: "100%",
  position: "absolute",
  ...(props.align === "top" && {
    bottom: "100%"
  }),
  ...(props.align === "bottom" && {
    top: "100%"
  }),
  ...(props.justify === "center" && {
    left: "50%",
    transform: "translate(-50%)"
  }),
  ...(props.justify === "left" && {
    left: "0"
  }),
  ...(props.justify === "right" && {
    right: "0"
  }),
  ...props.styled
}));
