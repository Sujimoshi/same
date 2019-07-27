import React from "react";
import { getCode } from "@same/store/project/selectors";
import { connect } from "react-redux";
import { RootStore } from "same";

export interface Props {
  code?: string;
}

export function CodeEditor({ code }: Props) {
  return <pre>{code}</pre>;
}

export default connect((state: RootStore) => ({
  code: getCode(state)
}))(CodeEditor);
