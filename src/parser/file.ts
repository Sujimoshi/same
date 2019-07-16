import uuid from "uuid/v4";
import {
  Exportable,
  Exports,
  StatelessComponent,
  StyledComponent
} from "./structure";

export enum FileTypes {
  styled = "styled",
  example = "example"
}

export interface File {
  file: string;
  type: FileTypes;
  id: string;
  exports: Exports;
}

export const createFile = (file: string, type: FileTypes): File => ({
  file,
  type,
  id: uuid(),
  exports: {}
});

export const generateFile = (config: File) => {};
