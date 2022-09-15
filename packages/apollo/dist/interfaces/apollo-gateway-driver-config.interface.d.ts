import { GatewayConfig } from '@apollo/gateway';
import { Type } from '@nestjs/common';
import {
  GqlModuleAsyncOptions,
  GqlOptionsFactory,
  GraphQLDriver,
} from '@nestjs/graphql';
import { ApolloDriverConfig } from './apollo-driver-config.interface';
export interface ApolloGatewayDriverConfig<
  TDriver extends GraphQLDriver = any,
> {
  /**
   * GraphQL gateway adapter
   */
  driver?: Type<TDriver>;
  /**
   * Gateway configuration
   */
  gateway?: GatewayConfig;
  /**
   * Server configuration
   */
  server?: Omit<
    ApolloDriverConfig,
    | 'typeDefs'
    | 'typePaths'
    | 'include'
    | 'resolvers'
    | 'resolverValidationOptions'
    | 'directiveResolvers'
    | 'autoSchemaFile'
    | 'transformSchema'
    | 'definitions'
    | 'schema'
    | 'subscriptions'
    | 'buildSchemaOptions'
    | 'fieldResolverEnhancers'
    | 'driver'
  >;
}
export declare type ApolloGatewayDriverConfigFactory =
  GqlOptionsFactory<ApolloGatewayDriverConfig>;
export declare type ApolloGatewayDriverAsyncConfig =
  GqlModuleAsyncOptions<ApolloGatewayDriverConfig>;
//# sourceMappingURL=apollo-gateway-driver-config.interface.d.ts.map
