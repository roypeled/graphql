/// <reference types="node" />
import {
  AbstractGraphQLDriver,
  GraphQLFederationFactory,
} from '@nestjs/graphql';
import { FastifyInstance, FastifyLoggerInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { MercuriusDriverConfig } from '../interfaces/mercurius-driver-config.interface';
export declare class MercuriusFederationDriver extends AbstractGraphQLDriver<MercuriusDriverConfig> {
  private readonly graphqlFederationFactory;
  get instance(): FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse,
    FastifyLoggerInstance
  >;
  constructor(graphqlFederationFactory: GraphQLFederationFactory);
  start(options: MercuriusDriverConfig): Promise<void>;
  stop(): Promise<void>;
}
//# sourceMappingURL=mercurius-federation.driver.d.ts.map
