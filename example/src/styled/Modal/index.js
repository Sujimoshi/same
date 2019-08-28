import styled from "@emotion/styled";
import styled from "@emotion/styled";
import styled from "@emotion/styled";
import styled from "@emotion/styled";
import styled from "@emotion/styled";
import styled from "@emotion/styled";
import styled from "@emotion/styled";
import styled from "@emotion/styled";
import styled from "@emotion/styled";

export const ModalBackground = styled.div(props => ({
  backgroundColor: "rgba(0,0,0, .5)",
  ...props.styled
}));
export const ModalWrapper = styled.div(props => ({
  ...props.styled
}));
export const ModalBody = styled.div(props => ({
  ...props.styled
}));
export const ModalFooter = styled.div(props => ({
  display: "flex",
  justifyContent: "flex-end",
  padding: "5px",
  borderStyle: "solid",
  borderColor: "rgba(120, 120, 120, 1)",
  borderWidth: "0px",
  borderTopWidth: "1px",
  ...props.styled
}));
export const Input = styled.input(props => ({
  width: "100%",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "rgba(88, 88, 88, 1)",
  borderRadius: "2px",
  fontSize: "12px",
  padding: "2px",
  ...props.styled
}));
export const Label = styled.label(props => ({
  fontSize: "12px",
  width: "25%",
  ...props.styled
}));
export const ControlGroup = styled.div(props => ({
  display: "flex",
  alignItems: "center",
  ...props.styled
}));
export const ActionsWrapper = styled.div(props => ({
  ...props.styled
}));
export const Action = styled.span(props => ({
  paddingLeft: "3px",
  paddingRight: "3px",
  ...props.styled
}));
