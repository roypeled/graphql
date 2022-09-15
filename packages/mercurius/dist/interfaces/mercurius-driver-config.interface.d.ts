import {
  GqlModuleAsyncOptions,
  GqlModuleOptions,
  GqlOptionsFactory,
} from '@nestjs/graphql';
import { MercuriusOptions } from 'mercurius';
export declare type MercuriusDriverConfig = GqlModuleOptions & MercuriusOptions;
export declare type MercuriusDriverConfigFactory =
  GqlOptionsFactory<MercuriusDriverConfig>;
export declare type MercuriusDriverAsyncConfig =
  GqlModuleAsyncOptions<MercuriusDriverConfig>;
//# sourceMappingURL=mercurius-driver-config.interface.d.ts.map
