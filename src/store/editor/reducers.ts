import { readFileSync } from "fs";
import { SimpleReducersManager } from "../utils";
import ASTNode from "@same/parser/ASTNode";
import ASTFile from "@same/parser/ASTFile";

export interface EditorStore {
  code?: string;
  loading?: boolean;
  error?: Error;
  filePath?: string;
  focusedNode?: ASTNode;
  astFile?: ASTFile;
}

const FILE = "/Users/sujimoshi/Projects/same/front/example/Link/index.js";

export const initialState: EditorStore = {
  loading: false,
  error: null,
  code: readFileSync(FILE).toString(),
  filePath: FILE,
  astFile: ASTFile.createFromCode(readFileSync(FILE).toString()),
  focusedNode: null
};

const storeManager = new SimpleReducersManager("EDITOR", initialState);

export default storeManager;
