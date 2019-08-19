import styled from "@emotion/styled";

export const TextButton = styled.button((props: any) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2px",
  border: "none",
  height: "100%",
  width: "100%",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "lightgrey"
  },
  "&:focus": {
    outline: "none"
  },
  ...props.styled
}));

export const Button = styled.button((props: any) => ({
  display: "flex",
  fontSize: "12px",
  alignItems: "center",
  justifyContent: "center",
  padding: "2px 3px",
  border: "1px solid #3e3640",
  borderRadius: "2px",
  height: "100%",
  width: "100%",
  cursor: "pointer",
  minHeight: "22px",
  "&:hover": {
    backgroundColor: "lightgrey"
  },
  "&:focus": {
    outline: "none"
  },
  ...(props.justify && {
    justifyContent: "space-between"
  }),
  ...(props.sm && {
    fontSize: "12px"
  }),
  ...props.styled
}));
