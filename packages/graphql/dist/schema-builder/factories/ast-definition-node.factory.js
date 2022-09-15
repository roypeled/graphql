"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstDefinitionNodeFactory = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const graphql_1 = require("graphql");
const lodash_1 = require("lodash");
const directive_parsing_error_1 = require("../errors/directive-parsing.error");
let AstDefinitionNodeFactory = class AstDefinitionNodeFactory {
    /**
     * The implementation of this class has been heavily inspired by the folllowing code:
     * @ref https://github.com/MichalLytek/type-graphql/blob/master/src/schema/definition-node.ts
     * implemented in this PR https://github.com/MichalLytek/type-graphql/pull/369 by Jordan Stous (https://github.com/j)
     */
    createObjectTypeNode(name, directiveMetadata) {
        if ((0, shared_utils_1.isEmpty)(directiveMetadata)) {
            return;
        }
        return {
            kind: 'ObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: name,
            },
            directives: directiveMetadata.map(this.createDirectiveNode),
        };
    }
    createInputObjectTypeNode(name, directiveMetadata) {
        if ((0, shared_utils_1.isEmpty)(directiveMetadata)) {
            return;
        }
        return {
            kind: 'InputObjectTypeDefinition',
            name: {
                kind: 'Name',
                value: name,
            },
            directives: directiveMetadata.map(this.createDirectiveNode),
        };
    }
    createInterfaceTypeNode(name, directiveMetadata) {
        if ((0, shared_utils_1.isEmpty)(directiveMetadata)) {
            return;
        }
        return {
            kind: 'InterfaceTypeDefinition',
            name: {
                kind: 'Name',
                value: name,
            },
            directives: directiveMetadata.map(this.createDirectiveNode),
        };
    }
    createFieldNode(name, type, directiveMetadata) {
        if ((0, shared_utils_1.isEmpty)(directiveMetadata)) {
            return;
        }
        return {
            kind: 'FieldDefinition',
            type: {
                kind: 'NamedType',
                name: {
                    kind: 'Name',
                    value: type.toString(),
                },
            },
            name: {
                kind: 'Name',
                value: name,
            },
            directives: directiveMetadata.map(this.createDirectiveNode),
        };
    }
    createInputValueNode(name, type, directiveMetadata) {
        if ((0, shared_utils_1.isEmpty)(directiveMetadata)) {
            return;
        }
        return {
            kind: 'InputValueDefinition',
            type: {
                kind: 'NamedType',
                name: {
                    kind: 'Name',
                    value: type.toString(),
                },
            },
            name: {
                kind: 'Name',
                value: name,
            },
            directives: directiveMetadata.map(this.createDirectiveNode),
        };
    }
    createDirectiveNode(directive) {
        const parsed = (0, graphql_1.parse)(`type String ${directive.sdl}`);
        const definitions = parsed.definitions;
        const directives = definitions
            .filter((item) => item.directives && item.directives.length > 0)
            .map(({ directives }) => directives)
            .reduce((acc, item) => [...acc, ...item]);
        if (directives.length !== 1) {
            throw new directive_parsing_error_1.DirectiveParsingError(directive.sdl);
        }
        return (0, lodash_1.head)(directives);
    }
};
AstDefinitionNodeFactory = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AstDefinitionNodeFactory);
exports.AstDefinitionNodeFactory = AstDefinitionNodeFactory;
