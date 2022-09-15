"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercuriusDriver = void 0;
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const mercurius_1 = require("mercurius");
class MercuriusDriver extends graphql_1.AbstractGraphQLDriver {
    get instance() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.httpAdapterHost) === null || _a === void 0 ? void 0 : _a.httpAdapter) === null || _b === void 0 ? void 0 : _b.getInstance) === null || _c === void 0 ? void 0 : _c.call(_b);
    }
    async start(mercuriusOptions) {
        const options = await this.graphQlFactory.mergeWithSchema(mercuriusOptions);
        if (options.definitions && options.definitions.path) {
            await this.graphQlFactory.generateDefinitions((0, graphql_2.printSchema)(options.schema), options);
        }
        const httpAdapter = this.httpAdapterHost.httpAdapter;
        const platformName = httpAdapter.getType();
        if (platformName !== 'fastify') {
            throw new Error(`No support for current HttpAdapter: ${platformName}`);
        }
        const app = httpAdapter.getInstance();
        await app.register(mercurius_1.default, {
            ...options,
        });
    }
    async stop() { }
    async mergeDefaultOptions(options) {
        options = await super.mergeDefaultOptions(options);
        this.wrapContextResolver(options);
        return options;
    }
    subscriptionWithFilter(instanceRef, filterFn, createSubscribeContext) {
        return mercurius_1.default.withFilter(createSubscribeContext(), (...args) => filterFn.call(instanceRef, ...args));
    }
    wrapContextResolver(targetOptions, originalOptions = { ...targetOptions }) {
        if (!targetOptions.context) {
            targetOptions.context = (req) => ({ req });
        }
        else if ((0, shared_utils_1.isFunction)(targetOptions.context)) {
            targetOptions.context = async (...args) => {
                const ctx = await originalOptions.context(...args);
                const request = args[0];
                return this.assignReqProperty(ctx, request);
            };
        }
        else {
            targetOptions.context = (req) => {
                return this.assignReqProperty(originalOptions.context, req);
            };
        }
    }
    assignReqProperty(ctx, req) {
        if (!ctx) {
            return { req };
        }
        if (typeof ctx !== 'object' ||
            (ctx && ctx.req && typeof ctx.req === 'object')) {
            return ctx;
        }
        ctx.req = req;
        return ctx;
    }
}
exports.MercuriusDriver = MercuriusDriver;
