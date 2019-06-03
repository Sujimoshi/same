import ASTNode from "./ASTNode";
import Registry from "@same/utils/Registry";
import ASTJSXText from "./ASTJSXText";
import ASTJSXExpressionContainer from "./ASTJSXExpressionContainer";
import ASTJSXElement from "./ASTJSXElement";
import ASTFile from "./ASTFile";
import ASTJSXOpeningElement from "./ASTJSXOpeningElement";
import ASTJSXIdentifier from "./ASTJSXIdentifier";
import ASTJSXAttribute from "./ASTJSXAttribute";

const ASTRegistry = new Registry<ASTNode>();
export default ASTRegistry;

ASTRegistry.register("JSXText", ASTJSXText);
ASTRegistry.register("JSXExpressionContainer", ASTJSXExpressionContainer);
ASTRegistry.register("JSXOpeningElement", ASTJSXOpeningElement);
ASTRegistry.register("JSXAttribute", ASTJSXAttribute);
ASTRegistry.register("JSXIdentifier", ASTJSXIdentifier);
ASTRegistry.register("JSXElement", ASTJSXElement);
ASTRegistry.register("File", ASTFile);
