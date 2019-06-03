import styled from "@emotion/styled";
import { DragState } from "../hooks/useDraggable";
import _ from "underscore";

export const ItemContent = styled.div(({ level = 0 }: { level: number }) => ({
  paddingLeft: level * 2 + "rem",
  display: "flex"
}));

const getItemColor = (dragState: DragState, focus: boolean = false) => {
  if (focus) return "silver";
  if (dragState === DragState.Under) return "slategray";
  return "transparent";
};

export const ItemWrapper = styled.div(
  (props: {
    appendDragState: DragState;
    afterDragState: DragState;
    focus?: boolean;
  }) => ({
    padding: "0 .5rem",
    position: "relative",
    borderBottom: ".1rem solid transparent",
    borderTop: ".1rem solid transparent",
    borderBottomColor: getItemColor(props.afterDragState),
    backgroundColor: getItemColor(
      props.afterDragState === DragState.Hold
        ? props.appendDragState
        : DragState.Hold,
      props.focus
    ),
    "&:hover": {
      backgroundColor: props.focus ? "silver" : "gainsboro"
    },
    span: {
      visibility: "hidden"
    },
    "&:hover span": {
      visibility: "visible"
    }
  })
);

export const ActionIcon = styled.span({
  cursor: "pointer",
  marginLeft: "auto",
  opacity: 0.5,
  width: "1.8rem",
  height: "1.8rem",
  lineHeight: "1.8rem",
  textAlign: "center",
  pointerEvents: "auto",
  "&:hover": {
    opacity: 1
  }
});

export const ActionsWrapper = styled.div({
  padding: "0 .3rem",
  display: "flex",
  alignItems: "center"
});

export const Li = styled.li({
  listStyle: "none",
  padding: "0"
});

export const Ul = styled.ul({
  padding: 0,
  margin: 0
});
