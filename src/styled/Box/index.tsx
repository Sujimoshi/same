import styled from "@emotion/styled";

export const BoxWrapper = styled.div((props: any) => ({
  display: "flex",
  border: "1px solid #3e3640",
  borderRadius: "2px",
  height: "22px",
  overflow: "hidden",
  width: "100%",
  ...props.styled
}));

export const BoxItem = styled.div((props: any) => ({
  display: "flex",
  flex: "1 1 auto",
  padding: "2px",
  marginLeft: "-1px",
  borderLeft: "1px solid #3e3640",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "lightgrey"
  },
  ...(props.selected && {
    backgroundColor: "#9c9c9c",
    "&:hover": {
      backgroundColor: "#9c9c9c"
    }
  }),
  ...(props.disabled && {
    opacity: 0.3,
    cursor: "default",
    "&:hover": {
      backgroundColor: "transparent"
    }
  }),
  ...props.styled
}));
