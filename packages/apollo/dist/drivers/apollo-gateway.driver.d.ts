import { ModulesContainer } from '@nestjs/core';
import { ApolloGatewayDriverConfig } from '../interfaces';
import { ApolloBaseDriver } from './apollo-base.driver';
export declare class ApolloGatewayDriver extends ApolloBaseDriver<ApolloGatewayDriverConfig> {
  private readonly pluginsExplorerService;
  constructor(modulesContainer: ModulesContainer);
  start(options: ApolloGatewayDriverConfig): Promise<void>;
  mergeDefaultOptions(
    options: Record<string, any>,
  ): Promise<Record<string, any>>;
}
//# sourceMappingURL=apollo-gateway.driver.d.ts.map
