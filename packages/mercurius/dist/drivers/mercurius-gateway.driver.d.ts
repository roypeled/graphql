/// <reference types="node" />
import { AbstractGraphQLDriver } from '@nestjs/graphql';
import { FastifyInstance, FastifyLoggerInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { MercuriusDriverConfig } from '../interfaces/mercurius-driver-config.interface';
export declare class MercuriusGatewayDriver extends AbstractGraphQLDriver<MercuriusDriverConfig> {
  get instance(): FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse,
    FastifyLoggerInstance
  >;
  start(options: MercuriusDriverConfig): Promise<void>;
  stop(): Promise<void>;
}
//# sourceMappingURL=mercurius-gateway.driver.d.ts.map
