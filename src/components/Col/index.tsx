import styled from "@emotion/styled";

export default styled.div(({ justify, size, grow, align, styled }: any) => {
  return {
    alignItems: justify,
    justifyContent: align,
    display: "flex",
    flexDirection: "column",
    flexGrow: grow !== undefined ? grow : size ? 0 : 1,
    flexBasis: size || 0,
    maxWidth: size || "100%",
    minHeight: "1px",
    ...styled
  };
});
