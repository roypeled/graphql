import { GraphQLSchema } from 'graphql';
export declare const FEDERATION_SCHEMA: string;
export declare function gatherDirectives(type: any): any[];
export declare function typeIncludesDirective(
  type: any,
  directiveName: any,
): boolean;
/**
 * Inspired by https://github.com/mercurius-js/mercurius/blob/master/lib/federation.js#L231
 * Accept a GraphQLSchema to transform instead of a plain string containing a graphql schema
 * @param schema
 */
export declare function transformFederatedSchema(
  schema: GraphQLSchema,
): GraphQLSchema;
//# sourceMappingURL=transform-schema.util.d.ts.map
