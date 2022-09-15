import * as ts from 'typescript';
import {
  Decorator,
  ModifiersArray,
  Node,
  NodeArray,
  ObjectFlags,
  SyntaxKind,
  Type,
  TypeChecker,
  TypeFlags,
  TypeFormatFlags,
  UnionTypeNode,
} from 'typescript';
export declare const isInUpdatedAstContext: boolean;
export declare function getDecorators(node: ts.Node): readonly ts.Decorator[];
export declare function getModifiers(
  node: ts.Node,
): ts.NodeArray<ts.ModifierLike> | readonly ts.Modifier[];
export declare function isArray(type: Type): boolean;
export declare function getTypeArguments(type: Type): any;
export declare function isBoolean(type: Type): boolean;
export declare function isString(type: Type): boolean;
export declare function isNumber(type: Type): boolean;
export declare function isInterface(type: Type): boolean;
export declare function isEnum(type: Type): boolean;
export declare function isEnumLiteral(type: Type): boolean;
export declare function isNull(type: Type): boolean;
export declare function isUndefined(type: Type): boolean;
export declare function hasFlag(type: Type, flag: TypeFlags): boolean;
export declare function hasObjectFlag(type: Type, flag: ObjectFlags): boolean;
export declare function getText(
  type: Type,
  typeChecker: TypeChecker,
  enclosingNode?: Node,
  typeFormatFlags?: TypeFormatFlags,
): string;
export declare function getDefaultTypeFormatFlags(enclosingNode: Node): number;
export declare function getDecoratorArguments(
  decorator: Decorator,
): any[] | ts.NodeArray<ts.Expression>;
export declare function getDecoratorName(decorator: Decorator): string;
export declare function getJSDocDescription(node: Node): string;
export declare function hasJSDocTags(node: Node, tagName: string[]): boolean;
export declare function getJsDocDeprecation(node: Node): string;
export declare function findNullableTypeFromUnion(
  typeNode: UnionTypeNode,
  typeChecker: TypeChecker,
): ts.TypeNode;
export declare function hasModifiers(
  modifiers: ModifiersArray | readonly ts.Modifier[],
  toCheck: SyntaxKind[],
): boolean;
export declare function hasDecorators(
  decorators: NodeArray<Decorator> | readonly Decorator[],
  toCheck: string[],
): boolean;
export declare function hasImport(sf: ts.SourceFile, what: string): boolean;
export declare function createImportEquals(
  f: ts.NodeFactory,
  identifier: ts.Identifier | string,
  from: string,
): ts.ImportEqualsDeclaration;
export declare function createNamedImport(
  f: ts.NodeFactory,
  what: string[],
  from: string,
): ts.ImportDeclaration;
export declare function isCallExpressionOf(
  name: string,
  node: ts.CallExpression,
): boolean;
export declare type PrimitiveObject = {
  [key: string]: string | boolean | ts.Node | PrimitiveObject;
};
export declare function serializePrimitiveObjectToAst(
  f: ts.NodeFactory,
  object: PrimitiveObject,
): ts.ObjectLiteralExpression;
export declare function safelyMergeObjects(
  f: ts.NodeFactory,
  a: ts.Expression,
  b: ts.Expression,
): ts.ObjectLiteralExpression;
export declare function updateDecoratorArguments<
  T extends
    | ts.ClassDeclaration
    | ts.PropertyDeclaration
    | ts.GetAccessorDeclaration,
>(
  f: ts.NodeFactory,
  node: T,
  decoratorName: string,
  replaceFn: (
    decoratorArguments: ts.NodeArray<ts.Expression>,
  ) => ts.Expression[],
): T;
//# sourceMappingURL=ast-utils.d.ts.map
