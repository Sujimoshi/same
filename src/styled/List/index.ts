import styled from "@emotion/styled";

export const List = styled.ul((props: any) => ({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "inline-flex",
  alignItems: "stretch",
  flexDirection: "column",
  ...props.styled
}));

export const ListItem = styled.li((props: any) => ({
  ...(props.selected && {
    backgroundColor: "#9c9c9c"
  }),
  ...props.styled
}));
