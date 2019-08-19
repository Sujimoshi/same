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
  paddingLeft: level + "rem",
  display: "flex",
  lineHeight: 1.3,
  fontSize: "14px"
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

export const ItemWrapper = styled.div((props: any) => ({
  cursor: "pointer",
  padding: "0 .5rem",
  position: "relative",
  "&:hover": {
    backgroundColor: "lightgray"
  },
  ...(props.hover && {
    backgroundColor: "lightgray"
  }),
  ...(props.focus && {
    backgroundColor: "#9c9c9c",
    "&:hover": {
      backgroundColor: "#9c9c9c"
    }
  }),
  ...props.styled
}));

export const Action = styled.button((props: any) => ({
  border: 0,
  fontStyle: "normal",
  padding: "0 .3rem",
  cursor: "pointer",
  opacity: 0.5,
  textAlign: "center",
  pointerEvents: "auto",
  background: "transparent",
  "&:hover, &:focus": {
    outline: "none",
    opacity: 1
  },
  ...props.styled
}));

export const ActionsWrapper = styled.div({
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
