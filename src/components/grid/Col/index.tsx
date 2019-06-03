import styled from "@emotion/styled";

export interface Props {
  size?: number | string;
  grow?: number;
}

export default styled.div(({ size, grow }: Props) => {
  return {
    flexGrow: grow !== undefined ? grow : size ? 0 : 1,
    flexBasis: size || 0,
    maxWidth: size || "100%",
    minHeight: "1px"
  };
});
