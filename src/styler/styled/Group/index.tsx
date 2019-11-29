import styled from "@emotion/styled";

export const GroupHeader = styled.div({
  borderBottom: "1px solid #3e3640",
  display: "flex",
  alignItems: "center",
  padding: "5px",
  fontSize: "14px",
  backgroundColor: "#9c9c9c"
});

export const Hr = styled.div({
  borderTop: "1px solid #3e3640"
});

export const Group = styled.div((props: any) => ({
  display: "flex",
  flexDirection: "column",
  borderBottom: "1px solid #3e3640",
  ...(props.fixed && {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%"
  })
}));
