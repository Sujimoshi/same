import styled from "@emotion/styled";

export const Text = styled.span((props: any) => ({
  fontSize: `12px`,
  ...(props.center && {
    textAlign: "center"
  }),
  ...(props.row && {
    lineHeight: "22px"
  }),
  ...props.styled
}));
