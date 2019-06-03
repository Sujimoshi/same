import React, { Component } from "react";
import { RootStore } from "same";
import { withConnect } from "@same/utils/connect";

export interface Props {
  code?: string;
}

@withConnect(
  (store: RootStore): Partial<Props> => ({
    code: store.editor.code
  })
)
export default class CodeEditor extends Component<Props> {
  render() {
    return <pre>{this.props.code}</pre>;
  }
}
