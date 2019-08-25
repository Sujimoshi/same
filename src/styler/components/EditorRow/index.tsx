import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import TitleManager, { Title } from "./TitleManager";

export interface Props {
  title: ReactNode;
  children: ReactNode;
  half?: boolean;
  field?: string;
}

const Wrapper = styled.div({
  display: "flex",
  alignItems: "center",
  padding: "5px"
});

export const Col = styled.div((props: any) => ({
  width: props.size,
  display: "flex",
  alignItems: "center",
  ...props.styled
}));

const ItemWrapper = styled.div({
  display: "flex",
  alignItems: "center",
  flexGrow: 1,
  justifyContent: "center"
});

export default React.memo(function EditorRow({
  children,
  title,
  half,
  field
}: Props) {
  return (
    <Wrapper>
      <Col size={half ? "40%" : "25%"}>
        {field ? (
          <TitleManager field={field}>{title}</TitleManager>
        ) : (
          <Title>{title}</Title>
        )}
      </Col>
      <Col size={half ? "60%" : "75%"}>
        {React.Children.map(children, el => (
          <ItemWrapper>{el}</ItemWrapper>
        ))}
      </Col>
    </Wrapper>
  );
});
