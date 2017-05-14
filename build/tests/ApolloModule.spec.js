import './_common';
import { ApolloModule, SelectPipe, Apollo } from '../src';
import { CLIENT_MAP, CLIENT_MAP_WRAPPER } from '../src/tokens';
describe('ApolloModule', function () {
    var /** @type {?} */ metadata = Reflect.getMetadata('annotations', ApolloModule)[0];
    test('should contain SelectPipe in declarations', function () {
        expect(include(metadata.declarations, SelectPipe)).toBe(true);
    });
    test('should export SelectPipe', function () {
        expect(include(metadata.exports, SelectPipe)).toBe(true);
    });
    test('should not export Apollo', function () {
        expect(include(metadata.exports, Apollo)).toBe(false);
    });
    test('should has withClient method', function () {
        expect(ApolloModule.withClient).toBeDefined();
    });
    describe('withClient', function () {
        var /** @type {?} */ client = ({});
        var /** @type {?} */ getClient = function () { return client; };
        var /** @type {?} */ result = ApolloModule.withClient(getClient);
        var /** @type {?} */ providers = result.providers[1]; // skips APOLLO_PROVIDERS
        test('should contain ApolloModule as ngModule', function () {
            expect(result.ngModule === ApolloModule).toBe(true);
        });
        test('should provide a wrapper directly', function () {
            expect(providers[0]['provide']).toBe(CLIENT_MAP_WRAPPER);
            expect(providers[0]['useValue']).toBe(getClient);
        });
        test('should provide a value using factory', function () {
            var /** @type {?} */ factoryResult = providers[1]['useFactory'](getClient);
            expect(providers[1]['provide']).toBe(CLIENT_MAP);
            expect(providers[1]['useFactory']).toBeDefined();
            expect(providers[1]['deps'][0]).toBe(CLIENT_MAP_WRAPPER);
            expect(factoryResult).toBe(client);
        });
    });
    describe('forRoot', function () {
        var /** @type {?} */ defaultClient = ({});
        var /** @type {?} */ extraClient = ({});
        var /** @type {?} */ getClients = function () { return ({
            default: defaultClient,
            extra: extraClient,
        }); };
        var /** @type {?} */ result = ApolloModule.forRoot(getClients);
        var /** @type {?} */ providers = result.providers[1]; // skips APOLLO_PROVIDERS
        test('should contain ApolloModule as ngModule', function () {
            expect(result.ngModule === ApolloModule).toBe(true);
        });
        test('should provide a wrapper directly', function () {
            expect(providers[0]['provide']).toBe(CLIENT_MAP_WRAPPER);
            expect(providers[0]['useValue']).toBe(getClients);
        });
        test('should provide a value using factory', function () {
            var /** @type {?} */ factoryResult = providers[1]['useFactory'](getClients);
            expect(providers[1]['provide']).toBe(CLIENT_MAP);
            expect(providers[1]['useFactory']).toBeDefined();
            expect(providers[1]['deps'][0]).toBe(CLIENT_MAP_WRAPPER);
            expect(factoryResult).toEqual({
                default: defaultClient,
                extra: extraClient,
            });
        });
    });
});
/**
 * @param {?} source
 * @param {?} find
 * @return {?}
 */
function include(source, find) {
    return source.some(function (i) { return i === find; });
}
//# sourceMappingURL=ApolloModule.spec.js.map