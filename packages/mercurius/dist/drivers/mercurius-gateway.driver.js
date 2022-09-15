"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercuriusGatewayDriver = void 0;
const graphql_1 = require("@nestjs/graphql");
const mercurius_1 = require("mercurius");
class MercuriusGatewayDriver extends graphql_1.AbstractGraphQLDriver {
    get instance() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.httpAdapterHost) === null || _a === void 0 ? void 0 : _a.httpAdapter) === null || _b === void 0 ? void 0 : _b.getInstance) === null || _c === void 0 ? void 0 : _c.call(_b);
    }
    async start(options) {
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
}
exports.MercuriusGatewayDriver = MercuriusGatewayDriver;
