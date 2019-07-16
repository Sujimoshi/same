import styled from "@emotion/styled";

export const Item = styled.li(props => ({
  listStyle: "none",
  ...props.styles
}));
