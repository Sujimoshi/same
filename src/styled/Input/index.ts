import styled from "@emotion/styled";

export const InputWrapper = styled.div((props: any) => ({
  width: "100%",
  display: "flex",
  ...props.styled
}));

export const Input = styled.input((props: any) => ({
  border: "1px solid #3e3640",
  borderRadius: "2px",
  width: "100%",
  height: "22px",
  padding: "4px",
  "&:focus": {
    outline: "none"
  },
  ...(props.prepended && {
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0"
  }),
  ...(props.appended && {
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0"
  }),
  ...(props.disabled && {
    opacity: 0.5
  }),
  ...props.styled
}));

export const InputBox = styled.div((props: any) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "22px",
  marginLeft: "-1px",
  ...props.styled
}));

export const Label = styled.label((props: any) => ({
  fontSize: "12px",
  ...props.styled
}));
