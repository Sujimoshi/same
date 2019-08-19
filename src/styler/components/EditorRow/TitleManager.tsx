import React, { ReactNode, useCallback } from "react";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import { RootStore } from "same";
import { setFocusedNodeStyle } from "@same/actions/styles";
import { getFocusedNode } from "@same/store/editor/selectors";
import { Node } from "@same/configurator";

export interface Props {
  children: ReactNode;
  field?: string;
  node: Node;
  setStyle: (field: string, value: string) => void;
}

export const Title = styled.span((props: any) => ({
  fontSize: `12px`,
  cursor: "default",
  display: "flex",
  ...(props.type === "edited" && {
    cursor: "pointer",
    backgroundColor: "#add8e6",
    padding: "2px",
    marginLeft: "-2px",
    borderRadius: "2px",
    "&:hover": {
      backgroundColor: "#add8e6a6"
    }
  }),
  ...props.styled
}));

export function TitleManager({ node, field, children, setStyle }: Props) {
  const fieldValue = node.styles[field];

  const onClick = useCallback(() => {
    if (fieldValue) {
      setStyle(field, undefined);
    }
  }, [fieldValue]);

  return (
    <Title type={fieldValue ? "edited" : null} onClick={onClick}>
      {children}
    </Title>
  );
}

export default connect(
  (state: RootStore) => ({
    node: getFocusedNode(state)
  }),
  {
    setStyle: setFocusedNodeStyle
  }
)(TitleManager);
