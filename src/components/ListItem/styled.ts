import styled from "@emotion/styled";

export const ListItemInput = styled.input((props: any) => ({
  width: "100%",
  border: 0,
  "&:focus": {
    outline: "none",
    border: "1px solid gray"
  },
  ...props.styled
}));
