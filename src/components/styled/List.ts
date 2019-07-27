import styled from "@emotion/styled";

export const ItemWrapper = styled.div((props: any) => ({
  cursor: "pointer",
  padding: "0 .5rem",
  position: "relative",
  "&:hover": {
    backgroundColor: "lightgray"
  },
  ...(props.focus && {
    backgroundColor: "lightgray"
  }),
  ...props.styled
}));

export const Li = styled.li((props: any) => ({
  listStyle: "none",
  padding: "0",
  ...props.styled
}));

export const Ul = styled.ul((props: any) => ({
  padding: 0,
  margin: 0,
  ...props.styled
}));
