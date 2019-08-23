import styled from "@emotion/styled";

export const ListItemInput = styled.input((props: any) => ({
  width: "calc(100% + 6px)",
  height: "19px",
  fontSize: "14px",
  marginRight: "-6px",
  border: 0,
  padding: 0,
  backgroundColor: "transparent",
  "&:focus": {
    outline: "none",
    border: "1px solid gray"
  },
  ...props.styled
}));
