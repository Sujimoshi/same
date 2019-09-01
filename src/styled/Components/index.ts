import styled from "@emotion/styled";

export const DragWrapper = styled.div((props: any) => ({
  ...(props.dragging && {
    backgroundColor: "lightgray"
  }),
  ...props.styled
}));

export const DropWrapper = styled.div((props: any) => ({
  ...(props.dropping && {
    backgroundColor: "#c5c5c5"
  }),
  ...props.styled
}));
