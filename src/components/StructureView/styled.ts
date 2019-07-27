import styled from "@emotion/styled";
import { DragState } from "../hooks/useDraggable";
import _ from "underscore";
import { capitalize } from "@same/utils/helpers";

export const DragAndDropWrapper = styled.div((props: any) => ({
  position: "relative"
}));

export const AppendDropArea = styled.div((props: any) => ({
  ...(props.dropping && {
    backgroundColor: "gray"
  })
}));

export const ItemContent = styled.div(({ level = 0 }: { level: number }) => ({
  width: "100%",
  paddingLeft: level * 2 + "rem",
  display: "flex",
  lineHeight: 1.3
}));

export const InsertDropArea = styled.div((props: any) => ({
  height: ".4rem",
  position: "absolute",
  width: "100%",
  left: "0",
  [props.place]: "0",
  ["border" + capitalize(props.place)]: "1px solid transparent",
  ...(props.dropping && {
    borderColor: "gray"
  }),
  ...props.styled
}));

export const ItemWrapper = styled.div(
  (props: { focus?: boolean; styled?: any }) => ({
    cursor: "pointer",
    padding: "0 .5rem",
    position: "relative",
    ...(focus && {
      backgroundColor: "lightgray"
    }),
    "&:hover": {
      backgroundColor: props.focus ? "silver" : "gainsboro"
    },
    button: {
      visibility: "hidden"
    },
    "&:hover button": {
      visibility: "visible"
    },
    ...props.styled
  })
);

export const ActionIcon = styled.button((props: any) => ({
  border: 0,
  padding: 0,
  backgroundColor: "transparent",
  cursor: "pointer",
  marginLeft: "auto",
  opacity: 0.5,
  width: "1.8rem",
  height: "1.8rem",
  lineHeight: "1.8rem",
  textAlign: "center",
  pointerEvents: "auto",
  "&:hover, &:focus": {
    opacity: 1
  },
  "&:focus": {
    outline: "none"
  },
  ...props.styled
}));

export const ActionsWrapper = styled.div({
  padding: "0 .3rem",
  display: "flex",
  alignItems: "center"
});

export const Li = styled.li({
  listStyle: "none",
  padding: "0"
});

export const Ul = styled.ul((props: any) => ({
  padding: 0,
  margin: 0,
  ...props.styled
}));
