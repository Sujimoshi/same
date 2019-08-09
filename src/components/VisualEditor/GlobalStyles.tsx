import { Global, css } from "@emotion/core";
import React from "react";

const globalStyles = css({
  html: {
    fontSize: "62.5%"
  },
  body: {
    fontSize: "1.6rem",
    margin: 0,
    fontFamily: "Roboto,sans-serif"
  },
  "*, :before, :after": {
    boxSizing: "border-box"
  }
});

export default function GlobalStyles() {
  return <Global styles={globalStyles} />;
}
