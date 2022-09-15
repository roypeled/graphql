"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercuriusFederationDriver = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const mercurius_1 = require("mercurius");
const build_mercurius_federated_schema_util_1 = require("../utils/build-mercurius-federated-schema.util");
let MercuriusFederationDriver = class MercuriusFederationDriver extends graphql_1.AbstractGraphQLDriver {
    constructor(graphqlFederationFactory) {
        super();
        this.graphqlFederationFactory = graphqlFederationFactory;
    }
    get instance() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.httpAdapterHost) === null || _a === void 0 ? void 0 : _a.httpAdapter) === null || _b === void 0 ? void 0 : _b.getInstance) === null || _c === void 0 ? void 0 : _c.call(_b);
    }
    async start(options) {
        const adapterOptions = await this.graphqlFederationFactory.mergeWithSchema(options, build_mercurius_federated_schema_util_1.buildMercuriusFederatedSchema);
        if (adapterOptions.definitions && adapterOptions.definitions.path) {
            await this.graphQlFactory.generateDefinitions((0, graphql_2.printSchema)(adapterOptions.schema), adapterOptions);
        }
        const httpAdapter = this.httpAdapterHost.httpAdapter;
        const platformName = httpAdapter.getType();
        if (platformName !== 'fastify') {
            throw new Error(`No support for current HttpAdapter: ${platformName}`);
        }
        const app = httpAdapter.getInstance();
        await app.register(mercurius_1.default, {
            ...adapterOptions,
        });
    }
    /* eslit-disable-next-line @typescript-eslint/no-empty-function */
    async stop() { }
};
MercuriusFederationDriver = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [graphql_1.GraphQLFederationFactory])
], MercuriusFederationDriver);
exports.MercuriusFederationDriver = MercuriusFederationDriver;
