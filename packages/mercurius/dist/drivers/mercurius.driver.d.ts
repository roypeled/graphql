/// <reference types="node" />
import { AbstractGraphQLDriver } from '@nestjs/graphql';
import { FastifyInstance, FastifyLoggerInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { MercuriusDriverConfig } from '../interfaces/mercurius-driver-config.interface';
export declare class MercuriusDriver extends AbstractGraphQLDriver<MercuriusDriverConfig> {
  get instance(): FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse,
    FastifyLoggerInstance
  >;
  start(mercuriusOptions: MercuriusDriverConfig): Promise<void>;
  stop(): Promise<void>;
  mergeDefaultOptions(
    options: MercuriusDriverConfig,
  ): Promise<MercuriusDriverConfig>;
  subscriptionWithFilter(
    instanceRef: unknown,
    filterFn: (
      payload: any,
      variables: any,
      context: any,
    ) => boolean | Promise<boolean>,
    createSubscribeContext: Function,
  ): any;
  private wrapContextResolver;
  private assignReqProperty;
}
//# sourceMappingURL=mercurius.driver.d.ts.map
